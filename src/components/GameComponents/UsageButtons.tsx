import React from 'react';
import { useDispatch } from 'react-redux';
import { black, white } from '../../helpers/materials/colors';
import { DictionaryAPIModel } from '../../helpers/models/DictionaryApiModel';
import { Advance, Beginner, Intermediate } from '../../helpers/ResourceHelper/ResourceHelper';
import { useAppSelector } from '../../store/hooks';
import { meaningActions } from '../../store/meaningSlice';
import { usageActions } from '../../store/usageSlice';
import classes from './UsageButtons.module.css';

// const UsageButtons: React.FC<{ usageButtonOnClick: (id: string) => void }> = (props) => {
const UsageButtons = () => {
    const usage = useAppSelector((state) => state.usage);
    const dispatch = useDispatch();

    const onClickDiv = (e: React.MouseEvent<HTMLDivElement>) => {
        let htmlInputElement = e.target as HTMLInputElement;
        let context: string = htmlInputElement.textContent != null ? htmlInputElement.textContent : '';
        dispatch(usageActions.setUsage(context));
        const payload: DictionaryAPIModel = { data: [] };
        dispatch(meaningActions.setMeanings(payload));
    }

    const generateDynamicButton = (text: string) => {
        return (
            <div className={`col-sm ${classes['usage-container']} ${text === usage ? classes['active-button'] : ''}`} onClick={onClickDiv}>
                <span style={{ fontWeight: 'bold', color: text === usage ? white : black }}>{text}</span>
            </div>
        );
    };

    return (
        <div className={classes['usage-buttons-container']}>
            <div className="container">
                <div className="row">
                    {generateDynamicButton(Beginner)}
                    {generateDynamicButton(Intermediate)}
                    {generateDynamicButton(Advance)}
                </div>
            </div>
        </div>
    );
};

export default UsageButtons;