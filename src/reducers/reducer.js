import { v4 as uuidv4 } from "uuid";

import {
    SAVE_SOLUTION,
    CLEAR_SOLUTION
} from "./includes/solution_actions";

import {
    SET_NEW_CONSTRUCTION_FROM_FILE_DATA
} from "./includes/file_actions";

import {
    ADD_NEW_STERN,
    NEW_STERN_AREA_CHANGED,
    NEW_STERN_LENGTH_CHANGED,
    NEW_STERN_MODULUS_CHANGED,
    NEW_STERN_SIGMA_CHANGED,
    NEW_STERN_DISTLOAD_CHANGED,
    CHANGE_STERN,
    CHANGING_STERN_AREA_CHANGED,
    CHANGING_STERN_LENGTH_CHANGED,
    CHANGING_STERN_MODULUS_CHANGED,
    CHANGING_STERN_SIGMA_CHANGED,
    CHANGING_STERN_DISTLOAD_CHANGED,
    CHANGING_STERN_SUBMIT,
    REMOVE_STERN_ROW,
} from "./includes/rod_actions";

import {
    SHOW_CANVAS
} from "./includes/canvas_actions";

import {
    ADD_NODE_ROW,
    NEW_NODE_NUMBER_CHANGED,
    NEW_NODE_FORCE_CHANGED,
    CHANGE_NODE,
    REMOVE_NODE_ROW,
    CHANGING_NODE_NUMBER_CHANGED,
    CHANGING_NODE_FORCE_CHANGED,
    CHANGING_NODE_SUBMIT,
} from "./includes/node_actions";

import {
    CHANGE_LEFT_SUPPORT,
    CHANGE_RIGHT_SUPPORT
} from "./includes/supprot_actions";

import {
    CHECK_FOR_ERROR,
    SHOW_CONSTRUCTION_FROM_FILE_ERROR
} from "./includes/error_actions";

import {
    handleFileOpening
} from "./includes/file_actions"

export {handleFileOpening};

const initialState = {
    rodsRows: [],
    nodesRows: [],
    changingSternIndex: null,
    changingSternInputRow: {
        area: "",
        isAreaCorrect: true,
        length: "",
        isLengthCorrect: true,
        modulus: "",
        isModulusCorrect: true,
        sigma: "",
        isSigmaCorrect: true,
        distLoad: "",
        isDistLoadCorrect: true,
    },
    newSternInputRow: {
        area: "",
        isAreaCorrect: true,
        length: "",
        isLengthCorrect: true,
        modulus: "",
        isModulusCorrect: true,
        sigma: "",
        isSigmaCorrect: true,
        distLoad: "",
        isDistLoadCorrect: true,
    },
    newVortexInputRow: {
        nodeNumber: "",
        isVortexNumberCorrect: true,
        nodeForce: "",
        isVortexForceCorrect: true,
    },
    changingVortexIndex: null,
    changingVortexInputRow: {
        nodeNumber: "",
        isVortexNumberCorrect: true,
        nodeForce: "",
        isVortexForceCorrect: true,
    },
    leftSupport: {
        nodeNumber: null,
        isChecked: false,
    },
    rightSupport: {
        nodeNumber: null,
        isChecked: false,
    },
    isError: false,
    errorMessage: "Конструкция не введена",
    isReadyForSave: false,
    objWithSolutionFunctions: null,
    isCanvasShown: false
};

const rodsAndVortexsReducer = (state = initialState, action) => {
    let value = action.value;
    let isCorrect = true;

    switch (action.type) {
        case NEW_STERN_AREA_CHANGED:
            if (
                isNaN(Number(value)) ||
                (Number(value) <= 0 && value.length !== 0)
            ) {
                isCorrect = false;
            }
            return {
                ...state,
                newSternInputRow: {
                    ...state.newSternInputRow,
                    area: value,
                    isAreaCorrect: isCorrect,
                },
            };
        case NEW_STERN_LENGTH_CHANGED:
            if (
                isNaN(Number(value)) ||
                (Number(value) <= 0 && value.length !== 0)
            ) {
                isCorrect = false;
            }
            return {
                ...state,
                newSternInputRow: {
                    ...state.newSternInputRow,
                    length: value,
                    isLengthCorrect: isCorrect,
                },
            };
        case NEW_STERN_MODULUS_CHANGED:
            if (
                isNaN(Number(value)) ||
                (Number(value) <= 0 && value.length !== 0)
            ) {
                isCorrect = false;
            }
            return {
                ...state,
                newSternInputRow: {
                    ...state.newSternInputRow,
                    modulus: value,
                    isModulusCorrect: isCorrect,
                },
            };
        case NEW_STERN_SIGMA_CHANGED:
            if (
                isNaN(Number(value)) ||
                (Number(value) <= 0 && value.length !== 0)
            ) {
                isCorrect = false;
            }
            return {
                ...state,
                newSternInputRow: {
                    ...state.newSternInputRow,
                    sigma: value,
                    isSigmaCorrect: isCorrect,
                },
            };
        case NEW_STERN_DISTLOAD_CHANGED:
            if (isNaN(Number(value))) {
                isCorrect = false;
            }
            return {
                ...state,
                newSternInputRow: {
                    ...state.newSternInputRow,
                    distLoad: value,
                    isDistLoadCorrect: isCorrect,
                },
            };
        case ADD_NEW_STERN:
            if (
                state.newSternInputRow.area.length !== 0 &&
                state.newSternInputRow.isAreaCorrect &&
                state.newSternInputRow.length.length !== 0 &&
                state.newSternInputRow.isLengthCorrect &&
                state.newSternInputRow.modulus.length !== 0 &&
                state.newSternInputRow.isModulusCorrect &&
                state.newSternInputRow.sigma.length !== 0 &&
                state.newSternInputRow.isSigmaCorrect &&
                state.newSternInputRow.distLoad.length !== 0 &&
                state.newSternInputRow.isDistLoadCorrect
            ) {
                const newObj = {
                    ...state,
                    rodsRows: [
                        ...state.rodsRows,
                        {
                            index: state.rodsRows.length + 1,
                            area: Number(state.newSternInputRow.area),
                            length: Number(state.newSternInputRow.length),
                            modulus: Number(state.newSternInputRow.modulus),
                            sigma: Number(state.newSternInputRow.sigma),
                            distLoad: Number(state.newSternInputRow.distLoad),
                            reactKey: uuidv4(),
                        },
                    ],
                    newSternInputRow: {
                        area: "",
                        isAreaCorrect: true,
                        length: "",
                        isLengthCorrect: true,
                        modulus: "",
                        isModulusCorrect: true,
                        sigma: "",
                        isSigmaCorrect: true,
                        distLoad: "",
                        isDistLoadCorrect: true,
                    },
                };
                return newObj;
            } else {
                return {
                    ...state,
                    newSternInputRow: {
                        ...state.newSternInputRow,
                        isAreaCorrect:
                            state.newSternInputRow.area.length !== 0 &&
                            state.newSternInputRow.isAreaCorrect,
                        isLengthCorrect:
                            state.newSternInputRow.length.length !== 0 &&
                            state.newSternInputRow.isLengthCorrect,
                        isModulusCorrect:
                            state.newSternInputRow.modulus.length !== 0 &&
                            state.newSternInputRow.isModulusCorrect,
                        isSigmaCorrect:
                            state.newSternInputRow.sigma.length !== 0 &&
                            state.newSternInputRow.isSigmaCorrect,
                        isDistLoadCorrect:
                            state.newSternInputRow.distLoad.length !== 0 &&
                            state.newSternInputRow.isDistLoadCorrect,
                    },
                };
            }
        case CHANGE_STERN:
            return {
                ...state,
                changingSternIndex: action.index,
                changingSternInputRow: {
                    ...state.changingSternInputRow,
                    area: state.rodsRows[action.index - 1].area,
                    length: state.rodsRows[action.index - 1].length,
                    modulus: state.rodsRows[action.index - 1].modulus,
                    sigma: state.rodsRows[action.index - 1].sigma,
                    distLoad: state.rodsRows[action.index - 1].distLoad,
                },
            };
        case CHANGING_STERN_AREA_CHANGED:
            if (isNaN(Number(value)) || Number(value) <= 0) {
                isCorrect = false;
            }
            return {
                ...state,
                changingSternInputRow: {
                    ...state.changingSternInputRow,
                    area: value,
                    isAreaCorrect: isCorrect,
                },
            };
        case CHANGING_STERN_LENGTH_CHANGED:
            if (
                isNaN(Number(value)) ||
                (Number(value) <= 0 && value.length !== 0)
            ) {
                isCorrect = false;
            }
            return {
                ...state,
                changingSternInputRow: {
                    ...state.changingSternInputRow,
                    length: value,
                    isLengthCorrect: isCorrect,
                },
            };
        case CHANGING_STERN_MODULUS_CHANGED:
            if (
                isNaN(Number(value)) ||
                (Number(value) <= 0 && value.length !== 0)
            ) {
                isCorrect = false;
            }
            return {
                ...state,
                changingSternInputRow: {
                    ...state.changingSternInputRow,
                    modulus: value,
                    isModulusCorrect: isCorrect,
                },
            };
        case CHANGING_STERN_SIGMA_CHANGED:
            if (
                isNaN(Number(value)) ||
                (Number(value) <= 0 && value.length !== 0)
            ) {
                isCorrect = false;
            }
            return {
                ...state,
                changingSternInputRow: {
                    ...state.changingSternInputRow,
                    sigma: value,
                    isSigmaCorrect: isCorrect,
                },
            };
        case CHANGING_STERN_DISTLOAD_CHANGED:
            if (isNaN(Number(value))) {
                isCorrect = false;
            }
            return {
                ...state,
                changingSternInputRow: {
                    ...state.changingSternInputRow,
                    distLoad: value,
                    isDistLoadCorrect: isCorrect,
                },
            };
        case CHANGING_STERN_SUBMIT: {
            if (
                state.changingSternInputRow.area.length !== 0 &&
                state.changingSternInputRow.isAreaCorrect &&
                state.changingSternInputRow.length.length !== 0 &&
                state.changingSternInputRow.isLengthCorrect &&
                state.changingSternInputRow.modulus.length !== 0 &&
                state.changingSternInputRow.isModulusCorrect &&
                state.changingSternInputRow.sigma.length !== 0 &&
                state.changingSternInputRow.isSigmaCorrect &&
                state.changingSternInputRow.distLoad.length !== 0 &&
                state.changingSternInputRow.isDistLoadCorrect
            ) {
                const changedSternData = {
                    index: state.changingSternIndex,
                    area: Number(state.changingSternInputRow.area),
                    length: Number(state.changingSternInputRow.length),
                    modulus: Number(state.changingSternInputRow.modulus),
                    sigma: Number(state.changingSternInputRow.sigma),
                    distLoad: Number(state.changingSternInputRow.distLoad),
                };
                let changedSternsRows = JSON.parse(
                    JSON.stringify(state.rodsRows)
                );
                changedSternsRows.splice(
                    state.changingSternIndex - 1,
                    1,
                    changedSternData
                );

                const newObj = {
                    ...state,
                    rodsRows: changedSternsRows,
                    changingSternIndex: null,
                    changingSternInputRow: {
                        area: "",
                        isAreaCorrect: true,
                        length: "",
                        isLengthCorrect: true,
                        modulus: "",
                        isModulusCorrect: true,
                        sigma: "",
                        isSigmaCorrect: true,
                        distLoad: "",
                        isDistLoadCorrect: true,
                    },
                };
                return newObj;
            } else {
                return {
                    ...state,
                    changingSternInputRow: {
                        ...state.changingSternInputRow,
                        isAreaCorrect:
                            state.changingSternInputRow.area.length !== 0 &&
                            state.changingSternInputRow.isAreaCorrect,
                        isLengthCorrect:
                            state.changingSternInputRow.length.length !== 0 &&
                            state.changingSternInputRow.isLengthCorrect,
                        isModulusCorrect:
                            state.changingSternInputRow.modulus.length !== 0 &&
                            state.changingSternInputRow.isModulusCorrect,
                        isSigmaCorrect:
                            state.changingSternInputRow.sigma.length !== 0 &&
                            state.changingSternInputRow.isSigmaCorrect,
                        isDistLoadCorrect:
                            state.changingSternInputRow.distLoad.length !== 0 &&
                            state.changingSternInputRow.isDistLoadCorrect,
                    },
                };
            }
        }
        case REMOVE_STERN_ROW:
            let filteredSternsRows = [...state.rodsRows];
            filteredSternsRows.splice(action.index - 1, 1);
            filteredSternsRows.forEach((rodRow, index) => {
                rodRow.index = index + 1;
            });

            return {
                ...state,
                rodsRows: filteredSternsRows,
                isReadyForSave: filteredSternsRows.length > 0,
            };
        case ADD_NODE_ROW:
            if (
                state.newVortexInputRow.nodeNumber.length !== 0 &&
                state.newVortexInputRow.isVortexNumberCorrect &&
                state.newVortexInputRow.nodeForce.length !== 0 &&
                state.newVortexInputRow.isVortexForceCorrect
            ) {
                const newVortexData = {
                    nodeNumber: Number(state.newVortexInputRow.nodeNumber),
                    nodeForce: Number(state.newVortexInputRow.nodeForce),
                    reactKey: uuidv4(),
                };
                return {
                    ...state,
                    nodesRows: [...state.nodesRows, newVortexData],
                    newVortexInputRow: {
                        nodeNumber: "",
                        isVortexNumberCorrect: true,
                        nodeForce: "",
                        isVortexForceCorrect: true,
                    },
                };
            } else {
                return {
                    ...state,
                    newVortexInputRow: {
                        ...state.newVortexInputRow,
                        isVortexNumberCorrect:
                            state.newVortexInputRow.nodeNumber.length !== 0 &&
                            state.newVortexInputRow.isVortexNumberCorrect,
                        isVortexForceCorrect:
                            state.newVortexInputRow.nodeForce.length !== 0 &&
                            state.newVortexInputRow.isVortexForceCorrect,
                    },
                };
            }
        case NEW_NODE_NUMBER_CHANGED: {
            if (
                isNaN(Number(value)) ||
                (Number(value) <= 0 && value.length !== 0)
            ) {
                isCorrect = false;
            }
            return {
                ...state,
                newVortexInputRow: {
                    ...state.newVortexInputRow,
                    nodeNumber: value,
                    isVortexNumberCorrect: isCorrect,
                },
            };
        }
        case NEW_NODE_FORCE_CHANGED: {
            if (isNaN(Number(value)) || value.length === 0) {
                isCorrect = false;
            }
            return {
                ...state,
                newVortexInputRow: {
                    ...state.newVortexInputRow,
                    nodeForce: value,
                    isVortexForceCorrect: isCorrect,
                },
            };
        }
        case CHANGE_NODE:
            return {
                ...state,
                changingVortexIndex: action.index,
                changingVortexInputRow: {
                    ...state.changingVortexInputRow,
                    nodeNumber: state.nodesRows[action.index].nodeNumber,
                    nodeForce: state.nodesRows[action.index].nodeForce,
                },
            };
        case CHANGING_NODE_NUMBER_CHANGED:
            if (
                isNaN(Number(value)) ||
                (Number(value) <= 0 && value.length !== 0)
            ) {
                isCorrect = false;
            }
            return {
                ...state,
                changingVortexInputRow: {
                    ...state.changingVortexInputRow,
                    nodeNumber: value,
                    isVortexNumberCorrect: isCorrect,
                },
            };
        case CHANGING_NODE_FORCE_CHANGED:
            if (isNaN(Number(value)) || value.length === 0) {
                isCorrect = false;
            }
            return {
                ...state,
                changingVortexInputRow: {
                    ...state.changingVortexInputRow,
                    nodeForce: value,
                    isVortexForceCorrect: isCorrect,
                },
            };
        case CHANGING_NODE_SUBMIT:
            if (
                state.changingVortexInputRow.nodeNumber.length !== 0 &&
                state.changingVortexInputRow.isVortexNumberCorrect &&
                state.changingVortexInputRow.nodeForce.length !== 0 &&
                state.changingVortexInputRow.isVortexForceCorrect
            ) {
                const changedVortexData = {
                    nodeNumber: Number(state.changingVortexInputRow.nodeNumber),
                    nodeForce: Number(state.changingVortexInputRow.nodeForce),
                    reactKey: uuidv4(),
                };
                let changedVortexsRows = JSON.parse(
                    JSON.stringify(state.nodesRows)
                );
                changedVortexsRows.splice(
                    state.changingVortexIndex,
                    1,
                    changedVortexData
                );
                return {
                    ...state,
                    nodesRows: changedVortexsRows,
                    changingVortexIndex: null,
                    changingVortexInputRow: {
                        nodeNumber: "",
                        isVortexNumberCorrect: true,
                        nodeForce: "",
                        isVortexForceCorrect: true,
                    },
                };
            } else {
                return {
                    ...state,
                    newVortexInputRow: {
                        ...state.newVortexInputRow,
                        isVortexNumberCorrect:
                            state.newVortexInputRow.nodeNumber.length !== 0 &&
                            state.newVortexInputRow.isVortexNumberCorrect,
                        isVortexForceCorrect:
                            state.newVortexInputRow.nodeForce.length !== 0 &&
                            state.newVortexInputRow.isVortexForceCorrect,
                    },
                };
            }
        case REMOVE_NODE_ROW:
            let filteredVortexsRows = [...state.nodesRows];
            filteredVortexsRows.splice(action.index, 1);
            return {
                ...state,
                nodesRows: filteredVortexsRows,
            };

        case CHANGE_LEFT_SUPPORT:
            if (state.rodsRows.length !== 0) {
                return {
                    ...state,
                    leftSupport: {
                        nodeNumber: action.isChecked ? 1 : null,
                        isChecked: action.isChecked,
                    },
                };
            }
            return {
                ...state,
                leftSupport: {
                    nodeNumber: null,
                    isChecked: action.isChecked,
                },
            };
        case CHANGE_RIGHT_SUPPORT:
            if (state.rodsRows.length !== 0) {
                return {
                    ...state,
                    rightSupport: {
                        nodeNumber: action.isChecked
                            ? state.rodsRows.length + 1
                            : null,
                        isChecked: action.isChecked,
                    },
                };
            }
            return {
                ...state,
                rightSupport: {
                    nodeNumber: null,
                    isChecked: action.isChecked,
                },
            };
        case CHECK_FOR_ERROR:
            if (
                !(state.leftSupport.isChecked || state.rightSupport.isChecked)
            ) {
                return {
                    ...state,
                    isError: true,
                    isCanvasShown: false,
                    errorMessage:
                        "В конструкции должна быть хотя бы одна заделка",
                    isReadyForSave: false,
                };
            } else if (state.changingSternIndex !== null) {
                return {
                    ...state,
                    isError: true,
                    isCanvasShown: false,
                    errorMessage: "Закончите изменение стержня",
                    isReadyForSave: false,
                };
            } else if (state.rodsRows.length < 1) {
                return {
                    ...state,
                    isError: true,
                    isCanvasShown: false,
                    errorMessage: "В конструкции отсутствуют стержни",
                    isReadyForSave: false,
                };
            } else if (
                (state.rodsRows.length === 0 && state.nodesRows.length !== 0) ||
                (state.rodsRows.length >= 1 &&
                    Math.max(
                        ...state.nodesRows.map((node) => node.nodeNumber)
                    ) >
                        state.rodsRows.length + 1)
            ) {
                return {
                    ...state,
                    isError: true,
                    isCanvasShown: false,
                    errorMessage: `Узел ${Math.max(
                        ...state.nodesRows.map((node) => node.nodeNumber)
                    )} не существует в конструкции`,
                    isReadyForSave: false,
                };
            } else {
                return {
                    ...state,
                    isError: false,
                    isCanvasShown: true,
                    errorMessage: "",
                    isReadyForSave: true,
                };
            }
        case SET_NEW_CONSTRUCTION_FROM_FILE_DATA: {
            return {
                ...action.newConstructionObj,
            };
        }
        case SAVE_SOLUTION:
            return {
                ...state,
                objWithSolutionFunctions: action.solution,
            };
        case CLEAR_SOLUTION:
            return {
                ...state,
                objWithSolutionFunctions: null,
            };
        case SHOW_CANVAS :
            return {
                ...state,
                isCanvasShown: true
            }
        default:
            return state;
    }
};

export default rodsAndVortexsReducer;

export const addNewStern = () => ({ type: ADD_NEW_STERN });
export const newSternAreaChanged = (value) => ({
    type: NEW_STERN_AREA_CHANGED,
    value,
});
export const newSternLengthChanged = (value) => ({
    type: NEW_STERN_LENGTH_CHANGED,
    value,
});
export const newSternModulusChanged = (value) => ({
    type: NEW_STERN_MODULUS_CHANGED,
    value,
});
export const newSternSigmaChanged = (value) => ({
    type: NEW_STERN_SIGMA_CHANGED,
    value,
});
export const newSternDistLoadChanged = (value) => ({
    type: NEW_STERN_DISTLOAD_CHANGED,
    value,
});

export const changeStern = (index) => ({
    type: CHANGE_STERN,
    index,
});
export const changingSternAreaChanged = (value) => ({
    type: CHANGING_STERN_AREA_CHANGED,
    value,
});
export const changingSternLengthChanged = (value) => ({
    type: CHANGING_STERN_LENGTH_CHANGED,
    value,
});
export const changingSternModulusChanged = (value) => ({
    type: CHANGING_STERN_MODULUS_CHANGED,
    value,
});
export const changingSternSigmaChanged = (value) => ({
    type: CHANGING_STERN_SIGMA_CHANGED,
    value,
});
export const changingSternDistLoadChanged = (value) => ({
    type: CHANGING_STERN_DISTLOAD_CHANGED,
    value,
});

export const changingSternSubmit = () => ({
    type: CHANGING_STERN_SUBMIT,
});

export const removeSternRow = (index) => ({
    type: REMOVE_STERN_ROW,
    index,
});

export const addVortexRow = () => ({
    type: ADD_NODE_ROW,
});

export const removeVortexRow = (index) => ({
    type: REMOVE_NODE_ROW,
    index,
});

export const changeVortex = (index) => ({
    type: CHANGE_NODE,
    index,
});

export const newVortexNumberChanged = (value) => ({
    type: NEW_NODE_NUMBER_CHANGED,
    value,
});

export const newVortexForceChanged = (value) => ({
    type: NEW_NODE_FORCE_CHANGED,
    value,
});

export const changingVortexNumberChanged = (value) => ({
    type: CHANGING_NODE_NUMBER_CHANGED,
    value,
});

export const changingVortexForceChanged = (value) => ({
    type: CHANGING_NODE_FORCE_CHANGED,
    value,
});

export const changingVortexSubmit = () => ({
    type: CHANGING_NODE_SUBMIT,
});

export const changeLeftSupport = (isChecked) => ({
    type: CHANGE_LEFT_SUPPORT,
    isChecked,
});

export const changeRightSupport = (isChecked) => ({
    type: CHANGE_RIGHT_SUPPORT,
    isChecked,
});

export const checkForError = () => ({ type: CHECK_FOR_ERROR });

export const downloadConstruction = () => (dispatch, getState) => {
    dispatch(checkForError());
    if (getState().rodsAndVortexs.isReadyForSave) {
        const state = getState().rodsAndVortexs;
        const objForDownload = {
            rods: state.rodsRows.map((stem) => {
                return [
                    stem.area,
                    stem.length,
                    stem.modulus,
                    stem.sigma,
                    stem.distLoad,
                ];
            }),
            nodes: state.nodesRows.map((node) => [
                node.nodeNumber,
                node.nodeForce,
            ]),
            left: state.leftSupport.nodeNumber ? true : false,
            right: state.rightSupport.nodeNumber ? true : false,
        };
        let a = document.createElement("a");
        a.setAttribute("download", "construction.json");
        a.href =
            "data:text/plain;charset=utf-8," +
            encodeURIComponent(JSON.stringify(objForDownload, null, "\t"));
        a.click();
    }
};

export const setNewConstructionFromFileData = (newConstructionObj) => ({
    type: SET_NEW_CONSTRUCTION_FROM_FILE_DATA,
    newConstructionObj,
});

export const showFileReadingError = (message) => ({
    type: SHOW_CONSTRUCTION_FROM_FILE_ERROR,
    message,
});



export const saveSolution = (solutionObj) => ({
    type: SAVE_SOLUTION,
    solution: solutionObj,
});

export const clearSolution = () => ({
    type: CLEAR_SOLUTION,
});

export const showCanvas = () => ({
    type: SHOW_CANVAS
})
