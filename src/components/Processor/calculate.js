export function fixTail(num, n = 5) {
    const biasedNumStr = (num + 10 ** (-n - 1)).toFixed(n);
    return Number(biasedNumStr);
}

function gaussJordan(matrix) {
    let ratio;
    const matrixCopy = matrix.map((row) => row.map((el) => el));
    for (let i = 0; i < matrixCopy.length; i++) {
        for (let j = 0; j < matrixCopy.length; j++) {
            if (i !== j) {
                ratio = matrixCopy[j][i] / matrixCopy[i][i];
                for (let k = 0; k <= matrixCopy.length; k++) {
                    matrixCopy[j][k] =
                        matrixCopy[j][k] - ratio * matrixCopy[i][k];
                }
            }
        }
    }
    let UNS_Object = [];
    for (let i = 0; i < matrixCopy.length; i++) {
        UNS_Object.push(
            fixTail(matrixCopy[i][matrixCopy.length] / matrixCopy[i][i])
        );
    }
    return UNS_Object;
}

function calculate(rodsRows, nodesRows, leftSupport, rightSupport) {
    const rodsData = rodsRows;
    const nodesData = nodesRows;
    const left = leftSupport.isChecked;
    const right = rightSupport.isChecked;

    const rods = rodsData.map((stem) => [stem.modulus, stem.area, stem.length]);
    const nodesLoads = nodesData.map((node) => node.nodeForce);

    const rodsLoads = rodsData.map((stem) => stem.distLoad);

    const matrixA = [];
    for (let i = 0; i < rods.length + 1; i++) {
        const matrixRow = [];
        for (let j = 0; j < rods.length + 1; j++) {
            matrixRow.push(0);
        }
        matrixA.push(matrixRow);
    }

    const rodSquares = [];

    rods.forEach((stem) => {
        let currentSquare = [];
        for (let i = 0; i < 2; i++) {
            currentSquare.push([0, 0]);
        }
        currentSquare = currentSquare.map((value) =>
            value.map(() => (stem[0] * stem[1]) / stem[2])
        );
        currentSquare[0][1] *= -1;
        currentSquare[1][0] *= -1;
        rodSquares.push(currentSquare);
    });


    rodSquares.forEach((square, index) => {
        for (let i = index; i < index + 2; i++) {
            for (let k = index; k < index + 2; k++) {
                if (i === k) {
                    if (i === 0 || i === matrixA.length - 1) {
                        matrixA[i][k] = square[i - index][k - index];
                    } else {
                        matrixA[i][k] += square[i - index][k - index];
                    }
                } else {
                    matrixA[i][k] = square[i - index][k - index];
                }
            }
        }
    });

    if (left) {
        for (let i = 0; i < matrixA.length; i++) {
            for (let k = 0; k < matrixA.length; k++) {
                if (i !== k && (i === 0 || k === 0)) {
                    matrixA[i][k] = 0;
                }
                if (i === k && i === 0) {
                    matrixA[i][k] = 1;
                }
            }
        }
    }
    if (right) {
        for (let i = 0; i < matrixA.length; i++) {
            for (let k = 0; k < matrixA.length; k++) {
                if (
                    i !== k &&
                    (i === matrixA.length - 1 || k === matrixA.length - 1)
                ) {
                    matrixA[i][k] = 0;
                }
                if (i === k && i === matrixA.length) {
                    matrixA[i][k] = 1;
                }
            }
        }
    }

    const matrixB = [];
    for (let i = 0; i < matrixA.length; i++) {
        if ((left && i === 0) || (right && i === matrixA.length - 1)) {
            matrixB.push(0);
        } else if (i !== 0 && i !== matrixA.length - 1) {
            matrixB.push(
                nodesLoads[i] +
                    rodsLoads[i] * (rods[i][2] / 2) +
                    rodsLoads[i - 1] * (rods[i - 1][2] / 2)
            );
        } else if (i === 0) {
            matrixB.push(nodesLoads[i] + rodsLoads[i] * (rods[i][2] / 2));
        } else if (i === matrixA.length - 1) {
            matrixB.push(
                nodesLoads[i] + rodsLoads[i - 1] * (rods[i - 1][2] / 2)
            );
        }
    }
    const SLAU = matrixA.map((row, index) => {
        return [...row, matrixB[index]];
    });
    const deltaMatrix = gaussJordan(SLAU);
    const alertData = deltaMatrix.map((result, index) => {
        return `\nDelta ${index+1} = ${result}`
    })

    alert(`Результаты вычислений: ${alertData}`);

    const U = [];
    rods.forEach((stem, index) => {
        const Ux = (x) =>
            Number(
                (
                    deltaMatrix[index] +
                    (x / stem[2]) *
                        (deltaMatrix[index + 1] - deltaMatrix[index]) +
                    ((rodsLoads[index] * stem[2] * stem[2]) /
                        (2 * stem[0] * stem[1])) *
                        (x / stem[2]) *
                        (1 - x / stem[2])
                ).toFixed(12)
            );
        U.push(Ux);
    });

    const N = [];
    const S = [];
    rods.forEach((stem, index) => {
        const Nx = (x) =>
            Number(
                (
                    ((stem[0] * stem[1]) / stem[2]) *
                        (deltaMatrix[index + 1] - deltaMatrix[index]) +
                    ((rodsLoads[index] * stem[2]) / 2) * (1 - 2 * (x / stem[2]))
                ).toFixed(10)
            );
        N.push(Nx);
        S.push((x) => Nx(x) / stem[1]);
    });

    const UNS_Object = {
        U: U,
        N: N,
        S: S,
    };
    return UNS_Object;
}

export default calculate;
