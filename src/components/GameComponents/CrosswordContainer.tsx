import React from 'react';
import Card from '../UI/Card';
import classes from './CrosswordContainer.module.css';

const CrosswordContainer = () => {
    return (
        <div className={classes['game-container']}>
            <div className={classes['crossword-container']}>
                <Card>
                    <div>test</div>
                </Card>
            </div>
            <div className={classes['game-text-container']}>
                <Card>
                    <div>test</div>
                </Card>
            </div>
        </div>
    );
};

export default CrosswordContainer;