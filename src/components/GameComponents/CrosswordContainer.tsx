import React, { useEffect, useState } from 'react';
import { BeginnerWords } from '../../helpers/data/Words';
import { GetCrosswordModel, SetClickCrosswordModel, GetCorrectAnswer } from '../../helpers/functions/helperFunctions'
import { CrosswordFunctionModel, CrosswordPuzzleApiModel } from '../../helpers/models/CrosswordModels';
import classes from './CrosswordContainer.module.css';

let initialValue: CrosswordFunctionModel = { array: [], height: 0, width: 0 }
const alphabets = "abcdefghijklmnopqrstuvwxyz";

const CrosswordContainer = () => {
    const [crosswordFuncModel, setCrosswordArray] = useState<CrosswordFunctionModel>(initialValue);
    const [correctAnswer, _setCorrectAnswer] = useState<string>('');

    useEffect(() => {
        setCrosswordArray(GetCrosswordModel(BeginnerWords)!);
        window.addEventListener('keydown', handleKeyDown);
        return () => { window.removeEventListener('keydown', handleKeyDown); };
    }, []);

    const onClickDiv = (item: CrosswordPuzzleApiModel) => {
        if (item.emptyContainer === false) {
            setCrosswordArray((prevState) => {
                return { ...SetClickCrosswordModel(item, crosswordFuncModel) };
            });
            setCorrectAnswer(GetCorrectAnswer(item));
        }
    }

    const myStateRef = React.useRef(correctAnswer);
    const setCorrectAnswer = (data: string) => {
        myStateRef.current = data;
        _setCorrectAnswer(data);
    };

    const handleKeyDown = (event: any) => {
        if (alphabets.includes(event.key)) {
            console.log(myStateRef.current)
        }
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
                                            backgroundColor: subItem.clicked ? 'red' : 'white'
                                        }}
                                            key={subItem.key}
                                            onClick={() => onClickDiv(subItem)}>
                                            <p style={{ fontSize: '90%', textAlign: 'center' }}>{subItem.alphabet}</p>
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