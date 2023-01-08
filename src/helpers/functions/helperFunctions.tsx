// @ts-ignore
import CWG from 'cwg';
import { BeginnerWords, IntermediateWords, AdvanceWords } from '../data/Words';
import { CrosswordPuzzleApiModel, CrosswordFunctionModel, clickibleIndexes } from '../models/CrosswordModels';
import { Advance, Beginner, Intermediate } from '../ResourceHelper/ResourceHelper';
const alphabets = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

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

export const GetCrosswordModel = (usage: string): CrosswordFunctionModel | undefined => {
    try {
        const words: string[] = (usage === Beginner)
            ? BeginnerWords
            : (usage === Intermediate)
                ? IntermediateWords
                : (usage === Advance)
                    ? AdvanceWords
                    : BeginnerWords;
        const newArray = [...ShuffleArray(words)];
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
                subArray.push({
                    y: y,
                    x: x,
                    alphabet: '',
                    key: `${y}${x}`,
                    emptyContainer: true,
                    clickibleIndexes: [],
                    clicked: false,
                    horizonActive: false,
                    horizontalCorrectAnswer: '',
                    verticalCorrectAnswer: '',
                    userInput: '',
                    done: false,
                    markWrong: false
                });
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
            height: height,
            currentIndexes: [],
            horizon: false
        };

        return model;
    }
    catch {
        return undefined;
    }
};

export const UpdateCrosswordArray = (item: CrosswordPuzzleApiModel, crosswordFuncModel: CrosswordFunctionModel): Promise<CrosswordFunctionModel> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            let newCrosswordFuncModel = { ...crosswordFuncModel };
            newCrosswordFuncModel.currentIndexes = [];

            for (let i = 0; i < crosswordFuncModel.array.length; i++) {
                for (let j = 0; j < crosswordFuncModel.array[0].length; j++) {
                    newCrosswordFuncModel.array[i][j].clicked = false;
                    newCrosswordFuncModel.array[i][j].userInput = '';
                }
            }

            if (item.clickibleIndexes.length === 1) {
                if (item.clickibleIndexes[0].isHorizon) {
                    for (let i = 0; i < item.clickibleIndexes[0].indexes.length; i++) {
                        newCrosswordFuncModel.currentIndexes.push([item.clickibleIndexes[0].indexes[i][0], item.clickibleIndexes[0].indexes[i][0], item.clickibleIndexes[0].indexes[i][1]]);
                        newCrosswordFuncModel.array[item.clickibleIndexes[0].indexes[i][0]][item.clickibleIndexes[0].indexes[i][0], item.clickibleIndexes[0].indexes[i][1]].clicked = true;
                    }
                }
                else {
                    for (let i = 0; i < item.clickibleIndexes[0].indexes.length; i++) {
                        newCrosswordFuncModel.currentIndexes.push([item.clickibleIndexes[0].indexes[i][0], item.clickibleIndexes[0].indexes[i][0], item.clickibleIndexes[0].indexes[i][1]]);
                        newCrosswordFuncModel.array[item.clickibleIndexes[0].indexes[i][0]][item.clickibleIndexes[0].indexes[i][0], item.clickibleIndexes[0].indexes[i][1]].clicked = true;
                    }
                }
            }
            else if (item.clickibleIndexes.length === 2) {
                if (item.horizonActive) {
                    if (item.clickibleIndexes[0].isHorizon === false) {
                        for (let i = 0; i < item.clickibleIndexes[0].indexes.length; i++) {
                            newCrosswordFuncModel.currentIndexes.push([item.clickibleIndexes[0].indexes[i][0], item.clickibleIndexes[0].indexes[i][0], item.clickibleIndexes[0].indexes[i][1]]);
                            newCrosswordFuncModel.array[item.clickibleIndexes[0].indexes[i][0]][item.clickibleIndexes[0].indexes[i][0], item.clickibleIndexes[0].indexes[i][1]].clicked = true;
                        }
                    }
                    else if (item.clickibleIndexes[1].isHorizon === false) {
                        for (let i = 0; i < item.clickibleIndexes[1].indexes.length; i++) {
                            newCrosswordFuncModel.currentIndexes.push([item.clickibleIndexes[1].indexes[i][0], item.clickibleIndexes[1].indexes[i][0], item.clickibleIndexes[1].indexes[i][1]]);
                            newCrosswordFuncModel.array[item.clickibleIndexes[1].indexes[i][0]][item.clickibleIndexes[1].indexes[i][0], item.clickibleIndexes[1].indexes[i][1]].clicked = true;
                        }
                    }
                }
                else {
                    if (item.clickibleIndexes[0].isHorizon) {
                        for (let i = 0; i < item.clickibleIndexes[0].indexes.length; i++) {
                            newCrosswordFuncModel.currentIndexes.push([item.clickibleIndexes[0].indexes[i][0], item.clickibleIndexes[0].indexes[i][0], item.clickibleIndexes[0].indexes[i][1]]);
                            newCrosswordFuncModel.array[item.clickibleIndexes[0].indexes[i][0]][item.clickibleIndexes[0].indexes[i][0], item.clickibleIndexes[0].indexes[i][1]].clicked = true;
                        }
                    }
                    else if (item.clickibleIndexes[1].isHorizon) {
                        for (let i = 0; i < item.clickibleIndexes[1].indexes.length; i++) {
                            newCrosswordFuncModel.currentIndexes.push([item.clickibleIndexes[1].indexes[i][0], item.clickibleIndexes[1].indexes[i][0], item.clickibleIndexes[1].indexes[i][1]]);
                            newCrosswordFuncModel.array[item.clickibleIndexes[1].indexes[i][0]][item.clickibleIndexes[1].indexes[i][0], item.clickibleIndexes[1].indexes[i][1]].clicked = true;
                        }
                    }
                }
                const newStatus: boolean = !item.horizonActive;
                item.horizonActive = newStatus;
                newCrosswordFuncModel.horizon = newStatus;
            }

            resolve(newCrosswordFuncModel);
        }, 100);
    });
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
};

export const SetAnswer = (item: CrosswordFunctionModel, eventKey: string, selectedIndexesRef: number[][], correctAnswerRef: string): Promise<CrosswordFunctionModel> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            let temp = { ...item };

            if (eventKey === 'Backspace' || eventKey === 'Delete') {
                for (let i = selectedIndexesRef.length - 1; i > 0; i--) {
                    if (temp.array[selectedIndexesRef[i][0]][selectedIndexesRef[i][2]].done) {
                        //checkAnswer += temp.array[selectedIndexesRef.current[i][0]][selectedIndexesRef.current[i][2]].alphabet;
                    }
                    else {
                        //checkAnswer += temp.array[selectedIndexesRef.current[i][0]][selectedIndexesRef.current[i][2]].userInput;
                        //if (temp.array[selectedIndexesRef.current[i][0]][selectedIndexesRef.current[i][2]].userInput === '') {
                        while (temp.array[selectedIndexesRef[i][0]][selectedIndexesRef[i][2]].userInput === '' && i !== 0) {
                            temp.array[selectedIndexesRef[i][0]][selectedIndexesRef[i][2]].userInput = '';
                            i--;
                        }
                        temp.array[selectedIndexesRef[i][0]][selectedIndexesRef[i][2]].userInput = '';
                        //checkAnswer += event.key.toLowerCase();
                        //break;
                        //}
                        break;
                    }
                }
                resolve({ ...temp });

            } else if (alphabets.includes(eventKey.toLowerCase())) {
                //console.log(correctAnswerRef.current);
                // console.log(selectedIndexesRef.current);

                let checkAnswer: string = '';
                for (let i = 0; i < selectedIndexesRef.length; i++) {
                    if (temp.array[selectedIndexesRef[i][0]][selectedIndexesRef[i][2]].done) {
                        checkAnswer += temp.array[selectedIndexesRef[i][0]][selectedIndexesRef[i][2]].alphabet;
                    }
                    else {
                        checkAnswer += temp.array[selectedIndexesRef[i][0]][selectedIndexesRef[i][2]].userInput;
                        if (temp.array[selectedIndexesRef[i][0]][selectedIndexesRef[i][2]].userInput === '') {
                            temp.array[selectedIndexesRef[i][0]][selectedIndexesRef[i][2]].userInput = eventKey.toLowerCase();
                            checkAnswer += eventKey.toLowerCase();
                            break;
                        }
                    }
                }
                if (checkAnswer.length === correctAnswerRef.length) {
                    if (checkAnswer === correctAnswerRef) {
                        for (let i = 0; i < selectedIndexesRef.length; i++) {
                            temp.array[selectedIndexesRef[i][0]][selectedIndexesRef[i][2]].done = true;
                        }
                    }
                    else {
                        for (let i = 0; i < selectedIndexesRef.length; i++) {
                            temp.array[selectedIndexesRef[i][0]][selectedIndexesRef[i][2]].markWrong = true;
                        }
                    }
                }
                resolve({ ...temp });
            }
        }, 100);
    });
};