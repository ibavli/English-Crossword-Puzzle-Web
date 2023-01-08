import React from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../store/hooks';
import Card from '../UI/Card';
import CrosswordContainer from './CrosswordContainer';
import classes from './GameContainer.module.css';
import MeaningsContainer from './MeaningsContainer';
import UsageButtons from './UsageButtons';

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
                    <div className={classes['inner-text-container']}>
                        <UsageButtons />
                        <div style={{ height: '95%' }}>
                            <MeaningsContainer />
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default GameContainer;