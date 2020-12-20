import React, { useState } from "react";
import "./PostProcessor.scss";
import { VictoryChart, VictoryArea } from "victory";
import { connect } from "react-redux";
import { fixTail } from "./../Processor/calculate";
import PostProcessorTable from "./PostProcessorTable";

function PostProcessor(props) {
    const [chosenRodForNx, setChosenRodForNx] = useState(1);
    const [NxInputValue, setNxInputValue] = useState(0);
    let NxResult = "";

    const [chosenRodForUx, setChosenRodForUx] = useState(1);
    const [UxInputValue, setUxInputValue] = useState(0);
    let UxResult = "";

    const [chosenRodForSx, setChosenRodForSx] = useState(1);
    const [SxInputValue, setSxInputValue] = useState(0);
    let SxResult = "";

    if (!props.objWithSolutionFunctions) {
        return (
            <div className="post-processor error">
                <div>Error: no result data.</div>
            </div>
        );
    }

    const rodsLengths = props.rodsRows.map((rod) => rod.length);
    const rodsSigmas = props.rodsRows.map((rod) => rod.sigma);
    const NxPlotData = [];
    let xPosForNxPlot = 0;
    rodsLengths.forEach((rodLength, index) => {
        const dotsPerRod = 10;
        const step = rodLength / dotsPerRod;
        let currentRodXPos = 0;
        for (let i = 0; i < dotsPerRod; i++) {
            NxPlotData.push({
                x: xPosForNxPlot + currentRodXPos,
                y: fixTail(
                    props.objWithSolutionFunctions.N[index](currentRodXPos)
                ),
                y0: 0,
            });
            currentRodXPos += step;
            if (i === dotsPerRod - 1) {
                NxPlotData.push({
                    x: xPosForNxPlot + currentRodXPos,
                    y: fixTail(
                        props.objWithSolutionFunctions.N[index](currentRodXPos)
                    ),
                    y0: 0,
                });
            }
        }
        xPosForNxPlot += rodLength;
    });

    console.log(NxPlotData);

    const UxPlotData = [];
    let xPosForUxPlot = 0;
    rodsLengths.forEach((rodLength, index) => {
        const dotsPerRod = 10;
        const step = rodLength / dotsPerRod;
        let currentRodXPos = 0;
        for (let i = 0; i < dotsPerRod; i++) {
            UxPlotData.push({
                x: xPosForUxPlot + currentRodXPos,
                y: fixTail(
                    props.objWithSolutionFunctions.U[index](currentRodXPos)
                ),
                y0: 0,
            });
            currentRodXPos += step;
            if (i === dotsPerRod - 1) {
                UxPlotData.push({
                    x: xPosForUxPlot + currentRodXPos,
                    y: fixTail(
                        props.objWithSolutionFunctions.U[index](currentRodXPos)
                    ),
                    y0: 0,
                });
                // UxPlotData.push({
                //     x: xPosForUxPlot + currentRodXPos,
                //     y: 0,
                //     y0: 0,
                // });
                // UxPlotData.push({
                //     x: xPosForUxPlot + currentRodXPos,
                //     y: fixTail(
                //         props.objWithSolutionFunctions.U[index](currentRodXPos)
                //     ),
                //     y0: 0,
                // });
            }
        }
        xPosForUxPlot += rodLength;
    });

    const SxPlotData = [];
    let xPosForSxPlot = 0;
    rodsLengths.forEach((rodLength, index) => {
        const dotsPerRod = 10;
        const step = rodLength / dotsPerRod;
        let currentRodXPos = 0;
        for (let i = 0; i < dotsPerRod; i++) {
            SxPlotData.push({
                x: xPosForSxPlot + currentRodXPos,
                y: fixTail(
                    props.objWithSolutionFunctions.S[index](currentRodXPos)
                ),
                y0: 0,
            });
            currentRodXPos += step;
            if (i === dotsPerRod - 1) {
                SxPlotData.push({
                    x: xPosForSxPlot + currentRodXPos,
                    y: fixTail(
                        props.objWithSolutionFunctions.S[index](currentRodXPos)
                    ),
                    y0: 0,
                });
                // SxPlotData.push({
                //     x: xPosForSxPlot + currentRodXPos,
                //     y: 0,
                //     y0: 0,
                // });
                // SxPlotData.push({
                //     x: xPosForSxPlot + currentRodXPos,
                //     y: fixTail(
                //         props.objWithSolutionFunctions.S[index](currentRodXPos)
                //     ),
                //     y0: 0,
                // });
            }
        }
        xPosForSxPlot += rodLength;
    });

    if (NxInputValue < 0 || NxInputValue > rodsLengths[chosenRodForNx - 1]) {
        NxResult = "Неправильно введен X";
    } else {
        NxResult = props.objWithSolutionFunctions.N[chosenRodForNx - 1](
            NxInputValue
        );
    }

    if (UxInputValue < 0 || UxInputValue > rodsLengths[chosenRodForUx - 1]) {
        UxResult = "Неправильно введен X";
    } else {
        UxResult = props.objWithSolutionFunctions.U[chosenRodForUx - 1](
            UxInputValue
        );
    }

    if (SxInputValue < 0 || SxInputValue > rodsLengths[chosenRodForSx - 1]) {
        SxResult = "Неправильно введен X";
    } else {
        SxResult = props.objWithSolutionFunctions.S[chosenRodForSx - 1](
            SxInputValue
        );
    }

    return (
        <div className="post-processor">
            <div className="plots">
                <div className="plot">
                    <VictoryChart>
                        <VictoryArea
                            data={NxPlotData}
                            style={{
                                data: { fill: "#808080", fillOpacity: 0.9 },
                            }}
                        />
                    </VictoryChart>
                    <div className="exact-values">
                        N
                        </div>
                </div>
                <div className="plot">
                    <VictoryChart >
                        <VictoryArea
                            data={UxPlotData}
                            style={{
                                data: { fill: "#808080", fillOpacity: 0.9 },
                            }}
                        />
                    </VictoryChart>
                    <div className="exact-values">
                        U
                    </div>
                </div>
                <div className="plot">
                    <VictoryChart>
                        <VictoryArea
                            data={SxPlotData}
                            style={{
                                data: { fill: "#808080", fillOpacity: 0.9 },
                            }}
                        />
                    </VictoryChart>
                    <div className="exact-values">
                        σ
                       </div>
                </div>
            </div>
            <PostProcessorTable
                rodsSigmas={rodsSigmas}
                rodsLengths={rodsLengths}
                objWithSolutionFunctions={props.objWithSolutionFunctions}
            />
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        isConstructionComputed: state.rodsAndNodes.objWithSolutionFunctions,
        rodsRows: state.rodsAndNodes.rodsRows,
        nodesRows: state.rodsAndNodes.nodesRows,
        leftSupport: state.rodsAndNodes.leftSupport,
        rightSupport: state.rodsAndNodes.rightSupport,
        objWithSolutionFunctions: state.rodsAndNodes.objWithSolutionFunctions,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(PostProcessor);
