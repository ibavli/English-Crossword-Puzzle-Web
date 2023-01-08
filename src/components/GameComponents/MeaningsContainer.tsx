import React from 'react';
import { MeaningsModel } from '../../helpers/models/MeaningsModel';
import { useAppSelector } from '../../store/hooks';

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
        <div style={{ height: '100%' }}>
            {
                meanings.map((item: MeaningsModel) => {
                    return <div>
                        <span>{item.partOfSpeech}</span>
                        <ul>
                            {
                                item.meanings.slice(0, 10).map((subItem: string) => {
                                    return <li>{subItem}</li>
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