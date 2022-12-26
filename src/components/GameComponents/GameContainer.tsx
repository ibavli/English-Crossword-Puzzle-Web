import React from 'react';
import Card from '../UI/Card';
import CrosswordContainer from './CrosswordContainer';
import classes from './GameContainer.module.css';

const GameContainer = () => {
    return (
        <div className={classes['game-container']}>
            <div className={classes['crossword-container']}>
                <Card>
                    <CrosswordContainer />
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

export default GameContainer;