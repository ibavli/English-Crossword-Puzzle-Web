import React from 'react';
import { gray } from '../../helpers/materials/colors';
import { MeaningsModel } from '../../helpers/models/MeaningsModel';
import { useAppSelector } from '../../store/hooks';
import classes from './MeaningsContainer.module.css';

const MeaningsContainer = () => {
    const apiModel = useAppSelector((state) => state.meaning.data);

    let meanings: MeaningsModel[] = [];
    for (let i = 0; i < apiModel.length; i++) {
        const length: number | undefined = apiModel[i].meanings !== null ? apiModel[i].meanings?.length : 0;
        for (let j = 0; j < length!; j++) {
            meanings.push({
                partOfSpeech: apiModel[i]!.meanings[j]!.partOfSpeech,
                meanings: apiModel[i]!.meanings[j]!.definitions?.map((item) => item.definition!)
            });
        }
    }

    if (meanings.length == 0) {
        return <></>;
    }

    return (
        <div className={classes['meaning-container']}>
            {
                meanings.map((item: MeaningsModel, index: number) => {
                    return <div key={`${item.partOfSpeech}_${index}`} className={classes['meaning-sub-container']}>
                        <span className={classes['speech-text']}>{item.partOfSpeech}</span>
                        <ul>
                            {
                                item.meanings.slice(0, 10).map((subItem: string, subIndex: number) => {
                                    return <li key={`${subItem}_${subIndex}`}>{subItem}</li>
                                })
                            }
                        </ul>
                    </div>
                })
            }
        </div>
    );
};

export default MeaningsContainer;