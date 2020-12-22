import React, { useRef, useEffect, useState } from "react";

function ConstructionCanvas(props) {
    const canvasRef = useRef(null);
    const contextRef = useRef(null);
    const centralAxisStart = { x: 400, y: 400 };
    const baseLength = 100;
    const baseHeight = 35;
    const arrowLength = 30;
    const initialLineWidth = 2;

    const reducedVortexsRows = [];
    for (let i = 0; i < props.data.rodsRows.length + 1; i++) {
        reducedVortexsRows.push({ nodeNumber: i + 1, nodeForce: 0 });
    }
    props.data.nodesRows.forEach((node) => {
        reducedVortexsRows[node.nodeNumber - 1].nodeForce += node.nodeForce;
    });

    reducedVortexsRows.forEach((node) => {
        node.nodeForce = Number(node.nodeForce.toFixed(5));
    });

    const data = {
        rodsAndVortexs: {
            rodsRows: [...props.data.rodsRows],
            nodesRows: reducedVortexsRows,
            leftSupport: { ...props.data.leftSupport },
            rightSupport: { ...props.data.rightSupport },
        },
    };

    const [zoomScale, setZoomScale] = useState(1);
    const [isDrawing, setIsDrawing] = useState(false);
    const [globalDX, setGlobalDX] = useState(centralAxisStart.x);
    const [globalDY, setGlobalDY] = useState(centralAxisStart.y);
    const prevPoint = useRef([0, 0]);

    useEffect(() => {
        const canvas = canvasRef.current;
        canvas.width = window.innerWidth;
        canvas.height = /* window.innerHeight - 250; */ 700;
        contextRef.current = canvas.getContext("2d");
        clearCanvas();
        draw();
    }, []);

    useEffect(() => {
        clearCanvas();
        draw();
    });

    const startDrawing = ({ nativeEvent }) => {
        const { offsetX, offsetY } = nativeEvent;
        prevPoint.current = [offsetX, offsetY];
        setIsDrawing(true);
    };

    const finishDrawing = () => {
        setIsDrawing(false);
    };

    const move = ({ nativeEvent }) => {
        if (!isDrawing) {
            return;
        }
        const { offsetX, offsetY } = nativeEvent;
        const deltaX = offsetX - prevPoint.current[0];
        const deltaY = offsetY - prevPoint.current[1];
        prevPoint.current = [offsetX, offsetY];
        setGlobalDX((prev) => prev + deltaX);
        setGlobalDY((prev) => prev + deltaY);
    };

    function clearCanvas() {
        contextRef.current.setTransform(
            1,
            0,
            0,
            1,
            centralAxisStart.x,
            centralAxisStart.y
        );
        contextRef.current.clearRect(
            0 - centralAxisStart.x,
            0 - centralAxisStart.y,
            canvasRef.current.width,
            canvasRef.current.height
        );
        contextRef.current.setTransform(
            zoomScale,
            0,
            0,
            zoomScale,
            globalDX,
            globalDY
        );
    }


    function canvas_distArrow(context, fromx, fromy, tox, toy) {
        let headlen = 8; // length of head in pixels
        let dx = tox - fromx;
        let dy = toy - fromy;
        let angle = Math.atan2(dy, dx);
        context.beginPath();
        context.moveTo(fromx, fromy);
        context.lineTo(tox, toy);
        context.strokeStyle = "black";
        context.lineTo(
            tox - headlen * Math.cos(angle - Math.PI / 6),
            toy - headlen * Math.sin(angle - Math.PI / 6)
        );
        context.moveTo(tox, toy);
        context.lineTo(
            tox - headlen * Math.cos(angle + Math.PI / 6),
            toy - headlen * Math.sin(angle + Math.PI / 6)
        );
        context.stroke();
        context.strokeStyle = "black";
    }

    function canvas_concArrow(
        ctx,
        fromx,
        fromy,
        tox,
        toy,
        tipWidth,
        tipHeight
    ) {
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.moveTo(fromx, fromy);
        ctx.lineTo(tox, toy);
        ctx.strokeStyle = "black";
        ctx.stroke();
        if (tox - fromx < 0) {
            ctx.beginPath();
            ctx.fillStyle = "black";
            ctx.moveTo(tox + tipWidth, toy - tipHeight / 3);
            ctx.lineTo(tox + tipWidth, toy + tipHeight / 2);
            ctx.lineTo(tox - tipWidth, toy);
            ctx.fill();
        } else {
            ctx.beginPath();
            ctx.moveTo(fromx, fromy);
            ctx.lineTo(tox, toy);
            ctx.stroke();
            ctx.beginPath();
            ctx.fillStyle = "black";
            ctx.moveTo(tox - tipWidth, toy - tipHeight / 2);
            ctx.lineTo(tox - tipWidth, toy + tipHeight / 2);
            ctx.lineTo(tox + tipWidth, toy);
            ctx.fill();
        }
        ctx.lineWidth = initialLineWidth;
        ctx.strokeStyle = "black";
        ctx.fillStyle = "black";
    }

    function drawSupport(
        ctx,
        width,
        height,
        lineCount,
        lineDeltaX,
        lineDeltaY,
        isRightSupport = false
    ) {
        if (isRightSupport) {
            ctx.translate(0, -height / 2);
            ctx.fillRect(0, 0, width, height);
            ctx.beginPath();
            let interval = height / lineCount;
            let deltaY = 1;
            ctx.moveTo(width, 0);
            ctx.lineTo(width + lineDeltaX, lineDeltaY);
            for (let i = 0; i <= lineCount; i++) {
                ctx.lineTo(width + lineDeltaX, lineDeltaY + deltaY);
                deltaY += interval;
                ctx.moveTo(width, deltaY);
            }
            ctx.stroke();
            ctx.translate(0, height / 2);
        } else {
            ctx.translate(-width, -height / 2);
            ctx.fillRect(0, 0, width, height);
            ctx.beginPath();
            ctx.moveTo(0, 1);
            let interval = height / lineCount;
            let deltaY = 1;
            for (let i = 0; i <= lineCount; i++) {
                ctx.lineTo(-lineDeltaX, -lineDeltaY + deltaY);
                deltaY += interval;
                ctx.moveTo(0, deltaY);
                ctx.stroke();
            }
            ctx.translate(width, height / 2);
        }
    }

    function drawDistLoad(rodLength, distLoad, arrowLength) {
        if (distLoad !== 0) {
            if (distLoad > 0) {
                if (rodLength <= arrowLength) {
                    canvas_distArrow(contextRef.current, 0, 0, rodLength, 0);
                } else {
                    let currentXPos = 0;
                    while (currentXPos + arrowLength < rodLength) {
                        canvas_distArrow(
                            contextRef.current,
                            currentXPos,
                            0,
                            currentXPos + 10,
                            0
                        );
                        currentXPos += arrowLength;
                    }
                    canvas_distArrow(
                        contextRef.current,
                        currentXPos,
                        0,
                        rodLength,
                        0
                    );
                }
            } else {
                if (rodLength <= arrowLength) {
                    canvas_distArrow(contextRef.current, rodLength, 0, 0, 0);
                } else {
                    let currentXPos = 0;
                    while (currentXPos + arrowLength < rodLength) {
                        canvas_distArrow(
                            contextRef.current,
                            currentXPos + 10,
                            0,
                            currentXPos,
                            0
                        );
                        currentXPos += arrowLength;
                    }
                    canvas_distArrow(
                        contextRef.current,
                        rodLength,
                        0,
                        currentXPos,
                        0
                    );
                }
            }
        }
    }
    function drawConcLoad(index) {
        if (data.rodsAndVortexs.nodesRows[index].nodeForce !== 0) {
            if (
                !(
                    data.rodsAndVortexs.rightSupport.nodeNumber ===
                    data.rodsAndVortexs.nodesRows[index].nodeNumber
                ) &&
                data.rodsAndVortexs.nodesRows[index].nodeForce > 0
            ) {
                canvas_concArrow(
                    contextRef.current,
                    0,
                    0,
                    baseLength / 2 - 20,
                    0,
                    10,
                    20
                );
            } else if (
                !(
                    data.rodsAndVortexs.leftSupport.nodeNumber ===
                    data.rodsAndVortexs.nodesRows[index].nodeNumber
                ) &&
                data.rodsAndVortexs.nodesRows[index].nodeForce < 0
            ) {
                canvas_concArrow(
                    contextRef.current,
                    0,
                    0,
                    -baseLength / 2 + 5,
                    0,
                    10,
                    20
                );
            }
        }
    }

    const draw = () => {
        const ctx = contextRef.current;
        ctx.lineWidth = initialLineWidth;
        data.rodsAndVortexs.rodsRows.forEach((rodRow, index) => {
            if (data.rodsAndVortexs.leftSupport.nodeNumber === index + 1) {
                drawSupport(ctx, 20, 100, 5, 10, 15);
            }
            const area = rodRow.area;
            const length = rodRow.length;
            const distLoad = rodRow.distLoad;
            const rodStartX = 0;
            const rodStartY = -area * baseHeight;
            const rodLength = length * baseLength;
            const rodHeight = 2 * area * baseHeight;
            ctx.lineWidth = 5;
            ctx.strokeRect(rodStartX, rodStartY, rodLength, rodHeight);
            ctx.lineWidth = initialLineWidth;
            drawDistLoad(rodLength, distLoad, arrowLength);
            drawConcLoad(index);
            ctx.translate(rodLength, 0);
            if (index === data.rodsAndVortexs.nodesRows.length - 2) {
                drawConcLoad(index + 1);
                if (data.rodsAndVortexs.rightSupport.nodeNumber === index + 2) {
                    drawSupport(ctx, 20, 100, 5, 10, 15, true);
                }
            }
        });
    };
    return (
        <div className="preprocessor__canvas">
            {/* <div className={props.styles.canvasButtons}>
                <button
                    disabled={zoomScale <= 0.25}
                    onClick={() => setZoomScale((prev) => prev - 0.25)}>
                    Уменьшить
                </button>
                <div>{zoomScale}</div>
                <button
                    disabled={zoomScale >= 10}
                    onClick={() => setZoomScale((prev) => prev + 0.25)}>
                    Увеличить
                </button>
                <button onClick={() => resetCanvas()}>Сброс</button>
            </div> */}
            <canvas
                ref={canvasRef}
                onMouseDown={startDrawing}
                onMouseUp={finishDrawing}
                onMouseMove={move}
            />
        </div>
    );
}

export default ConstructionCanvas;
