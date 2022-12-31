import React from 'react';
import { Advance, Beginner, Intermediate } from '../../helpers/ResourceHelper/ResourceHelper';
import classes from './UsageButtons.module.css';

const UsageButtons: React.FC<{ usageButtonOnClick: (id: string) => void }> = (props) => {

    const onClickDiv = (e: React.MouseEvent<HTMLDivElement>) => {
        let htmlInputElement = e.target as HTMLInputElement;
        let context: string = htmlInputElement.textContent != null ? htmlInputElement.textContent : '';
        props.usageButtonOnClick(context);
    }

    const generateDynamicButton = (text: string) => {
        return (
            <div className={`col-sm ${classes['usage-container']}`} onClick={onClickDiv}>
                <span>{text}</span>
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