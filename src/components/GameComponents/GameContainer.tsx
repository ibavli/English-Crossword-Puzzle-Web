import React from 'react';
import Card from '../UI/Card';
import CrosswordContainer from './CrosswordContainer';
import classes from './GameContainer.module.css';
import UsageButtons from './UsageButtons';

const GameContainer = () => {
    
    const usageButtonClickHandler = (id: string | undefined): React.MouseEventHandler<HTMLDivElement> |void => {
        console.log(id);
    }

    return (
        <div className={classes['game-container']}>
            <div className={classes['crossword-container']}>
                <Card>
                    <CrosswordContainer />
                </Card>
            </div>
            <div className={classes['game-text-container']}>
                <Card>
                    <div className={classes['inner-text-container']}>
                        <UsageButtons usageButtonOnClick={usageButtonClickHandler} />
                        <div style={{ height: '95%' }}>test2</div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default GameContainer;