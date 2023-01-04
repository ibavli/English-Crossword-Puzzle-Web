import React, { useEffect, useState } from 'react';
import { BeginnerWords } from '../../helpers/data/Words';
import { GetCrosswordModel, GetCorrectAnswer, UpdateCrosswordArray, SetAnswer } from '../../helpers/functions/helperFunctions'
import { black, green, lightPurple, red, white } from '../../helpers/materials/colors';
import { CrosswordFunctionModel, CrosswordPuzzleApiModel } from '../../helpers/models/CrosswordModels';
import classes from './CrosswordContainer.module.css';

let initialValue: CrosswordFunctionModel = { array: [], height: 0, width: 0, currentIndexes: [], horizon: false };

const CrosswordContainer = () => {
    const [crosswordFuncModel, _setCrosswordArray] = useState<CrosswordFunctionModel>(initialValue);
    const [correctAnswer, _setCorrectAnswer] = useState<string>('');
    const [selectedIndexes, _setSelectedIndexes] = useState<number[][]>([]);

    useEffect(() => {
        setCrosswordArray(GetCrosswordModel(BeginnerWords)!);
        window.addEventListener('keydown', handleKeyDown);
        return () => { window.removeEventListener('keydown', handleKeyDown); };
    }, []);

    const onClickDiv = (item: CrosswordPuzzleApiModel) => {
        if (item.emptyContainer === false && !item.done) {
            UpdateCrosswordArray(item, crosswordFuncModel).then((newCrosswordModel: CrosswordFunctionModel) => {
                setCrosswordArray({ ...newCrosswordModel });
                setSelectedIndexes(newCrosswordModel.currentIndexes);
            });
            setCorrectAnswer(GetCorrectAnswer(item));
            console.log(item.horizontalCorrectAnswer + ' ' + item.verticalCorrectAnswer)
        }
    }

    const crosswordFuncModelRef = React.useRef(crosswordFuncModel);
    const setCrosswordArray = (data: CrosswordFunctionModel) => {
        crosswordFuncModelRef.current = data;
        _setCrosswordArray(data);
    };

    const selectedIndexesRef = React.useRef(selectedIndexes);
    const setSelectedIndexes = (data: number[][]) => {
        selectedIndexesRef.current = data;
        _setSelectedIndexes(data);
    };

    const correctAnswerRef = React.useRef(correctAnswer);
    const setCorrectAnswer = (data: string) => {
        correctAnswerRef.current = data;
        _setCorrectAnswer(data);
    };

    const handleKeyDown = (event: any) => {
        let temp = { ...crosswordFuncModelRef.current };
        SetAnswer(temp, event.key, selectedIndexesRef.current, correctAnswerRef.current).then((newCrosswordModel: CrosswordFunctionModel) => {
            setCrosswordArray({ ...newCrosswordModel });
            setSelectedIndexes(newCrosswordModel.currentIndexes);
        });
    };

    const dynamicParentCss = { display: 'flex', alignContent: 'flex-start', height: `${100 / crosswordFuncModel.height}%` } as React.CSSProperties;

    return (
        <div className={classes['main-crossword-container']}>
            {
                crosswordFuncModel.array.map((item, index) => {
                    return (
                        <div style={dynamicParentCss} key={`crosswordParentDiv_${index}`}>
                            {
                                item.map((subItem) => {
                                    return (
                                        <div style={{
                                            width: `${100 / crosswordFuncModel.width}%`,
                                            height: '100%',
                                            border: subItem.emptyContainer ? 'none' : 'solid',
                                            borderWidth: 1, borderColor: 'gray',
                                            backgroundColor: subItem.done ? white : subItem.clicked ? lightPurple : white
                                        }}
                                            key={subItem.key}
                                            onClick={() => onClickDiv(subItem)}>
                                            <p style={{ fontSize: '90%', textAlign: 'center', color: subItem.done ? green : subItem.markWrong ? red : black }}>
                                                {subItem.done ? subItem.alphabet : subItem.userInput}
                                            </p>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    )
                })
            }
        </div >
    );
};

export default CrosswordContainer;