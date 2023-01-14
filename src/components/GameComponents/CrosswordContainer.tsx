import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { GetCrosswordModel, GetCorrectAnswer, UpdateCrosswordArray, SetAnswer } from '../../helpers/functions/helperFunctions'
import { black, gray, green, lightGray, lightPurple, red, white } from '../../helpers/materials/colors';
import { CrosswordFunctionModel, CrosswordPuzzleApiModel } from '../../helpers/models/CrosswordModels';
import { useHttp } from '../../hooks/use-http';
import { getMeaningsFromDictionaryApi } from '../../lib/dictionaryApi';
import { meaningActions } from '../../store/meaningSlice';
import classes from './CrosswordContainer.module.css';
import { DictionaryAPIModel } from '../../helpers/models/DictionaryApiModel';
import { useAppSelector } from '../../store/hooks';

let initialValue: CrosswordFunctionModel = { array: [], height: 0, width: 0, currentIndexes: [], horizon: false };

const CrosswordContainer = () => {
    const usage = useAppSelector((state) => state.usage);
    const [correctAnswer, _setCorrectAnswer] = useState<string>('');
    const [selectedIndexes, _setSelectedIndexes] = useState<number[][]>([]);
    const [crosswordFuncModel, _setCrosswordArray] = useState<CrosswordFunctionModel>(initialValue);
    const crosswordFuncModelRef = React.useRef(crosswordFuncModel);
    const [loading, setLoading] = useState(true);

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

    const { sendRequest, status, data: loadedQuotes, error } = useHttp(getMeaningsFromDictionaryApi);
    const dispatch = useDispatch();

    useEffect(() => {
        setCrosswordArray(GetCrosswordModel(usage)!);
        window.addEventListener('keydown', handleKeyDown);
        setLoading(false);
        return () => { window.removeEventListener('keydown', handleKeyDown); };
    }, [usage]);

    const onClickDiv = (item: CrosswordPuzzleApiModel) => {
        if (item.emptyContainer === false && !item.done) {
            setLoading(true);
            UpdateCrosswordArray(item, crosswordFuncModel).then((newCrosswordModel: CrosswordFunctionModel) => {
                setCrosswordArray({ ...newCrosswordModel });
                setSelectedIndexes(newCrosswordModel.currentIndexes);
            });
            const correctAnswer: string = GetCorrectAnswer(item);
            setCorrectAnswer(correctAnswer);
            getMeaningsFromDictionaryApi(correctAnswer).then((responseData: DictionaryAPIModel) => {
                dispatch(meaningActions.setMeanings(responseData));
                console.log(correctAnswer);
            }).catch(() => {
                const payload: DictionaryAPIModel = { data: [] };
                dispatch(meaningActions.setMeanings(payload));
            });
            setLoading(false);
        }
    }

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
            border: 'solid',
            borderWidth: 1,
            borderColor: subItem.emptyContainer ? white : gray,
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

    if (loading)
        return <>Loading</>

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