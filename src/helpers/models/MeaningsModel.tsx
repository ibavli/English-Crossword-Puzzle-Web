
export class MeaningsModel {
    partOfSpeech: string;
    meanings: string[] = [];

    constructor(partOfSpeech: string, meanings: string[]) {
        this.partOfSpeech = partOfSpeech;
        this.meanings = meanings;
    }
}
