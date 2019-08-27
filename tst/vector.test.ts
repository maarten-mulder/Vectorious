import { expect } from "chai";
import { Vector } from "../src/vector";
import { beforeEach } from "mocha";

let validArray: number[];
let validLargeArray: number[];
let nullArray: number[];
let invalidArray: number[];
let anotherInvalidArray: number[];

///Constructor Tests'

beforeEach(() => {
  validArray = [1, 2, 3];
  validLargeArray = [1, 2, 3, 4, 5];
  nullArray = null;
  invalidArray = [1, null, 3];
  anotherInvalidArray = [];
})

describe('Vector', () => {
  it('createWithValidArray', () => {
    let vector = Vector.fromArray(validArray);
    expect(vector.getElements()).to.eql(validArray);
  });
});

describe('Vector', () => {
  it('createWithNullArray', () => {
    let vector = Vector.fromArray(nullArray);
    expect(vector).to.be.null;
  });
});

describe('Vector', () => {
  it('createWithNullElement', () => {
    let vector = Vector.fromArray(invalidArray);
    expect(vector).to.be.null;
  });
});

describe('Vector', () => {
  it('createWithEmptyArray', () => {
    let vector = Vector.fromArray(anotherInvalidArray);
    expect(vector).to.be.null;
  });
});


///Methods Tests

describe('Vector', () => {
  it('addDimensionMismatch', () => {
    let vector = Vector.fromArray(validArray);
    let result = vector.add(null);
    expect(result).to.be.null;


    vector = Vector.fromArray(validArray);
    let largerVector = Vector.fromArray(validLargeArray);
    result = vector.add(largerVector);
    expect(result).to.be.null;
  });
});

describe('Vector', () => {
  it('addTest', () => {
    let vector = Vector.fromArray(validArray);
    validArray = validArray.map(element => { return 2 * element });
    let result = vector.add(vector);
    expect(result.getElements()).to.eql(validArray);
  });
});

describe('Vector', () => {
  it('sequenceAddTest', () => {
    let vector = Vector.fromArray(validArray);
    let vectoToAdd = Vector.fromArray(validArray);
    validArray = validArray.map(element => { return 4 * element });
    let result = vector.add(vectoToAdd).add(vectoToAdd).add(vectoToAdd);
    expect(result.getElements()).to.eql(validArray);
  });
});

describe('Vector', () => {
  it('subtractTest', () => {
    let vector = Vector.fromArray(validArray);
    let result = vector.subtract(null);
    expect(result).to.be.null;


    vector = Vector.fromArray(validArray);
    validArray = validArray.map(() => { return 0 });
    let correctResult = vector.subtract(vector);
    expect(correctResult.getElements()).to.eql(validArray);
  });
});

describe('Vector', () => {
  it('sequenceSubtractTest', () => {
    let vector = Vector.fromArray(validArray);
    let vectoToSubtract = Vector.fromArray(validArray);
    validArray = validArray.map(element => { return -2 * element });

    let result = vector.subtract(vectoToSubtract).subtract(vectoToSubtract).subtract(vectoToSubtract);

    expect(result.getElements()).to.eql(validArray);
  });
});

describe('Vector', () => {
  it('scaleTest', () => {
    let vector = Vector.fromArray(validArray);
    let scaleFactor;

    let result = vector.scale(scaleFactor);
    expect(result).to.be.null;

    scaleFactor = -3;

    result = vector.scale(scaleFactor);
    expect(result.getElements()).to.eql([-3, -6, -9]);
  });
});

describe('Vector', () => {
  it('dotProductTest', () => {
    let vector = Vector.fromArray(validArray);
    let result = vector.dotProduct(null);
    expect(result).to.be.null;

    vector = Vector.fromArray(validArray);
    let correctResult = vector.dotProduct(vector);
    expect(correctResult).to.eql(1 + 4 + 9);
  });
});