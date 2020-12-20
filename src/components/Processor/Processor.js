import React from "react";
import { connect } from "react-redux";
import styles from "./Processor.module.scss";
import calculate from "./calculate";
import { saveSolution } from "./../../reducers/reducer";

function Processor(props) {
    const compute = () => {
        const reducedNodesRows = [];
        for (let i = 0; i < props.rodsRows.length + 1; i++) {
            reducedNodesRows.push({ nodeNumber: i + 1, nodeForce: 0 });
        }
        props.nodesRows.forEach((node) => {
            reducedNodesRows[node.nodeNumber - 1].nodeForce += node.nodeForce;
        });

        reducedNodesRows.forEach((node) => {
            node.nodeForce = Number(node.nodeForce.toFixed(5));
        });
        const solution = calculate(
            props.rodsRows,
            reducedNodesRows,
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
        isReadyForComputation: state.rodsAndNodes.isReadyForSave,
        isConstructionComputed: state.rodsAndNodes.objWithSolutionFunctions,
        rodsRows: state.rodsAndNodes.rodsRows,
        nodesRows: state.rodsAndNodes.nodesRows,
        leftSupport: state.rodsAndNodes.leftSupport,
        rightSupport: state.rodsAndNodes.rightSupport,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        saveSolution: (solution) => dispatch(saveSolution(solution)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Processor);
