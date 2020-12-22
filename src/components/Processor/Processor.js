import React from "react";
import { connect } from "react-redux";
import styles from "./Processor.module.scss";
import calculate from "./calculate";
import { saveSolution } from "./../../reducers/reducer";

function Processor(props) {
    const compute = () => {
        const reducedVortexsRows = [];
        for (let i = 0; i < props.rodsRows.length + 1; i++) {
            reducedVortexsRows.push({ nodeNumber: i + 1, nodeForce: 0 });
        }
        props.nodesRows.forEach((node) => {
            reducedVortexsRows[node.nodeNumber - 1].nodeForce += node.nodeForce;
        });

        reducedVortexsRows.forEach((node) => {
            node.nodeForce = Number(node.nodeForce.toFixed(5));
        });
        const solution = calculate(
            props.rodsRows,
            reducedVortexsRows,
            props.leftSupport,
            props.rightSupport
        );
        props.saveSolution(solution);
    };
    return (
        <div className={styles.Processor}>
            <button disabled={!props.isReadyForComputation} onClick={compute}>
                Расчитать
            </button>
            <div>
                {props.isConstructionComputed && props.isReadyForComputation
                    ? "done"
                    : !props.isReadyForComputation
                    ? "error: incorrect construction"
                    : null}
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        isReadyForComputation: state.rodsAndVortexs.isReadyForSave,
        isConstructionComputed: state.rodsAndVortexs.objWithSolutionFunctions,
        rodsRows: state.rodsAndVortexs.rodsRows,
        nodesRows: state.rodsAndVortexs.nodesRows,
        leftSupport: state.rodsAndVortexs.leftSupport,
        rightSupport: state.rodsAndVortexs.rightSupport,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        saveSolution: (solution) => dispatch(saveSolution(solution)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Processor);
