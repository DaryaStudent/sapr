import React, {useState} from "react";

function PostProcessorTable({ rodsSigmas, rodsLengths, objWithSolutionFunctions}) {
    const [chosenRodForTable, setChosenRodForTable] = useState(1);
    const [stepForTable, setStepForTable] = useState(0.1);
    const [isStepForTableCorrect, setIsStepForTableCorrect] = useState(true);
    const [isTableShown, setIsTableShown] = useState(false);
    const [tableData, setTableData] = useState([]);

    function fixTail(num, n = 5) {
        const biasedNumStr = (num + 10 ** (-n - 1)).toFixed(n);
        return Number(biasedNumStr);
    }

    function handleShowTableButtonClick() {
        if (isStepForTableCorrect) {
            let data = [];
            let xStartPos = 0;
            let totalIterations = parseInt(
                rodsLengths[chosenRodForTable - 1] / Number(stepForTable),
                10
            );
            for (let i = 0; i <= totalIterations; i++) {
                data.push({
                    x: fixTail(xStartPos),
                    NValue: fixTail(objWithSolutionFunctions.N[chosenRodForTable - 1](
                        fixTail(xStartPos))
                    ),
                    UValue: fixTail(objWithSolutionFunctions.U[chosenRodForTable - 1](
                        fixTail(xStartPos))
                    ),
                    SValue: fixTail(objWithSolutionFunctions.S[chosenRodForTable - 1](
                        fixTail(xStartPos))
                    ),
                });
                xStartPos = fixTail(xStartPos + Number(stepForTable));
            }
            if (
                totalIterations !==
                rodsLengths[chosenRodForTable - 1] / Number(stepForTable)
            ) {
                data.push({
                    x: rodsLengths[chosenRodForTable - 1],
                    UValue: objWithSolutionFunctions.U[chosenRodForTable - 1](
                        fixTail(rodsLengths[chosenRodForTable - 1])
                    ),
                    NValue: objWithSolutionFunctions.N[chosenRodForTable - 1](
                        fixTail(rodsLengths[chosenRodForTable - 1])
                    ),
                    SValue: objWithSolutionFunctions.S[chosenRodForTable - 1](
                        fixTail(rodsLengths[chosenRodForTable - 1])
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
            Number(valueStr) > rodsLengths[chosenRodForTable - 1] ||
            isNaN(valueStr)
        ) {
            setIsStepForTableCorrect(false);
        } else {
            setIsStepForTableCorrect(true);
        }
        setStepForTable(valueStr);
    }

    function handleSavingTableData() {
        if (isTableShown) {
            const csvArr = [];
            const rows = [["x", "N(x)", "U(x)", "S(x)"]];
            tableData.forEach((row) => {
                rows.push([row.x, row.NValue, row.UValue, row.SValue]);
            });
            rows.forEach((row) => {
                csvArr.push(row.join(","));
            });
            const csvFile = new Blob([csvArr.join("\n")], { type: "text/csv" });
            const a = document.createElement("a");
            a.href = URL.createObjectURL(csvFile);
            a.setAttribute("download", "values.csv");
            document.body.appendChild(a);
            a.click();
        }
    }

    return (
        <div className="post-processor-table">
            <div className="post-processor-table-interface">
                <div>
                    Стержень
                    <select
                        value={chosenRodForTable}
                        onChange={(e) =>
                            setChosenRodForTable(Number(e.target.value))
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
                                        <td className={Math.abs(dataRow.SValue) > rodsSigmas[chosenRodForTable - 1]? "out-of-limit" : null}>{dataRow.SValue}</td>
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
