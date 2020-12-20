import { v4 as uuidv4 } from "uuid";

const ADD_NEW_ROD = "ADD_NEW_ROD";
const NEW_ROD_AREA_CHANGED = "NEW_ROD_AREA_CHANGED";
const NEW_ROD_LENGTH_CHANGED = "NEW_ROD_LENGTH_CHANGED";
const NEW_ROD_MODULUS_CHANGED = "NEW_ROD_MODULUS_CHANGED";
const NEW_ROD_SIGMA_CHANGED = "NEW_ROD_SIGMA_CHANGED";
const NEW_ROD_DISTLOAD_CHANGED = "NEW_ROD_DISTLOAD_CHANGED";

const CHANGE_ROD = "CHANGE_ROD";
const CHANGING_ROD_AREA_CHANGED = "CHANGING_ROD_AREA_CHANGED";
const CHANGING_ROD_LENGTH_CHANGED = "CHANGING_ROD_LENGTH_CHANGED";
const CHANGING_ROD_MODULUS_CHANGED = "CHANGING_ROD_MODULUS_CHANGED";
const CHANGING_ROD_SIGMA_CHANGED = "CHANGING_ROD_SIGMA_CHANGED";
const CHANGING_ROD_DISTLOAD_CHANGED = "CHANGING_ROD_DISTLOAD_CHANGED";
const CHANGING_ROD_SUBMIT = "CHANGING_ROD_SUBMIT";

const REMOVE_ROD_ROW = "REMOVE_ROD_ROW";
const ADD_NODE_ROW = "ADD_NODE_ROW";
const NEW_NODE_NUMBER_CHANGED = "NEW_NODE_NUMBER_CHANGED";
const NEW_NODE_FORCE_CHANGED = "NEW_NODE_FORCE_CHANGED";

const CHANGE_NODE = "CHANGE_NODE";
const REMOVE_NODE_ROW = "REMOVE_NODE_ROW";

const CHANGING_NODE_NUMBER_CHANGED = "CHANGING_NODE_NUMBER_CHANGED";
const CHANGING_NODE_FORCE_CHANGED = "CHANGING_NODE_FORCE_CHANGED";
const CHANGING_NODE_SUBMIT = "CHANGING_NODE_SUBMIT";

const CHANGE_LEFT_SUPPORT = "CHANGE_LEFT_SUPPORT";
const CHANGE_RIGHT_SUPPORT = "CHANGE_RIGHT_SUPPORT";

const CHECK_FOR_ERROR = "CHECK_FOR_ERROR";
const SHOW_CONSTRUCTION_FROM_FILE_ERROR = "SHOW_CONSTRUCTION_FROM_FILE_ERROR";
const SET_NEW_CONSTRUCTION_FROM_FILE_DATA =
    "SET_NEW_CONSTRUCTION_FROM_FILE_DATA";

const SAVE_SOLUTION = "SAVE_SOLUTION";
const CLEAR_SOLUTION = "CLEAR_SOLUTION";

const SHOW_CANVAS = "SHOW_CANVAS"

const initialState = {
    rodsRows: [],
    nodesRows: [],
    changingRodIndex: null,
    changingRodInputRow: {
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
    newRodInputRow: {
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
    newNodeInputRow: {
        nodeNumber: "",
        isNodeNumberCorrect: true,
        nodeForce: "",
        isNodeForceCorrect: true,
    },
    changingNodeIndex: null,
    changingNodeInputRow: {
        nodeNumber: "",
        isNodeNumberCorrect: true,
        nodeForce: "",
        isNodeForceCorrect: true,
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

const rodsAndNodesReducer = (state = initialState, action) => {
    let value = action.value;
    let isCorrect = true;

    switch (action.type) {
        case NEW_ROD_AREA_CHANGED:
            if (
                isNaN(Number(value)) ||
                (Number(value) <= 0 && value.length !== 0)
            ) {
                isCorrect = false;
            }
            return {
                ...state,
                newRodInputRow: {
                    ...state.newRodInputRow,
                    area: value,
                    isAreaCorrect: isCorrect,
                },
            };
        case NEW_ROD_LENGTH_CHANGED:
            if (
                isNaN(Number(value)) ||
                (Number(value) <= 0 && value.length !== 0)
            ) {
                isCorrect = false;
            }
            return {
                ...state,
                newRodInputRow: {
                    ...state.newRodInputRow,
                    length: value,
                    isLengthCorrect: isCorrect,
                },
            };
        case NEW_ROD_MODULUS_CHANGED:
            if (
                isNaN(Number(value)) ||
                (Number(value) <= 0 && value.length !== 0)
            ) {
                isCorrect = false;
            }
            return {
                ...state,
                newRodInputRow: {
                    ...state.newRodInputRow,
                    modulus: value,
                    isModulusCorrect: isCorrect,
                },
            };
        case NEW_ROD_SIGMA_CHANGED:
            if (
                isNaN(Number(value)) ||
                (Number(value) <= 0 && value.length !== 0)
            ) {
                isCorrect = false;
            }
            return {
                ...state,
                newRodInputRow: {
                    ...state.newRodInputRow,
                    sigma: value,
                    isSigmaCorrect: isCorrect,
                },
            };
        case NEW_ROD_DISTLOAD_CHANGED:
            if (isNaN(Number(value))) {
                isCorrect = false;
            }
            return {
                ...state,
                newRodInputRow: {
                    ...state.newRodInputRow,
                    distLoad: value,
                    isDistLoadCorrect: isCorrect,
                },
            };
        case ADD_NEW_ROD:
            if (
                state.newRodInputRow.area.length !== 0 &&
                state.newRodInputRow.isAreaCorrect &&
                state.newRodInputRow.length.length !== 0 &&
                state.newRodInputRow.isLengthCorrect &&
                state.newRodInputRow.modulus.length !== 0 &&
                state.newRodInputRow.isModulusCorrect &&
                state.newRodInputRow.sigma.length !== 0 &&
                state.newRodInputRow.isSigmaCorrect &&
                state.newRodInputRow.distLoad.length !== 0 &&
                state.newRodInputRow.isDistLoadCorrect
            ) {
                const newObj = {
                    ...state,
                    rodsRows: [
                        ...state.rodsRows,
                        {
                            index: state.rodsRows.length + 1,
                            area: Number(state.newRodInputRow.area),
                            length: Number(state.newRodInputRow.length),
                            modulus: Number(state.newRodInputRow.modulus),
                            sigma: Number(state.newRodInputRow.sigma),
                            distLoad: Number(state.newRodInputRow.distLoad),
                            reactKey: uuidv4(),
                        },
                    ],
                    newRodInputRow: {
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
                    newRodInputRow: {
                        ...state.newRodInputRow,
                        isAreaCorrect:
                            state.newRodInputRow.area.length !== 0 &&
                            state.newRodInputRow.isAreaCorrect,
                        isLengthCorrect:
                            state.newRodInputRow.length.length !== 0 &&
                            state.newRodInputRow.isLengthCorrect,
                        isModulusCorrect:
                            state.newRodInputRow.modulus.length !== 0 &&
                            state.newRodInputRow.isModulusCorrect,
                        isSigmaCorrect:
                            state.newRodInputRow.sigma.length !== 0 &&
                            state.newRodInputRow.isSigmaCorrect,
                        isDistLoadCorrect:
                            state.newRodInputRow.distLoad.length !== 0 &&
                            state.newRodInputRow.isDistLoadCorrect,
                    },
                };
            }
        case CHANGE_ROD:
            return {
                ...state,
                changingRodIndex: action.index,
                changingRodInputRow: {
                    ...state.changingRodInputRow,
                    area: state.rodsRows[action.index - 1].area,
                    length: state.rodsRows[action.index - 1].length,
                    modulus: state.rodsRows[action.index - 1].modulus,
                    sigma: state.rodsRows[action.index - 1].sigma,
                    distLoad: state.rodsRows[action.index - 1].distLoad,
                },
            };
        case CHANGING_ROD_AREA_CHANGED:
            if (isNaN(Number(value)) || Number(value) <= 0) {
                isCorrect = false;
            }
            return {
                ...state,
                changingRodInputRow: {
                    ...state.changingRodInputRow,
                    area: value,
                    isAreaCorrect: isCorrect,
                },
            };
        case CHANGING_ROD_LENGTH_CHANGED:
            if (
                isNaN(Number(value)) ||
                (Number(value) <= 0 && value.length !== 0)
            ) {
                isCorrect = false;
            }
            return {
                ...state,
                changingRodInputRow: {
                    ...state.changingRodInputRow,
                    length: value,
                    isLengthCorrect: isCorrect,
                },
            };
        case CHANGING_ROD_MODULUS_CHANGED:
            if (
                isNaN(Number(value)) ||
                (Number(value) <= 0 && value.length !== 0)
            ) {
                isCorrect = false;
            }
            return {
                ...state,
                changingRodInputRow: {
                    ...state.changingRodInputRow,
                    modulus: value,
                    isModulusCorrect: isCorrect,
                },
            };
        case CHANGING_ROD_SIGMA_CHANGED:
            if (
                isNaN(Number(value)) ||
                (Number(value) <= 0 && value.length !== 0)
            ) {
                isCorrect = false;
            }
            return {
                ...state,
                changingRodInputRow: {
                    ...state.changingRodInputRow,
                    sigma: value,
                    isSigmaCorrect: isCorrect,
                },
            };
        case CHANGING_ROD_DISTLOAD_CHANGED:
            if (isNaN(Number(value))) {
                isCorrect = false;
            }
            return {
                ...state,
                changingRodInputRow: {
                    ...state.changingRodInputRow,
                    distLoad: value,
                    isDistLoadCorrect: isCorrect,
                },
            };
        case CHANGING_ROD_SUBMIT: {
            if (
                state.changingRodInputRow.area.length !== 0 &&
                state.changingRodInputRow.isAreaCorrect &&
                state.changingRodInputRow.length.length !== 0 &&
                state.changingRodInputRow.isLengthCorrect &&
                state.changingRodInputRow.modulus.length !== 0 &&
                state.changingRodInputRow.isModulusCorrect &&
                state.changingRodInputRow.sigma.length !== 0 &&
                state.changingRodInputRow.isSigmaCorrect &&
                state.changingRodInputRow.distLoad.length !== 0 &&
                state.changingRodInputRow.isDistLoadCorrect
            ) {
                const changedRodData = {
                    index: state.changingRodIndex,
                    area: Number(state.changingRodInputRow.area),
                    length: Number(state.changingRodInputRow.length),
                    modulus: Number(state.changingRodInputRow.modulus),
                    sigma: Number(state.changingRodInputRow.sigma),
                    distLoad: Number(state.changingRodInputRow.distLoad),
                };
                let changedRodsRows = JSON.parse(
                    JSON.stringify(state.rodsRows)
                );
                changedRodsRows.splice(
                    state.changingRodIndex - 1,
                    1,
                    changedRodData
                );

                const newObj = {
                    ...state,
                    rodsRows: changedRodsRows,
                    changingRodIndex: null,
                    changingRodInputRow: {
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
                    changingRodInputRow: {
                        ...state.changingRodInputRow,
                        isAreaCorrect:
                            state.changingRodInputRow.area.length !== 0 &&
                            state.changingRodInputRow.isAreaCorrect,
                        isLengthCorrect:
                            state.changingRodInputRow.length.length !== 0 &&
                            state.changingRodInputRow.isLengthCorrect,
                        isModulusCorrect:
                            state.changingRodInputRow.modulus.length !== 0 &&
                            state.changingRodInputRow.isModulusCorrect,
                        isSigmaCorrect:
                            state.changingRodInputRow.sigma.length !== 0 &&
                            state.changingRodInputRow.isSigmaCorrect,
                        isDistLoadCorrect:
                            state.changingRodInputRow.distLoad.length !== 0 &&
                            state.changingRodInputRow.isDistLoadCorrect,
                    },
                };
            }
        }
        case REMOVE_ROD_ROW:
            let filteredRodsRows = [...state.rodsRows];
            filteredRodsRows.splice(action.index - 1, 1);
            filteredRodsRows.forEach((rodRow, index) => {
                rodRow.index = index + 1;
            });

            return {
                ...state,
                rodsRows: filteredRodsRows,
                isReadyForSave: filteredRodsRows.length > 0,
            };
        case ADD_NODE_ROW:
            if (
                state.newNodeInputRow.nodeNumber.length !== 0 &&
                state.newNodeInputRow.isNodeNumberCorrect &&
                state.newNodeInputRow.nodeForce.length !== 0 &&
                state.newNodeInputRow.isNodeForceCorrect
            ) {
                const newNodeData = {
                    nodeNumber: Number(state.newNodeInputRow.nodeNumber),
                    nodeForce: Number(state.newNodeInputRow.nodeForce),
                    reactKey: uuidv4(),
                };
                return {
                    ...state,
                    nodesRows: [...state.nodesRows, newNodeData],
                    newNodeInputRow: {
                        nodeNumber: "",
                        isNodeNumberCorrect: true,
                        nodeForce: "",
                        isNodeForceCorrect: true,
                    },
                };
            } else {
                return {
                    ...state,
                    newNodeInputRow: {
                        ...state.newNodeInputRow,
                        isNodeNumberCorrect:
                            state.newNodeInputRow.nodeNumber.length !== 0 &&
                            state.newNodeInputRow.isNodeNumberCorrect,
                        isNodeForceCorrect:
                            state.newNodeInputRow.nodeForce.length !== 0 &&
                            state.newNodeInputRow.isNodeForceCorrect,
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
                newNodeInputRow: {
                    ...state.newNodeInputRow,
                    nodeNumber: value,
                    isNodeNumberCorrect: isCorrect,
                },
            };
        }
        case NEW_NODE_FORCE_CHANGED: {
            if (isNaN(Number(value)) || value.length === 0) {
                isCorrect = false;
            }
            return {
                ...state,
                newNodeInputRow: {
                    ...state.newNodeInputRow,
                    nodeForce: value,
                    isNodeForceCorrect: isCorrect,
                },
            };
        }
        case CHANGE_NODE:
            return {
                ...state,
                changingNodeIndex: action.index,
                changingNodeInputRow: {
                    ...state.changingNodeInputRow,
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
                changingNodeInputRow: {
                    ...state.changingNodeInputRow,
                    nodeNumber: value,
                    isNodeNumberCorrect: isCorrect,
                },
            };
        case CHANGING_NODE_FORCE_CHANGED:
            if (isNaN(Number(value)) || value.length === 0) {
                isCorrect = false;
            }
            return {
                ...state,
                changingNodeInputRow: {
                    ...state.changingNodeInputRow,
                    nodeForce: value,
                    isNodeForceCorrect: isCorrect,
                },
            };
        case CHANGING_NODE_SUBMIT:
            if (
                state.changingNodeInputRow.nodeNumber.length !== 0 &&
                state.changingNodeInputRow.isNodeNumberCorrect &&
                state.changingNodeInputRow.nodeForce.length !== 0 &&
                state.changingNodeInputRow.isNodeForceCorrect
            ) {
                const changedNodeData = {
                    nodeNumber: Number(state.changingNodeInputRow.nodeNumber),
                    nodeForce: Number(state.changingNodeInputRow.nodeForce),
                    reactKey: uuidv4(),
                };
                let changedNodesRows = JSON.parse(
                    JSON.stringify(state.nodesRows)
                );
                changedNodesRows.splice(
                    state.changingNodeIndex,
                    1,
                    changedNodeData
                );
                return {
                    ...state,
                    nodesRows: changedNodesRows,
                    changingNodeIndex: null,
                    changingNodeInputRow: {
                        nodeNumber: "",
                        isNodeNumberCorrect: true,
                        nodeForce: "",
                        isNodeForceCorrect: true,
                    },
                };
            } else {
                return {
                    ...state,
                    newNodeInputRow: {
                        ...state.newNodeInputRow,
                        isNodeNumberCorrect:
                            state.newNodeInputRow.nodeNumber.length !== 0 &&
                            state.newNodeInputRow.isNodeNumberCorrect,
                        isNodeForceCorrect:
                            state.newNodeInputRow.nodeForce.length !== 0 &&
                            state.newNodeInputRow.isNodeForceCorrect,
                    },
                };
            }
        case REMOVE_NODE_ROW:
            let filteredNodesRows = [...state.nodesRows];
            filteredNodesRows.splice(action.index, 1);
            return {
                ...state,
                nodesRows: filteredNodesRows,
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
            } else if (state.changingRodIndex !== null) {
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

export default rodsAndNodesReducer;

export const addNewRod = () => ({ type: ADD_NEW_ROD });
export const newRodAreaChanged = (value) => ({
    type: NEW_ROD_AREA_CHANGED,
    value,
});
export const newRodLengthChanged = (value) => ({
    type: NEW_ROD_LENGTH_CHANGED,
    value,
});
export const newRodModulusChanged = (value) => ({
    type: NEW_ROD_MODULUS_CHANGED,
    value,
});
export const newRodSigmaChanged = (value) => ({
    type: NEW_ROD_SIGMA_CHANGED,
    value,
});
export const newRodDistLoadChanged = (value) => ({
    type: NEW_ROD_DISTLOAD_CHANGED,
    value,
});

export const changeRod = (index) => ({
    type: CHANGE_ROD,
    index,
});
export const changingRodAreaChanged = (value) => ({
    type: CHANGING_ROD_AREA_CHANGED,
    value,
});
export const changingRodLengthChanged = (value) => ({
    type: CHANGING_ROD_LENGTH_CHANGED,
    value,
});
export const changingRodModulusChanged = (value) => ({
    type: CHANGING_ROD_MODULUS_CHANGED,
    value,
});
export const changingRodSigmaChanged = (value) => ({
    type: CHANGING_ROD_SIGMA_CHANGED,
    value,
});
export const changingRodDistLoadChanged = (value) => ({
    type: CHANGING_ROD_DISTLOAD_CHANGED,
    value,
});

export const changingRodSubmit = () => ({
    type: CHANGING_ROD_SUBMIT,
});

export const removeRodRow = (index) => ({
    type: REMOVE_ROD_ROW,
    index,
});

export const addNodeRow = () => ({
    type: ADD_NODE_ROW,
});

export const removeNodeRow = (index) => ({
    type: REMOVE_NODE_ROW,
    index,
});

export const changeNode = (index) => ({
    type: CHANGE_NODE,
    index,
});

export const newNodeNumberChanged = (value) => ({
    type: NEW_NODE_NUMBER_CHANGED,
    value,
});

export const newNodeForceChanged = (value) => ({
    type: NEW_NODE_FORCE_CHANGED,
    value,
});

export const changingNodeNumberChanged = (value) => ({
    type: CHANGING_NODE_NUMBER_CHANGED,
    value,
});

export const changingNodeForceChanged = (value) => ({
    type: CHANGING_NODE_FORCE_CHANGED,
    value,
});

export const changingNodeSubmit = () => ({
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
    if (getState().rodsAndNodes.isReadyForSave) {
        const state = getState().rodsAndNodes;
        const objForDownload = {
            rods: state.rodsRows.map((rod) => {
                return [
                    rod.area,
                    rod.length,
                    rod.modulus,
                    rod.sigma,
                    rod.distLoad,
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

export const handleFileOpening = (inputRef) => (dispatch, getState) => {
    const reader = new FileReader();
    reader.onload = () => {
        let data = JSON.parse(reader.result);
        let newConstructionObj = {};
        newConstructionObj.rodsRows = data.rods.map((rodData, index) => {
            return {
                index: index + 1,
                area: rodData[0],
                length: rodData[1],
                modulus: rodData[2],
                sigma: rodData[3],
                distLoad: rodData[4],
                reactKey: uuidv4(),
            };
        });
        newConstructionObj.nodesRows = data.nodes.map((nodeData, index) => {
            return {
                nodeNumber: nodeData[0],
                nodeForce: nodeData[1],
                reactKey: uuidv4(),
            };
        });
        newConstructionObj.leftSupport = {
            nodeNumber: data.left ? 1 : null,
            isChecked: data.left,
        };
        newConstructionObj.rightSupport = {
            nodeNumber: data.right
                ? newConstructionObj.rodsRows.length + 1
                : null,
            isChecked: data.right,
        };
        newConstructionObj.changingRodIndex = null;
        newConstructionObj.changingRodInputRow = {
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
        };
        newConstructionObj.newRodInputRow = {
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
        };
        newConstructionObj.newNodeInputRow = {
            nodeNumber: "",
            isNodeNumberCorrect: true,
            nodeForce: "",
            isNodeForceCorrect: true,
        };
        newConstructionObj.changingNodeIndex = null;
        newConstructionObj.changingNodeInputRow = {
            nodeNumber: "",
            isNodeNumberCorrect: true,
            nodeForce: "",
            isNodeForceCorrect: true,
        };
        newConstructionObj.isError = false;
        newConstructionObj.errorMessage = "";
        newConstructionObj.isReadyForSave = true;
        newConstructionObj.objWithSolutionFunctions = null;
        dispatch(setNewConstructionFromFileData(newConstructionObj));
    };
    reader.readAsText(inputRef.current.files[0]);
};

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
