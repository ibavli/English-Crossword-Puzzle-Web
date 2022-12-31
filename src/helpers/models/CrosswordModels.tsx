
export class clickibleIndexes {
    indexes: number[][];
    isHorizon: boolean;

    constructor(indexes: number[][], isHorizon: boolean) {
        this.indexes = indexes;
        this.isHorizon = isHorizon;
    }
}


export class CrosswordPuzzleApiModel {
    y: number;
    x: number;
    alphabet: string;
    key: string;
    emptyContainer: boolean = true;
    clickibleIndexes: clickibleIndexes[];
    clicked: boolean = false;
    horizonActive: boolean = false;
    horizontalCorrectAnswer: string;
    verticalCorrectAnswer: string;

    constructor(y: number,
        x: number,
        alphabet: string,
        key: string,
        emptyContainer: boolean,
        clickibleIndexes: clickibleIndexes[],
        clicked: boolean,
        horizonActive: boolean,
        horizontalCorrectAnswer: string,
        verticalCorrectAnswer: string) {
        this.y = y;
        this.x = x;
        this.alphabet = alphabet;
        this.key = key;
        this.emptyContainer = emptyContainer;
        this.clickibleIndexes = clickibleIndexes;
        this.clicked = clicked;
        this.horizonActive = horizonActive;
        this.horizontalCorrectAnswer = horizontalCorrectAnswer;
        this.verticalCorrectAnswer = verticalCorrectAnswer;
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
