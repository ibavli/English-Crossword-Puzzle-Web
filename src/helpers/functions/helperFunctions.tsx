// @ts-ignore
import CWG from 'cwg';
import { CrosswordPuzzleApiModel, CrosswordFunctionModel } from '../models/CrosswordModels';

export const ShuffleArray = (array: any[]): any[] => {
    let newArray = [...array];
    try {
        let currentIndex = newArray.length, randomIndex;
        while (currentIndex != 0) {
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
                subArray.push({ y: y, x: x, alphabet: '', key: `${y}${x}`, emptyContainer: true });
            }
            array.push(subArray);
        }

        apiData.positionObjArr.forEach((element: any) => {
            let index = 0;

            if (element.isHorizon) {
                for (let x = element.xNum; x < (element.wordStr.length + element.xNum); x++) {
                    let foundItem: CrosswordPuzzleApiModel | undefined = array[element.yNum].find(item => item.y == element.yNum && item.x == x);
                    if (foundItem) {
                        foundItem.alphabet = element.wordStr[index];
                        foundItem.emptyContainer = false;
                        index++;
                    }
                }
            }
            else {
                for (let y = element.yNum; y < (element.wordStr.length + element.yNum); y++) {
                    let foundItem: CrosswordPuzzleApiModel | undefined = array[y].find(item => item.x == element.xNum && item.y == y);
                    if (foundItem) {
                        foundItem.alphabet = element.wordStr[index];
                        foundItem.emptyContainer = false;
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