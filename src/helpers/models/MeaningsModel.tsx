
export class MeaningsModel {
    partOfSpeech: string | undefined;
    meanings: string[] | undefined;

    constructor(partOfSpeech: string, meanings: string[]) {
        this.partOfSpeech = partOfSpeech;
        this.meanings = meanings;
    }
}
