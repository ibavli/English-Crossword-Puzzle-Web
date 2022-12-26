

export class CrosswordPuzzleApiModel {
    y: number;
    x: number;
    alphabet: string;
    key: string;
    emptyContainer: boolean = true;

    constructor(y: number, x: number, alphabet: string, key: string, emptyContainer: boolean) {
        this.y = y;
        this.x = x;
        this.alphabet = alphabet;
        this.key = key;
        this.emptyContainer = emptyContainer;
    }
}

export class CrosswordFunctionModel {
    array: CrosswordPuzzleApiModel[][];
    height: number;
    width: number;

    constructor(array: CrosswordPuzzleApiModel[][], height: number, width: number) {
        this.array = array;
        this.height = height;
        this.width = width;
    }
}
