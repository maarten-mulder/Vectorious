import { expect } from "chai";
import { Vector } from "../src/vector";
import { beforeEach } from "mocha";
import { Matrix } from "../src/matrix";

let validMatrix: number[][];
let validArray: number[];

 beforeEach(() => {
    validMatrix = [[1, 2], [3, 4]];
    validArray = [10, 20];
 })

describe('Matrix', () => {
    it('createWithValidArrays', () => {
        let matrix = Matrix.fromArrays(validMatrix)
        expect(matrix.getElements()).to.eql(validMatrix);
    });
});

describe('Matrix', () => {
    it('createWithInvalidArrays', () => {
        let matrix = Matrix.fromArrays([]);
        expect(matrix).to.null;

        matrix = Matrix.fromArrays([null, null]);
        expect(matrix).to.null;

        matrix = Matrix.fromArrays([[null, null], [null, null]]);
        expect(matrix).to.null;

        matrix = Matrix.fromArrays([[], [], []]);
        expect(matrix).to.null;

        matrix = Matrix.fromArrays([[1, 2], [3, 4, 5]]);
        expect(matrix).to.null;
    });
});

describe('Matrix', () => {
    it('createWithValidVectors', () => {
        let vectors: Vector[];
        expect(Matrix.fromVectors(vectors)).to.be.null;
        vectors = null;
        expect(Matrix.fromVectors(vectors)).to.be.null;
        vectors = [];
        expect(Matrix.fromVectors(vectors)).to.be.null;

        vectors.push(Vector.fromArray([1, 2, 3]));
        vectors.push(Vector.fromArray([4, 5, 6]));

        let matrix = Matrix.fromVectors(vectors);

        expect(matrix.getElements()[0]).to.eql(vectors[0].getElements());
        expect(matrix.getElements()[1]).to.eql(vectors[1].getElements());
    });
})

describe('Matrix', () => {
    it('createWithInvalidVectors', () => {
        let vectors: Vector[] = [];
        vectors.push(Vector.fromArray([1, 2, 3]));
        vectors.push(Vector.fromArray([4, 5]));

        let matrix = Matrix.fromVectors(vectors);

        expect(matrix).to.null;
    });
})


describe('Matrix', () => {
    it('addInvalidMatrix', () => {
        let matrix = Matrix.fromArrays(validMatrix);
        
        let invalidMatrix: Matrix;
        expect(matrix.add(invalidMatrix)).to.be.null;
        expect(matrix.add(null)).to.be.null;

        invalidMatrix = Matrix.fromArrays([[1, 2, 3], [4, 5, 6]]);

        let result = matrix.add(invalidMatrix);

        expect(result).to.be.null;
    });
})


describe('Matrix', () => {
    it('addMatrix', () => {
        let matrixTimesTwo: number[][] = validMatrix.map(array => array.map(element => { return 2 * element }));
        let matrix = Matrix.fromArrays(validMatrix);

        let result = matrix.add(matrix);

        expect(result.getElements()[0]).to.eql(matrixTimesTwo[0]);
        expect(result.getElements()[1]).to.eql(matrixTimesTwo[1]);
    });
})

describe('Matrix', () => {
    it('subtractInvalidMatrix', () => {
        let matrix = Matrix.fromArrays(validMatrix);
        
        let invalidMatrix: Matrix;
        expect(matrix.add(invalidMatrix)).to.be.null;
        expect(matrix.add(null)).to.be.null;

        invalidMatrix = Matrix.fromArrays([[1, 2, 3], [4, 5, 6]]);

        let result = matrix.subtract(invalidMatrix);

        expect(result).to.be.null;
    });
});

describe('Matrix', () => {
    it('subtractMatrix', () => {
        let zeroMatrix: number[][] = [[0, 0], [0, 0]]
        let matrix = Matrix.fromArrays(validMatrix);

        let result = matrix.subtract(matrix);

        expect(result.getElements()[0]).to.eql(zeroMatrix[0]);
        expect(result.getElements()[1]).to.eql(zeroMatrix[1]);
    });
})

describe('Matrix', () => {
    it('scaleTest', () => {
        let matrix = Matrix.fromArrays(validMatrix);
        let scaleFactor;

        let result = matrix.scale(scaleFactor);
        expect(result).to.be.null;


        scaleFactor = 3;
        
        result = matrix.scale(scaleFactor);
        expect(result.getElements()).to.eql([[3, 6], [9, 12]]);
    });
})

describe('Matrix', () => {
    it('multiplyWithInvalidVector', () => {
        let invalidArray = [10, 20, 30, 40];
        let matrix = Matrix.fromArrays(validMatrix);
        let invalidVector = Vector.fromArray(invalidArray);

        let product = matrix.multiplyWithVector(invalidVector);

        expect(product).to.be.null;
        
        product = matrix.multiplyWithVector(null);
        expect(product).to.be.null;
    });
});

describe('Matrix', () => {
    it('multiplyWithValidVector', () => {
        let matrix = Matrix.fromArrays(validMatrix);
        let vector = Vector.fromArray(validArray);

        let product = matrix.multiplyWithVector(vector);

        expect(product.getElements()).to.eql([50, 110]);
    });
});

describe('Matrix', () => {
    it('multiplyWithInvalidMatrix', () => {
        let invalidMatrix= Matrix.fromArrays([[10, 20, 30], [40, 50, 60], [70, 80, 90]]);
        let matrix = Matrix.fromArrays(validMatrix);

        let product = matrix.multiplyWithMatrix(invalidMatrix);

        expect(product).to.be.null;

        product = matrix.multiplyWithMatrix(null);
        expect(product).to.be.null;
    });
});

describe('Matrix', () => {
    it('multiplyWithValidMatrix', () => {
        let matrix= Matrix.fromArrays([[10, 20, 30], [40, 50, 60]]);
        let validMatrix = Matrix.fromArrays([[1, 2], [3, 4], [5, 6]]);

        let product = matrix.multiplyWithMatrix(validMatrix);

        expect(product.getElements()).to.eql([[220, 280], [490, 640]]);
    });
});

describe('Matrix', () => {
    it('identity', () => {
        let dimensions;
        expect(Matrix.identity(dimensions)).to.be.null;

        dimensions = 1;
        expect(Matrix.identity(dimensions)).to.be.null;
        
        dimensions = 2;
        expect(Matrix.identity(dimensions).getElements()).to.eql([[1, 0], [0, 1]]);
        
        dimensions = 3;
        expect(Matrix.identity(dimensions).getElements()).to.eql([[1, 0, 0], [0, 1, 0], [0, 0, 1]]);

        let matrix: Matrix = Matrix.identity(3);

        expect(matrix.getElements()).to.eql(matrix.multiplyWithMatrix(matrix).multiplyWithMatrix(matrix).getElements());
    });
});