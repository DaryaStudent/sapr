import "./PostProcessor.scss";
import { VictoryChart, VictoryArea } from "victory";
import { connect } from "react-redux";
import { fixTail } from "./../Processor/calculate";
import PostProcessorTable from "./PostProcessorTable";

function PostProcessor(props) {

    if (!props.objWithSolutionFunctions) {
        return (
            <div className="post-processor error">
                <div>Error: no result data.</div>
            </div>
        );
    }

    const rodsLengths = props.rodsRows.map((stem) => stem.length);
    const rodsSigmas = props.rodsRows.map((stem) => stem.sigma);
    const NxPlotData = [];
    let xPosForNxPlot = 0;
    rodsLengths.forEach((rodLength, index) => {
        const dotsPerStern = 10;
        const step = rodLength / dotsPerStern;
        let currentSternXPos = 0;
        for (let i = 0; i < dotsPerStern; i++) {
            NxPlotData.push({
                x: xPosForNxPlot + currentSternXPos,
                y: fixTail(
                    props.objWithSolutionFunctions.N[index](currentSternXPos)
                ),
                y0: 0,
            });
            currentSternXPos += step;
            if (i === dotsPerStern - 1) {
                NxPlotData.push({
                    x: xPosForNxPlot + currentSternXPos,
                    y: fixTail(
                        props.objWithSolutionFunctions.N[index](currentSternXPos)
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
        const dotsPerStern = 10;
        const step = rodLength / dotsPerStern;
        let currentSternXPos = 0;
        for (let i = 0; i < dotsPerStern; i++) {
            UxPlotData.push({
                x: xPosForUxPlot + currentSternXPos,
                y: fixTail(
                    props.objWithSolutionFunctions.U[index](currentSternXPos)
                ),
                y0: 0,
            });
            currentSternXPos += step;
            if (i === dotsPerStern - 1) {
                UxPlotData.push({
                    x: xPosForUxPlot + currentSternXPos,
                    y: fixTail(
                        props.objWithSolutionFunctions.U[index](currentSternXPos)
                    ),
                    y0: 0,
                });
            }
        }
        xPosForUxPlot += rodLength;
    });

    const SxPlotData = [];
    let xPosForSxPlot = 0;
    rodsLengths.forEach((rodLength, index) => {
        const dotsPerStern = 10;
        const step = rodLength / dotsPerStern;
        let currentSternXPos = 0;
        for (let i = 0; i < dotsPerStern; i++) {
            SxPlotData.push({
                x: xPosForSxPlot + currentSternXPos,
                y: fixTail(
                    props.objWithSolutionFunctions.S[index](currentSternXPos)
                ),
                y0: 0,
            });
            currentSternXPos += step;
            if (i === dotsPerStern - 1) {
                SxPlotData.push({
                    x: xPosForSxPlot + currentSternXPos,
                    y: fixTail(
                        props.objWithSolutionFunctions.S[index](currentSternXPos)
                    ),
                    y0: 0,
                });
            }
        }
        xPosForSxPlot += rodLength;
    });


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
        isConstructionComputed: state.rodsAndVortexs.objWithSolutionFunctions,
        rodsRows: state.rodsAndVortexs.rodsRows,
        nodesRows: state.rodsAndVortexs.nodesRows,
        leftSupport: state.rodsAndVortexs.leftSupport,
        rightSupport: state.rodsAndVortexs.rightSupport,
        objWithSolutionFunctions: state.rodsAndVortexs.objWithSolutionFunctions,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(PostProcessor);
