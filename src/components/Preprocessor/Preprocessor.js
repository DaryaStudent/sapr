import { connect } from "react-redux";
import {
    addNewStern,
    newSternAreaChanged,
    newSternLengthChanged,
    newSternModulusChanged,
    newSternSigmaChanged,
    newSternDistLoadChanged,
    changeStern,
    changingSternAreaChanged,
    changingSternLengthChanged,
    changingSternModulusChanged,
    changingSternSigmaChanged,
    changingSternDistLoadChanged,
    changingSternSubmit,
    removeSternRow,
    addVortexRow,
    newVortexNumberChanged,
    newVortexForceChanged,
    removeVortexRow,
    changeVortex,
    changingVortexNumberChanged,
    changingVortexForceChanged,
    changingVortexSubmit,
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
    return (
        <div className="preprocessor__body">
            <div className="preprocessor__STERNs">

                <table class="preprocessor__STERNs-table">
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
                            if (rodRow.index === props.changingSternIndex) {
                                return (
                                    <tr>
                                        <td>{props.changingSternIndex}</td>
                                        <td>
                                            <input
                                                type="text"
                                                value={
                                                    props.changingSternInputRow
                                                        .area
                                                }
                                                onChange={(e) =>
                                                    props.changingSternAreaChanged(
                                                        e.target.value
                                                    )
                                                }
                                                className={`table-input ${
                                                    props.changingSternInputRow
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
                                                    props.changingSternInputRow
                                                        .length
                                                }
                                                onChange={(e) =>
                                                    props.changingSternLengthChanged(
                                                        e.target.value
                                                    )
                                                }
                                                className={`table-input ${
                                                    props.changingSternInputRow
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
                                                    props.changingSternInputRow
                                                        .modulus
                                                }
                                                onChange={(e) =>
                                                    props.changingSternModulusChanged(
                                                        e.target.value
                                                    )
                                                }
                                                className={`table-input ${
                                                    props.changingSternInputRow
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
                                                    props.changingSternInputRow
                                                        .sigma
                                                }
                                                onChange={(e) =>
                                                    props.changingSternSigmaChanged(
                                                        e.target.value
                                                    )
                                                }
                                                className={`table-input ${
                                                    props.changingSternInputRow
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
                                                    props.changingSternInputRow
                                                        .distLoad
                                                }
                                                onChange={(e) =>
                                                    props.changingSternDistLoadChanged(
                                                        e.target.value
                                                    )
                                                }
                                                className={`table-input ${
                                                    props.changingSternInputRow
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
                                                    props.changingSternSubmit();
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
                                    <td className="preprocessor__STERNs-row-buttons">
                                    </td>
                                </tr>
                            );
                        })}
                        <tr>
                            <td>{props.rodsRows.length + 1}</td>
                            <td>
                                <input
                                    className={`table-input ${
                                        props.newSternInputRow.isAreaCorrect
                                            ? ""
                                            : "input-error"
                                    }`}
                                    type="text"
                                    value={props.newSternInputRow.area}
                                    onChange={(e) => {
                                        props.newSternAreaChanged(e.target.value);
                                    }}
                                />
                            </td>
                            <td>
                                <input
                                    className={`table-input ${
                                        props.newSternInputRow.isLengthCorrect
                                            ? ""
                                            : "input-error"
                                    }`}
                                    type="text"
                                    value={props.newSternInputRow.length}
                                    onChange={(e) => {
                                        props.newSternLengthChanged(
                                            e.target.value
                                        );
                                    }}
                                />
                            </td>
                            <td>
                                <input
                                    className={`table-input ${
                                        props.newSternInputRow.isModulusCorrect
                                            ? ""
                                            : "input-error"
                                    }`}
                                    type="text"
                                    value={props.newSternInputRow.modulus}
                                    onChange={(e) => {
                                        props.newSternModulusChanged(
                                            e.target.value
                                        );
                                    }}
                                />
                            </td>
                            <td>
                                <input
                                    className={`table-input ${
                                        props.newSternInputRow.isSigmaCorrect
                                            ? ""
                                            : "input-error"
                                    }`}
                                    type="text"
                                    value={props.newSternInputRow.sigma}
                                    onChange={(e) => {
                                        props.newSternSigmaChanged(
                                            e.target.value
                                        );
                                    }}
                                />
                            </td>
                            <td>
                                <input
                                    className={`table-input ${
                                        props.newSternInputRow.isDistLoadCorrect
                                            ? ""
                                            : "input-error"
                                    }`}
                                    type="text"
                                    value={props.newSternInputRow.distLoad}
                                    onChange={(e) => {
                                        props.newSternDistLoadChanged(
                                            e.target.value
                                        );
                                    }}
                                />
                            </td>
                            <td className="preprocessor__STERNs-add-stem-button-td">
                                <button
                                    className="preprocessor__STERNs-add-stem-button"
                                    onClick={() => {
                                        props.addStern();
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
                            if (index === props.changingVortexIndex) {
                                return (
                                    <tr>
                                        <td>
                                            <input
                                                type="text"
                                                value={
                                                    props.changingVortexInputRow
                                                        .nodeNumber
                                                }
                                                onChange={(e) =>
                                                    props.changingVortexNumberChanged(
                                                        e.target.value
                                                    )
                                                }
                                                className={`table-input ${
                                                    props.changingVortexInputRow
                                                        .isVortexNumberCorrect
                                                        ? ""
                                                        : "input-error"
                                                }`}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                value={
                                                    props.changingVortexInputRow
                                                        .nodeForce
                                                }
                                                onChange={(e) =>
                                                    props.changingVortexForceChanged(
                                                        e.target.value
                                                    )
                                                }
                                                className={`table-input ${
                                                    props.changingVortexInputRow
                                                        .isVortexForceCorrect
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
                                                    props.changingVortexSubmit();
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
                                    value={props.newVortexInputRow.nodeNumber}
                                    onChange={(e) =>
                                        props.newVortexNumberChanged(
                                            e.target.value
                                        )
                                    }
                                    className={`table-input ${
                                        props.newVortexInputRow
                                            .isVortexNumberCorrect
                                            ? ""
                                            : "input-error"
                                    }`}
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    value={props.newVortexInputRow.nodeForce}
                                    onChange={(e) =>
                                        props.newVortexForceChanged(
                                            e.target.value
                                        )
                                    }
                                    className={`table-input ${
                                        props.newVortexInputRow.isVortexForceCorrect
                                            ? ""
                                            : "input-error"
                                    }`}
                                />
                            </td>
                            <td className="preprocessor__nodes-button-td">
                                <button
                                    onClick={() => {
                                        props.addVortexRow();
                                        props.checkForError();
                                    }}>
                                    Добавить нагрузку
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="preprocessor__STERNs-interface">
                <div className="preprocessor__STERNs-supports">
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
                {/*<div className="preprocessor__STERNs-buttons">*/}
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
        rodsRows: state.rodsAndVortexs.rodsRows,
        newSternInputRow: state.rodsAndVortexs.newSternInputRow,
        changingSternIndex: state.rodsAndVortexs.changingSternIndex,
        changingSternInputRow: state.rodsAndVortexs.changingSternInputRow,

        nodesRows: state.rodsAndVortexs.nodesRows,
        newVortexInputRow: state.rodsAndVortexs.newVortexInputRow,
        changingVortexIndex: state.rodsAndVortexs.changingVortexIndex,
        changingVortexInputRow: state.rodsAndVortexs.changingVortexInputRow,

        leftSupport: state.rodsAndVortexs.leftSupport,
        rightSupport: state.rodsAndVortexs.rightSupport,

        isError: state.rodsAndVortexs.isError,
        errorMessage: state.rodsAndVortexs.errorMessage,
        isReadyForSave: state.rodsAndVortexs.isReadyForSave,
        isCanvasShown: state.rodsAndVortexs.isCanvasShown,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        addStern: () => dispatch(addNewStern()),
        newSternAreaChanged: (value) => {
            dispatch(newSternAreaChanged(value));
        },
        newSternLengthChanged: (value) => dispatch(newSternLengthChanged(value)),
        newSternModulusChanged: (value) => dispatch(newSternModulusChanged(value)),
        newSternSigmaChanged: (value) => dispatch(newSternSigmaChanged(value)),
        newSternDistLoadChanged: (value) =>
            dispatch(newSternDistLoadChanged(value)),
        changeStern: (index) => dispatch(changeStern(index)),
        changingSternAreaChanged: (value) =>
            dispatch(changingSternAreaChanged(value)),
        changingSternLengthChanged: (value) =>
            dispatch(changingSternLengthChanged(value)),
        changingSternModulusChanged: (value) =>
            dispatch(changingSternModulusChanged(value)),
        changingSternSigmaChanged: (value) =>
            dispatch(changingSternSigmaChanged(value)),
        changingSternDistLoadChanged: (value) =>
            dispatch(changingSternDistLoadChanged(value)),
        changingSternSubmit: () => dispatch(changingSternSubmit()),
        removeSternRow: (index) => dispatch(removeSternRow(index)),

        addVortexRow: () => dispatch(addVortexRow()),
        removeVortexRow: (index) => dispatch(removeVortexRow(index)),
        changeVortex: (index) => dispatch(changeVortex(index)),
        newVortexNumberChanged: (value) => dispatch(newVortexNumberChanged(value)),
        newVortexForceChanged: (value) => dispatch(newVortexForceChanged(value)),
        changingVortexNumberChanged: (value) =>
            dispatch(changingVortexNumberChanged(value)),
        changingVortexForceChanged: (value) =>
            dispatch(changingVortexForceChanged(value)),
        changingVortexSubmit: () => dispatch(changingVortexSubmit()),
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
