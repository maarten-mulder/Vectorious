import { expect } from "chai";
import { Vector } from "../src/vector";
import { beforeEach } from "mocha";
import { Matrix } from "../src/matrix";

let validMatrix: number[][];
let validArray: number[];

///Constructor Tests'

// beforeEach(() => {
    validMatrix = [[1, 2], [3, 4]];
    validArray = [10, 20];
// })

describe('Matrix', () => {
    it('createWithValidArrays', () => {
        let matrix = Matrix.fromArrays(validMatrix)
        expect(matrix.getElements()).to.be.equal(validMatrix);
    });
});

describe('Matrix', () => {
    it('createWithInvalidArrays', () => {
        let matrix = Matrix.fromArrays([]);
        expect(matrix).to.be.null;

        matrix = Matrix.fromArrays([null, null]);
        expect(matrix).to.be.null;

        matrix = Matrix.fromArrays([[null, null], [null, null]]);
        expect(matrix).to.be.null;

        matrix = Matrix.fromArrays([[], [], []]);
        expect(matrix).to.be.null;

        matrix = Matrix.fromArrays([[1, 2], [3, 4, 5]]);
        expect(matrix).to.be.null;
    });
});

describe('Matrix', () => {
    it('createWithValidVectors', () => {
        let vectors: Vector[] = [];
        vectors.push(Vector.fromArray([1, 2, 3]));
        vectors.push(Vector.fromArray([4, 5, 6]));

        let matrix = Matrix.fromVectors(vectors);

        expect(matrix.getElements()[0]).to.be.equal(vectors[0].getElements());
        expect(matrix.getElements()[1]).to.be.equal(vectors[1].getElements());
    });
})

describe('Matrix', () => {
    it('createWithInvalidVectors', () => {
        let vectors: Vector[] = [];
        vectors.push(Vector.fromArray([1, 2, 3]));
        vectors.push(Vector.fromArray([4, 5]));

        let matrix = Matrix.fromVectors(vectors);

        expect(matrix).to.be.null;
    });
})

describe('Matrix', () => {
    it('addMatrix', () => {
        let matrixTimesTwo: number[][] = validMatrix.map(array => array.map(element => 2 * element));
        let matrix = Matrix.fromArrays(validMatrix);

        let result = matrix.add(matrix);

        expect(matrix.getElements()[0]).to.be.equal(matrixTimesTwo[0]);
        expect(matrix.getElements()[1]).to.be.equal(matrixTimesTwo[1]);
    });
})