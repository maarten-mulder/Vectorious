import { Vector } from "./vector";

/** The Matrix object represents a mathematical matrix. 
 * It is an m by n-dimensional array of numbers, on which standard Linear Algebra applies.
 */
export class Matrix {
    private mDimension: number;
    private nDimension: number;
    private elements: number[][];

    private constructor(inputArray: number[][]) {
        this.elements = inputArray;
        this.mDimension = inputArray.length;
        this.nDimension = inputArray[0].length;
    }

    static fromArrays(inputArrays: number[][]) : Matrix {
        if(inputArrays == null || inputArrays.length <= 1) {
            return null;
        }

        let error = false;
        let arrayLength = inputArrays[0] == null ? null : inputArrays[0].length;

        inputArrays.forEach(array => {
            if(array == null || array.length === 0 || array.length !== arrayLength) {
                error = true;
                return;
            } 

            array.forEach(element => {
                if(element == null) {
                    error = true;
                    return;
                };
            });
        });
        
        return error ? null : new Matrix(inputArrays);
    }

    static fromVectors(inputVectors: Vector[]) : Matrix {
        if(inputVectors == null || inputVectors.length === 0) {
            return null;
        }

        let arrays: number[][] = [];
        let error = false;
        let vectorLength = inputVectors[0].dimension;

        inputVectors.forEach(vector => {
            if(vector.dimension != vectorLength) {
                error = true;
                return;
            }
            arrays.push(vector.getElements());
        });

        return error ? null : new Matrix(arrays);
    }

    /** Calculates the sum of the current Matrix and the input Matrix, and returns the resulting Matrix.
     * @param {Matrix} inputMatrix The Matrix to add to the current Matrix.
     */
    add(inputMatrix: Matrix) : Matrix {
        if(!this.validateInput(inputMatrix, MatrixOperations.Addition)) {
            return null;
        }

        for (let i = 0; i < this.mDimension; i++) {
            for (let j = 0; j < this.nDimension; j++) {
                this.elements[i][j] += inputMatrix.elements[i][j];
            }
        }
        return this;
    }

    /** Calculates the difference Matrix, by subtracting the input Matrix from the urrent Matrix.
     * @param {Matrix} inputMatrix The Matrix to subtract from the current Matrix.
     */
    subtract(inputMatrix: Matrix) : Matrix {
        if(!this.validateInput(inputMatrix, MatrixOperations.Subtraction)) {
            return null;
        }


        for (let i = 0; i < this.mDimension; i++) {
            for (let j = 0; j < this.nDimension; j++) {
                this.elements[i][j] -= inputMatrix.elements[i][j];
            }
        }
        return this;
    }
    

    multiplyWithVector(inputVector: Vector) : Vector {
        if(inputVector == null || inputVector.dimension !== this.nDimension) {
            return null;
        }

        let newArray: number[];
        for (let i = 0; i < this.mDimension; i++) {
            let sum = 0;
            this.elements[i].map((element, index) => {
                sum += element * inputVector[index];
            });
            newArray.push(sum);
        }

        return Vector.fromArray(newArray);
    }

    multiplyWithMatrix(inputMatrix: Matrix) : Matrix {
        if(!this.validateInput(inputMatrix, MatrixOperations.Multiplication)) {
            return null;
        }

        let newArray: number[];
        for (let i = 0; i < this.mDimension; i++) {
            for(let j = 0; j < this.nDimension; j++) {
                let sum = 0;
                this.elements[i].map((element, index) => {
                    sum += element * inputMatrix[index][j];
                });
                newArray.push(sum);
            }
        }
    }

    getElements() : number[][] {
        return this.elements;
    }

    /** Validates if the input Matrix is compatible with the current Matrix for the specified operation. */
    private validateInput(matrix: Matrix, operation: MatrixOperations): boolean {
        if (matrix == null) {
            return false;
        }

        switch (operation) {
            case MatrixOperations.Addition:
            case MatrixOperations.Subtraction:
                return matrix.mDimension == this.mDimension && matrix.nDimension == this.nDimension;
            case MatrixOperations.Multiplication:
                return matrix.nDimension == matrix.nDimension;
            default:
                return false;
        }
    }
}

export enum MatrixOperations {
    Addition,
    Subtraction,
    Multiplication
}