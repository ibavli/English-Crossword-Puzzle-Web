import React from 'react';
import { BeginnerWords } from '../../helpers/data/Words';
import { GetCrosswordModel } from '../../helpers/functions/helperFunctions'
import { CrosswordFunctionModel } from '../../helpers/models/CrosswordModels';
import classes from './CrosswordContainer.module.css';

const CrosswordContainer = () => {
    const returnModel: CrosswordFunctionModel = GetCrosswordModel(BeginnerWords)!;
    const dynamicParentCss = { display: 'flex', alignContent: 'flex-start', height: `${100 / returnModel.height}%` } as React.CSSProperties;

    return (
        <div className={classes['main-crossword-container']}>
            {
                returnModel.array.map((item, index) => {
                    return (
                        <div style={dynamicParentCss} key={`crosswordParentDiv_${index}`}>
                            {
                                item.map((subItem) => {
                                    return (
                                        <div style={{ width: `${100 / returnModel.width}%`, height: '100%', border: subItem.emptyContainer ? 'none' : 'solid', borderWidth: 1, borderColor: 'gray' }} key={subItem.key}>
                                            <p style={{ fontSize: '90%', textAlign: 'center' }}>{subItem.alphabet}</p>
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