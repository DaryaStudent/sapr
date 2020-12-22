import React, {useState} from "react";

function PostProcessorTable({ rodsSigmas, rodsLengths, objWithSolutionFunctions}) {
    const [chosenSternForTable, setChosenSternForTable] = useState(1);
    const [stepForTable, setStepForTable] = useState(0.1);
    const [isStepForTableCorrect, setIsStepForTableCorrect] = useState(true);
    const [isTableShown, setIsTableShown] = useState(false);
    const [tableData, setTableData] = useState([]);

    function cutLastDig(num, n = 5) {
        const biasedNumStr = (num + 10 ** (-n - 1)).toFixed(n);
        return Number(biasedNumStr);
    }

    function handleShowTableButtonClick() {
        if (isStepForTableCorrect) {
            let data = [];
            let xStartPos = 0;
            let totalIterations = parseInt(
                rodsLengths[chosenSternForTable - 1] / Number(stepForTable),
                10
            );
            for (let i = 0; i <= totalIterations; i++) {
                data.push({
                    x: cutLastDig(xStartPos),
                    NValue: cutLastDig(objWithSolutionFunctions.N[chosenSternForTable - 1](
                        cutLastDig(xStartPos))
                    ),
                    UValue: cutLastDig(objWithSolutionFunctions.U[chosenSternForTable - 1](
                        cutLastDig(xStartPos))
                    ),
                    SValue: cutLastDig(objWithSolutionFunctions.S[chosenSternForTable - 1](
                        cutLastDig(xStartPos))
                    ),
                });
                xStartPos = cutLastDig(xStartPos + Number(stepForTable));
            }
            if (
                totalIterations !==
                rodsLengths[chosenSternForTable - 1] / Number(stepForTable)
            ) {
                data.push({
                    x: rodsLengths[chosenSternForTable - 1],
                    UValue: objWithSolutionFunctions.U[chosenSternForTable - 1](
                        cutLastDig(rodsLengths[chosenSternForTable - 1])
                    ),
                    NValue: objWithSolutionFunctions.N[chosenSternForTable - 1](
                        cutLastDig(rodsLengths[chosenSternForTable - 1])
                    ),
                    SValue: objWithSolutionFunctions.S[chosenSternForTable - 1](
                        cutLastDig(rodsLengths[chosenSternForTable - 1])
                    ),
                });
            }
            setTableData(data);
            setIsTableShown(true);
        }
    }

    function handleStepForTableChange(e) {
        const valueStr = e.target.value.replace(",", ".");
        if (
            Number(valueStr) <= 0 ||
            Number(valueStr) > rodsLengths[chosenSternForTable - 1] ||
            isNaN(valueStr)
        ) {
            setIsStepForTableCorrect(false);
        } else {
            setIsStepForTableCorrect(true);
        }
        setStepForTable(valueStr);
    }

    return (
        <div className="post-processor-table">
            <div className="post-processor-table-interface">
                <div>
                    Стержень
                    <select
                        value={chosenSternForTable}
                        onChange={(e) =>
                            setChosenSternForTable(Number(e.target.value))
                        }>
                        {rodsLengths.map((rodLength, index) => {
                            return (
                                <option key={index} value={index + 1}>{index + 1}</option>
                            );
                        })}
                    </select>
                </div>
                <div>
                    Шаг:
                    <input
                        className={`step-for-table-input ${
                            isStepForTableCorrect ? null : `error`
                        }`}
                        type="number"
                        value={stepForTable}
                        onChange={handleStepForTableChange}
                    />
                </div>
                <div>
                    <button onClick={handleShowTableButtonClick}>
                        Показать
                    </button>
                </div>
            </div>
            {isTableShown ? (
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>x</th>
                                <th>N</th>
                                <th>U</th>
                                <th>σ</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableData.map((dataRow, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{dataRow.x}</td>
                                        <td>{dataRow.NValue}</td>
                                        <td>{dataRow.UValue}</td>
                                        <td className={Math.abs(dataRow.SValue) > rodsSigmas[chosenSternForTable - 1]? "out-of-limit" : null}>{dataRow.SValue}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            ) : null}
        </div>
    );
}

export default PostProcessorTable;
