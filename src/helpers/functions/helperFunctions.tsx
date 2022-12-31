// @ts-ignore
import CWG from 'cwg';
import { CrosswordPuzzleApiModel, CrosswordFunctionModel, clickibleIndexes } from '../models/CrosswordModels';

export const ShuffleArray = (array: any[]): any[] => {
    let newArray = [...array];
    try {
        let currentIndex = newArray.length, randomIndex;
        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [newArray[currentIndex], newArray[randomIndex]] = [newArray[randomIndex], newArray[currentIndex]];
        }
    }
    catch {
        newArray = [...array];
    }
    return newArray;
};

export const GetCrosswordModel = (arrayParam: any[]): CrosswordFunctionModel | undefined => {

    try {
        const newArray = [...ShuffleArray(arrayParam)];
        const apiData: any = CWG(newArray.slice(0, 20));
        const height: number = apiData.height;
        const width: number = apiData.width;

        if (height < 1 && width < 1) {
            return undefined;
        }

        let array: CrosswordPuzzleApiModel[][] = [];
        for (let y = 0; y < height; y++) {
            let subArray = [];
            for (let x = 0; x < width; x++) {
                subArray.push({ y: y, x: x, alphabet: '', key: `${y}${x}`, emptyContainer: true, clickibleIndexes: [], clicked: false, horizonActive: false, horizontalCorrectAnswer: '', verticalCorrectAnswer: '' });
            }
            array.push(subArray);
        }

        apiData.positionObjArr.forEach((element: any) => {
            let index = 0;
            let indexes: number[][] = [];
            let clickibleIndexes: clickibleIndexes[] = [];

            if (element.isHorizon) {
                for (let x = element.xNum; x < (element.wordStr.length + element.xNum); x++) {
                    indexes.push([element.yNum, x]);
                }

                let clickibleIndex: clickibleIndexes = {
                    indexes: indexes,
                    isHorizon: element.isHorizon
                };

                for (let x = element.xNum; x < (element.wordStr.length + element.xNum); x++) {
                    let foundItem: CrosswordPuzzleApiModel | undefined = array[element.yNum].find(item => item.y === element.yNum && item.x === x);
                    if (foundItem) {
                        foundItem.alphabet = element.wordStr[index];
                        foundItem.emptyContainer = false;
                        foundItem.clickibleIndexes = [...foundItem.clickibleIndexes, clickibleIndex];
                        foundItem.horizontalCorrectAnswer = element.wordStr;
                        index++;
                    }
                }
            }
            else {
                for (let y = element.yNum; y < (element.wordStr.length + element.yNum); y++) {
                    indexes.push([y, element.xNum]);
                }

                let clickibleIndex: clickibleIndexes = {
                    indexes: indexes,
                    isHorizon: element.isHorizon
                };
                clickibleIndexes.push(clickibleIndex);

                for (let y = element.yNum; y < (element.wordStr.length + element.yNum); y++) {
                    let foundItem: CrosswordPuzzleApiModel | undefined = array[y].find(item => item.x === element.xNum && item.y === y);
                    if (foundItem) {
                        foundItem.alphabet = element.wordStr[index];
                        foundItem.emptyContainer = false;
                        foundItem.clickibleIndexes = [...foundItem.clickibleIndexes, clickibleIndex];
                        foundItem.verticalCorrectAnswer = element.wordStr;
                        index++;
                    }
                }
            }
        });

        let model: CrosswordFunctionModel = {
            array: array,
            width: width,
            height: height
        };

        return model;
    }
    catch {
        return undefined;
    }
};

export const SetClickCrosswordModel = (item: CrosswordPuzzleApiModel, crosswordFuncModel: CrosswordFunctionModel): CrosswordFunctionModel => {
    let newCrosswordFuncModel = { ...crosswordFuncModel };

    for (let i = 0; i < crosswordFuncModel.array.length; i++) {
        for (let j = 0; j < crosswordFuncModel.array[0].length; j++) {
            newCrosswordFuncModel.array[i][j].clicked = false;
        }
    }

    if (item.clickibleIndexes.length === 1) {

        if (item.clickibleIndexes[0].isHorizon) {
            for (let i = 0; i < item.clickibleIndexes[0].indexes.length; i++) {
                newCrosswordFuncModel.array[item.clickibleIndexes[0].indexes[i][0]][item.clickibleIndexes[0].indexes[i][0], item.clickibleIndexes[0].indexes[i][1]].clicked = true;
            }
        }
        else {
            for (let i = 0; i < item.clickibleIndexes[0].indexes.length; i++) {
                newCrosswordFuncModel.array[item.clickibleIndexes[0].indexes[i][0]][item.clickibleIndexes[0].indexes[i][0], item.clickibleIndexes[0].indexes[i][1]].clicked = true;
            }
        }
    }
    else if (item.clickibleIndexes.length === 2) {

        if (item.horizonActive) {
            if (item.clickibleIndexes[0].isHorizon === false) {
                for (let i = 0; i < item.clickibleIndexes[0].indexes.length; i++) {
                    newCrosswordFuncModel.array[item.clickibleIndexes[0].indexes[i][0]][item.clickibleIndexes[0].indexes[i][0], item.clickibleIndexes[0].indexes[i][1]].clicked = true;
                }
            }
            else if (item.clickibleIndexes[1].isHorizon === false) {
                for (let i = 0; i < item.clickibleIndexes[1].indexes.length; i++) {
                    newCrosswordFuncModel.array[item.clickibleIndexes[1].indexes[i][0]][item.clickibleIndexes[1].indexes[i][0], item.clickibleIndexes[1].indexes[i][1]].clicked = true;
                }
            }
        }
        else {
            if (item.clickibleIndexes[0].isHorizon) {
                for (let i = 0; i < item.clickibleIndexes[0].indexes.length; i++) {
                    newCrosswordFuncModel.array[item.clickibleIndexes[0].indexes[i][0]][item.clickibleIndexes[0].indexes[i][0], item.clickibleIndexes[0].indexes[i][1]].clicked = true;
                }
            }
            else if (item.clickibleIndexes[1].isHorizon) {
                for (let i = 0; i < item.clickibleIndexes[1].indexes.length; i++) {
                    newCrosswordFuncModel.array[item.clickibleIndexes[1].indexes[i][0]][item.clickibleIndexes[1].indexes[i][0], item.clickibleIndexes[1].indexes[i][1]].clicked = true;
                }
            }
        }
        item.horizonActive = !item.horizonActive;
    }

    return newCrosswordFuncModel;
};

export const GetCorrectAnswer = (item: CrosswordPuzzleApiModel): string => {

    if (item.clickibleIndexes.length === 1 && item.clickibleIndexes[0].isHorizon) {
        return item.horizontalCorrectAnswer;
    }
    else if (item.clickibleIndexes.length === 1 && item.clickibleIndexes[0].isHorizon === false) {
        return item.verticalCorrectAnswer;
    }
    else if (item.clickibleIndexes.length === 2 && item.horizonActive) {
        return item.verticalCorrectAnswer;
    }
    else if (item.clickibleIndexes.length === 2 && item.horizonActive === false) {
        return item.horizontalCorrectAnswer;
    }

    return '';
}