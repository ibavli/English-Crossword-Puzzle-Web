const DICTIONARY_DOMAIN: string = 'https://api.dictionaryapi.dev/api/v2/entries/en';



export const getWord = async (word: string) => {
    const response = await fetch(`${DICTIONARY_DOMAIN}/${word}`);
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Could not fetch quotes.');
    }

    const transformedQuotes = {};

    console.log(data);
    // for (const key in data) {
    //   const quoteObj = {
    //     id: key,
    //     ...data[key],
    //   };

    //   transformedQuotes.push(quoteObj);
    // }

    return transformedQuotes;
}