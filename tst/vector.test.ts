import { expect } from "chai";
import { Vector } from "../src/vector";
import { beforeEach } from "mocha";

let validArray;
let validLargeArray;
let nullArray;
let invalidArray;
let anotherInvalidArray;

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
    expect(vector.getElements()).to.be.equal(validArray);
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
    validArray.map(element => { 2 * element });
    let result = vector.add(vector);
    expect(result.getElements()).to.be.equal(validArray);
  });
});

describe('Vector', () => {
  it('sequenceAddTest', () => {
    let vector = Vector.fromArray(validArray);
    validArray.map(element => { 4 * element });
    let result = vector.add(vector).add(vector).add(vector);
    expect(result.getElements()).to.be.equal(validArray);
  });
});

describe('Vector', () => {
  it('subtractTest', () => {
    let vector = Vector.fromArray(validArray);
    let result = vector.subtract(null);
    expect(result).to.be.null;


    vector = Vector.fromArray(validArray);
    validArray.map(() => { 0 });
    let correctResult = vector.subtract(vector);
    expect(correctResult.getElements()).to.be.equal(validArray);
  });
});

describe('Vector', () => {
  it('sequenceSubtractTest', () => {
    let vector = Vector.fromArray(validArray);
    validArray.map(element => { -2 * element });
    let result = vector.subtract(vector).subtract(vector).subtract(vector);
    expect(result.getElements()).to.be.equal(validArray);
  });
});

describe('Vector', () => {
  it('dotProductTest', () => {    
    let vector = Vector.fromArray(validArray);
    let result = vector.dotProduct(null);
    expect(result).to.be.null;

    vector = Vector.fromArray(validArray);
    let correctResult = vector.dotProduct(vector);
    expect(correctResult).to.be.equal(1 + 4 + 9);
  });
});