import { DictionaryAPIModel } from '../helpers/models/DictionaryApiModel';

const DICTIONARY_DOMAIN: string = 'https://api.dictionaryapi.dev/api/v2/entries/en';

export const getMeaningsFromDictionaryApi = async (word: string) => {
    let returnModel: DictionaryAPIModel = { data: [] };

    try {
        const response = await fetch(`${DICTIONARY_DOMAIN}/${word}`);
        const data = await response.json();

        if (!response.ok) {
            throw new Error('Could not fetch quotes.');
        }

        for (let i = 0; i < data.length; i++) {
            returnModel.data.push({
                word: data[i].word,
                phonetic: data[i].phonetic,
                phonetics: data[i].phonetics,
                meanings: data[i].meanings,
                license: data[i].license,
                sourceUrls: data[i].sourceUrls
            });
        }
    }
    catch {
        throw new Error('Could not fetch quotes.');
    }

    return returnModel;
}