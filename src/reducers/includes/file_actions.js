import {v4 as uuidv4} from "uuid";
import {setNewConstructionFromFileData} from "../reducer";

export const SET_NEW_CONSTRUCTION_FROM_FILE_DATA = "SET_NEW_CONSTRUCTION_FROM_FILE_DATA";

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
        newConstructionObj.changingSternIndex = null;
        newConstructionObj.changingSternInputRow = {
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
        newConstructionObj.newSternInputRow = {
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
        newConstructionObj.newVortexInputRow = {
            nodeNumber: "",
            isVortexNumberCorrect: true,
            nodeForce: "",
            isVortexForceCorrect: true,
        };
        newConstructionObj.changingVortexIndex = null;
        newConstructionObj.changingVortexInputRow = {
            nodeNumber: "",
            isVortexNumberCorrect: true,
            nodeForce: "",
            isVortexForceCorrect: true,
        };
        newConstructionObj.isError = false;
        newConstructionObj.errorMessage = "";
        newConstructionObj.isReadyForSave = true;
        newConstructionObj.objWithSolutionFunctions = null;
        dispatch(setNewConstructionFromFileData(newConstructionObj));
    };
    reader.readAsText(inputRef.current.files[0]);
};