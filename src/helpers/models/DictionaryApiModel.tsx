export class DictionaryAPIModel {
    data: Root[];

    constructor(data: Root[]) {
        this.data = data;
    }
}

export class Root {
    word: string;
    phonetic: string;
    phonetics: Phonetic[];
    meanings: Meaning[];
    license: License;
    sourceUrls: string[];

    constructor(word: string, phonetic: string, phonetics: Phonetic[], meanings: Meaning[], license: License, sourceUrls: string[]) {
        this.word = word;
        this.phonetic = phonetic;
        this.phonetics = phonetics;
        this.meanings = meanings;
        this.license = license;
        this.sourceUrls = sourceUrls;
    }
}

export class License {
    name: string;
    url: string;

    constructor(name: string, url: string) {
        this.name = name;
        this.url = url;
    }
}

export class Meaning {
    partOfSpeech: string;
    definitions: Definition[];
    synonyms: string[];
    antonyms: string[];

    constructor(partOfSpeech: string, definitions: Definition[], synonyms: string[], antonyms: string[]) {
        this.partOfSpeech = partOfSpeech;
        this.definitions = definitions;
        this.synonyms = synonyms;
        this.antonyms = antonyms;
    }
}

export class Definition {
    definition: string;
    synonyms: string[];
    antonyms: any[];
    example: string;

    constructor(definition: string, synonyms: string[], antonyms: any[], example: string) {
        this.definition = definition;
        this.synonyms = synonyms;
        this.antonyms = antonyms;
        this.example = example;
    }
}

export class Phonetic {
    text: string;
    audio: string;
    sourceUrl: string;
    license: License;

    constructor(text: string, audio: string, sourceUrl: string, license: License) {
        this.text = text;
        this.audio = audio;
        this.sourceUrl = sourceUrl;
        this.license = license;
    }
}
