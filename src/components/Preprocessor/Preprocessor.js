import React, { useRef } from "react";
import { connect } from "react-redux";
import {
    addNewRod,
    newRodAreaChanged,
    newRodLengthChanged,
    newRodModulusChanged,
    newRodSigmaChanged,
    newRodDistLoadChanged,
    changeRod,
    changingRodAreaChanged,
    changingRodLengthChanged,
    changingRodModulusChanged,
    changingRodSigmaChanged,
    changingRodDistLoadChanged,
    changingRodSubmit,
    removeRodRow,
    addNodeRow,
    newNodeNumberChanged,
    newNodeForceChanged,
    removeNodeRow,
    changeNode,
    changingNodeNumberChanged,
    changingNodeForceChanged,
    changingNodeSubmit,
    changeLeftSupport,
    changeRightSupport,
    checkForError,
    downloadConstruction,
    handleFileOpening,
    clearSolution,
    showCanvas,
} from "../../reducers/reducer";
import ConstructionCanvas from "./ConstructionCanvas";
import "./Preprocessor.scss";

function Preprocessor(props) {
    const openFileInputRef = useRef(null);
    return (
        <div className="preprocessor__body">
            <div className="preprocessor__rods">

                <table class="preprocessor__rods-table">
                    <thead>
                        <tr>
                            <th>Стержень</th>
                            <th>A</th>
                            <th>L</th>
                            <th>E</th>
                            <th>σ</th>
                            <th>q</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.rodsRows.map((rodRow) => {
                            if (rodRow.index === props.changingRodIndex) {
                                return (
                                    <tr>
                                        <td>{props.changingRodIndex}</td>
                                        <td>
                                            <input
                                                type="text"
                                                value={
                                                    props.changingRodInputRow
                                                        .area
                                                }
                                                onChange={(e) =>
                                                    props.changingRodAreaChanged(
                                                        e.target.value
                                                    )
                                                }
                                                className={`table-input ${
                                                    props.changingRodInputRow
                                                        .isAreaCorrect
                                                        ? ""
                                                        : "input-error"
                                                }`}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                value={
                                                    props.changingRodInputRow
                                                        .length
                                                }
                                                onChange={(e) =>
                                                    props.changingRodLengthChanged(
                                                        e.target.value
                                                    )
                                                }
                                                className={`table-input ${
                                                    props.changingRodInputRow
                                                        .isLengthCorrect
                                                        ? ""
                                                        : "input-error"
                                                }`}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                value={
                                                    props.changingRodInputRow
                                                        .modulus
                                                }
                                                onChange={(e) =>
                                                    props.changingRodModulusChanged(
                                                        e.target.value
                                                    )
                                                }
                                                className={`table-input ${
                                                    props.changingRodInputRow
                                                        .isModulusCorrect
                                                        ? ""
                                                        : "input-error"
                                                }`}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                value={
                                                    props.changingRodInputRow
                                                        .sigma
                                                }
                                                onChange={(e) =>
                                                    props.changingRodSigmaChanged(
                                                        e.target.value
                                                    )
                                                }
                                                className={`table-input ${
                                                    props.changingRodInputRow
                                                        .isSigmaCorrect
                                                        ? ""
                                                        : "input-error"
                                                }`}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                value={
                                                    props.changingRodInputRow
                                                        .distLoad
                                                }
                                                onChange={(e) =>
                                                    props.changingRodDistLoadChanged(
                                                        e.target.value
                                                    )
                                                }
                                                className={`table-input ${
                                                    props.changingRodInputRow
                                                        .isDistLoadCorrect
                                                        ? ""
                                                        : "input-error"
                                                }`}
                                            />
                                        </td>
                                        <td
                                        // className={styles.rodRowButtons}
                                        >
                                            <button
                                                onClick={() => {
                                                    props.changingRodSubmit();
                                                    props.clearSolution();
                                                }}>
                                                ✓
                                            </button>
                                        </td>
                                    </tr>
                                );
                            }
                            return (
                                <tr key={rodRow.reactKey}>
                                    <td>{rodRow.index}</td>
                                    <td>{rodRow.area}</td>
                                    <td>{rodRow.length}</td>
                                    <td>{rodRow.modulus}</td>
                                    <td>{rodRow.sigma}</td>
                                    <td>{rodRow.distLoad}</td>
                                    <td className="preprocessor__rods-row-buttons">
                                    </td>
                                </tr>
                            );
                        })}
                        <tr>
                            <td>{props.rodsRows.length + 1}</td>
                            <td>
                                <input
                                    className={`table-input ${
                                        props.newRodInputRow.isAreaCorrect
                                            ? ""
                                            : "input-error"
                                    }`}
                                    type="text"
                                    value={props.newRodInputRow.area}
                                    onChange={(e) => {
                                        props.newRodAreaChanged(e.target.value);
                                    }}
                                />
                            </td>
                            <td>
                                <input
                                    className={`table-input ${
                                        props.newRodInputRow.isLengthCorrect
                                            ? ""
                                            : "input-error"
                                    }`}
                                    type="text"
                                    value={props.newRodInputRow.length}
                                    onChange={(e) => {
                                        props.newRodLengthChanged(
                                            e.target.value
                                        );
                                    }}
                                />
                            </td>
                            <td>
                                <input
                                    className={`table-input ${
                                        props.newRodInputRow.isModulusCorrect
                                            ? ""
                                            : "input-error"
                                    }`}
                                    type="text"
                                    value={props.newRodInputRow.modulus}
                                    onChange={(e) => {
                                        props.newRodModulusChanged(
                                            e.target.value
                                        );
                                    }}
                                />
                            </td>
                            <td>
                                <input
                                    className={`table-input ${
                                        props.newRodInputRow.isSigmaCorrect
                                            ? ""
                                            : "input-error"
                                    }`}
                                    type="text"
                                    value={props.newRodInputRow.sigma}
                                    onChange={(e) => {
                                        props.newRodSigmaChanged(
                                            e.target.value
                                        );
                                    }}
                                />
                            </td>
                            <td>
                                <input
                                    className={`table-input ${
                                        props.newRodInputRow.isDistLoadCorrect
                                            ? ""
                                            : "input-error"
                                    }`}
                                    type="text"
                                    value={props.newRodInputRow.distLoad}
                                    onChange={(e) => {
                                        props.newRodDistLoadChanged(
                                            e.target.value
                                        );
                                    }}
                                />
                            </td>
                            <td className="preprocessor__rods-add-rod-button-td">
                                <button
                                    className="preprocessor__rods-add-rod-button"
                                    onClick={() => {
                                        props.addRod();
                                        props.changeLeftSupport(
                                            props.leftSupport.isChecked
                                        );
                                        props.changeRightSupport(
                                            props.rightSupport.isChecked
                                        );
                                        props.checkForError();
                                        props.clearSolution();
                                    }}>
                                    Добавить
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="preprocessor__nodes">
                <table className="preprocessor__nodes-table">
                    <thead>
                        <tr>
                            <th>Номер узла</th>
                            <th>H</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.nodesRows.map((nodeRow, index) => {
                            if (index === props.changingNodeIndex) {
                                return (
                                    <tr>
                                        <td>
                                            <input
                                                type="text"
                                                value={
                                                    props.changingNodeInputRow
                                                        .nodeNumber
                                                }
                                                onChange={(e) =>
                                                    props.changingNodeNumberChanged(
                                                        e.target.value
                                                    )
                                                }
                                                className={`table-input ${
                                                    props.changingNodeInputRow
                                                        .isNodeNumberCorrect
                                                        ? ""
                                                        : "input-error"
                                                }`}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                value={
                                                    props.changingNodeInputRow
                                                        .nodeForce
                                                }
                                                onChange={(e) =>
                                                    props.changingNodeForceChanged(
                                                        e.target.value
                                                    )
                                                }
                                                className={`table-input ${
                                                    props.changingNodeInputRow
                                                        .isNodeForceCorrect
                                                        ? ""
                                                        : "input-error"
                                                }`}
                                            />
                                        </td>
                                        <td
                                        // className={styles.rodRowButtons}
                                        >
                                            <button
                                                onClick={() => {
                                                    props.changingNodeSubmit();
                                                    props.checkForError();
                                                    props.clearSolution();
                                                }}>
                                                ✓
                                            </button>
                                        </td>
                                    </tr>
                                );
                            }
                            return (
                                <tr>
                                    <td>{nodeRow.nodeNumber}</td>
                                    <td>{nodeRow.nodeForce}</td>
                                    <td className="preprocessor__nodes-button-td">

                                    </td>
                                </tr>
                            );
                        })}
                        <tr>
                            <td>
                                <input
                                    type="text"
                                    value={props.newNodeInputRow.nodeNumber}
                                    onChange={(e) =>
                                        props.newNodeNumberChanged(
                                            e.target.value
                                        )
                                    }
                                    className={`table-input ${
                                        props.newNodeInputRow
                                            .isNodeNumberCorrect
                                            ? ""
                                            : "input-error"
                                    }`}
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    value={props.newNodeInputRow.nodeForce}
                                    onChange={(e) =>
                                        props.newNodeForceChanged(
                                            e.target.value
                                        )
                                    }
                                    className={`table-input ${
                                        props.newNodeInputRow.isNodeForceCorrect
                                            ? ""
                                            : "input-error"
                                    }`}
                                />
                            </td>
                            <td className="preprocessor__nodes-button-td">
                                <button
                                    onClick={() => {
                                        props.addNodeRow();
                                        props.checkForError();
                                    }}>
                                    Добавить нагрузку
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="preprocessor__rods-interface">
                <div className="preprocessor__rods-supports">
                    <div>
                        Левая заделка
                        <input
                            type="checkbox"
                            // className={styles.scale}
                            checked={props.leftSupport.isChecked}
                            onChange={(e) => {
                                props.changeLeftSupport(e.target.checked);
                                props.clearSolution();
                                props.checkForError();
                            }}
                        />
                    </div>
                    <div>
                        Правая заделка
                        <input
                            type="checkbox"
                            checked={props.rightSupport.isChecked}
                            onChange={(e) => {
                                props.changeRightSupport(e.target.checked);
                                props.clearSolution();
                                props.checkForError();
                            }}
                        />
                    </div>
                </div>
                {/*<div className="preprocessor__rods-buttons">*/}
                {/*    <div>*/}
                {/*        <button*/}
                {/*            // disabled={!props.isReadyForSave}*/}
                {/*            onClick={() => {*/}
                {/*                if (*/}
                {/*                    props.errorMessage.length > 0 ||*/}
                {/*                    !props.isReadyForSave*/}
                {/*                ) {*/}
                {/*                    alert(props.errorMessage);*/}
                {/*                } else {*/}
                {/*                    props.showCanvas();*/}
                {/*                }*/}
                {/*            }}>*/}
                {/*            Построить конструкцию*/}
                {/*        </button>*/}
                {/*    </div>*/}
                {/*</div>*/}
            </div>
            {props.isCanvasShown ? <ConstructionCanvas data={props} /> : null}
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        rodsRows: state.rodsAndNodes.rodsRows,
        newRodInputRow: state.rodsAndNodes.newRodInputRow,
        changingRodIndex: state.rodsAndNodes.changingRodIndex,
        changingRodInputRow: state.rodsAndNodes.changingRodInputRow,

        nodesRows: state.rodsAndNodes.nodesRows,
        newNodeInputRow: state.rodsAndNodes.newNodeInputRow,
        changingNodeIndex: state.rodsAndNodes.changingNodeIndex,
        changingNodeInputRow: state.rodsAndNodes.changingNodeInputRow,

        leftSupport: state.rodsAndNodes.leftSupport,
        rightSupport: state.rodsAndNodes.rightSupport,

        isError: state.rodsAndNodes.isError,
        errorMessage: state.rodsAndNodes.errorMessage,
        isReadyForSave: state.rodsAndNodes.isReadyForSave,
        isCanvasShown: state.rodsAndNodes.isCanvasShown,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        addRod: () => dispatch(addNewRod()),
        newRodAreaChanged: (value) => {
            dispatch(newRodAreaChanged(value));
        },
        newRodLengthChanged: (value) => dispatch(newRodLengthChanged(value)),
        newRodModulusChanged: (value) => dispatch(newRodModulusChanged(value)),
        newRodSigmaChanged: (value) => dispatch(newRodSigmaChanged(value)),
        newRodDistLoadChanged: (value) =>
            dispatch(newRodDistLoadChanged(value)),
        changeRod: (index) => dispatch(changeRod(index)),
        changingRodAreaChanged: (value) =>
            dispatch(changingRodAreaChanged(value)),
        changingRodLengthChanged: (value) =>
            dispatch(changingRodLengthChanged(value)),
        changingRodModulusChanged: (value) =>
            dispatch(changingRodModulusChanged(value)),
        changingRodSigmaChanged: (value) =>
            dispatch(changingRodSigmaChanged(value)),
        changingRodDistLoadChanged: (value) =>
            dispatch(changingRodDistLoadChanged(value)),
        changingRodSubmit: () => dispatch(changingRodSubmit()),
        removeRodRow: (index) => dispatch(removeRodRow(index)),

        addNodeRow: () => dispatch(addNodeRow()),
        removeNodeRow: (index) => dispatch(removeNodeRow(index)),
        changeNode: (index) => dispatch(changeNode(index)),
        newNodeNumberChanged: (value) => dispatch(newNodeNumberChanged(value)),
        newNodeForceChanged: (value) => dispatch(newNodeForceChanged(value)),
        changingNodeNumberChanged: (value) =>
            dispatch(changingNodeNumberChanged(value)),
        changingNodeForceChanged: (value) =>
            dispatch(changingNodeForceChanged(value)),
        changingNodeSubmit: () => dispatch(changingNodeSubmit()),
        changeLeftSupport: (isChecked) =>
            dispatch(changeLeftSupport(isChecked)),
        changeRightSupport: (isChecked) =>
            dispatch(changeRightSupport(isChecked)),
        checkForError: () => dispatch(checkForError()),
        downloadConstruction: () => dispatch(downloadConstruction()),
        handleFileOpening: (inputRef) => dispatch(handleFileOpening(inputRef)),
        clearSolution: () => dispatch(clearSolution()),
        showCanvas: () => dispatch(showCanvas()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Preprocessor);
