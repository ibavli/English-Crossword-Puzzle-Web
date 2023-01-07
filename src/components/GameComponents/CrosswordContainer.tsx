import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { BeginnerWords } from '../../helpers/data/Words';
import { GetCrosswordModel, GetCorrectAnswer, UpdateCrosswordArray, SetAnswer } from '../../helpers/functions/helperFunctions'
import { black, green, lightGray, lightPurple, red, white } from '../../helpers/materials/colors';
import { CrosswordFunctionModel, CrosswordPuzzleApiModel } from '../../helpers/models/CrosswordModels';
import { useHttp } from '../../hooks/use-http';
import { getMeaningsFromDictionaryApi } from '../../lib/dictionaryApi';
import { meaningActions } from '../../store/meaningSlice';
import classes from './CrosswordContainer.module.css';
import { DictionaryAPIModel } from '../../helpers/models/DictionaryApiModel';

let initialValue: CrosswordFunctionModel = { array: [], height: 0, width: 0, currentIndexes: [], horizon: false };

const CrosswordContainer = () => {
    const [crosswordFuncModel, _setCrosswordArray] = useState<CrosswordFunctionModel>(initialValue);
    const [correctAnswer, _setCorrectAnswer] = useState<string>('');
    const [selectedIndexes, _setSelectedIndexes] = useState<number[][]>([]);
    const { sendRequest, status, data: loadedQuotes, error } = useHttp(getMeaningsFromDictionaryApi);
    const dispatch = useDispatch();

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
            const correctAnswer: string = GetCorrectAnswer(item);
            setCorrectAnswer(correctAnswer);
            getMeaningsFromDictionaryApi(correctAnswer).then((responseData: DictionaryAPIModel) => {
                dispatch(meaningActions.setMeanings(responseData));
            });
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

    const getSubDivCSS = (subItem: CrosswordPuzzleApiModel): React.CSSProperties => {
        return {
            width: `${100 / crosswordFuncModel.width}%`,
            height: '100%',
            border: subItem.emptyContainer ? 'none' : 'solid',
            borderWidth: 1, borderColor: 'gray',
            textAlign: 'center',
            backgroundColor: subItem.emptyContainer
                ? white
                : subItem.done
                    ? lightGray
                    : subItem.clicked
                        ? lightPurple
                        : lightGray
        } as React.CSSProperties;
    }

    const getTextCSS = (subItem: CrosswordPuzzleApiModel): React.CSSProperties => {
        return {
            fontSize: '90%',
            textAlign: 'center',
            verticalAlign: 'middle',
            fontWeight: 'bold',
            color: subItem.done
                ? green
                : subItem.markWrong
                    ? red
                    : black
        } as React.CSSProperties;
    }

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
                                        <div style={getSubDivCSS(subItem)} key={subItem.key} onClick={() => onClickDiv(subItem)}>
                                            <span style={getTextCSS(subItem)}>{subItem.done ? subItem.alphabet : subItem.userInput}</span>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    )
                })
            }
        </div>
    );
};

export default CrosswordContainer;