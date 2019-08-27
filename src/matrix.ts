import { Vector } from "./vector";

/** The Matrix object represents a mathematical matrix. 
 * It is an m by n-dimensional array of numbers, on which standard Linear Algebra applies.
 */
export class Matrix {
    private mDimension: number;
    private nDimension: number;
    private elements: number[][];

    private constructor(inputArray: number[][]) {
        this.elements = JSON.parse(JSON.stringify(inputArray));
        this.mDimension = inputArray.length;
        this.nDimension = inputArray[0].length;
    }

    /**
     * Creates a Matrix object with the input number arrays. Returns null on invalid input.
     * @param inputArrays The arrays to create a Matrix object from.
     */
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

    /**
     * Creates a Matrix object from an array of Vectors. Returns null on invalid input.
     * @param inputVectors The array of Vectors to create a Matrix object from.
     */
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

    /** Calculates the sum of the current Matrix and the input Matrix, and returns the resulting Matrix. Returns null on invalid input.
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

    /** Calculates the difference Matrix, by subtracting the input Matrix from the current Matrix. Returns null on invalid input.
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
    
    /**
     * Multiplies each element of this matrix with the input scale factor. Returns null on invalid input.
     * @param scaleFactor The scale factor to multiply each element with.
     */
    scale(scaleFactor: number) : Matrix {
        if(scaleFactor == null) {
            return null;
        }

        this.elements = this.elements.map(element => { return element.map(element => { return scaleFactor * element })})
        return this;
    }

    /**
     * Multiplies the current Matrix with the input Vector. Returns null on invalid input, or if there is a dimension mismatch.
     * @param inputVector The Vector to multiply with.
     */
    multiplyWithVector(inputVector: Vector) : Vector {
        if(inputVector == null || inputVector.dimension !== this.nDimension) {
            return null;
        }

        let newArray: number[] = [];
        for (let i = 0; i < this.mDimension; i++) {
            let sum = 0;
            this.elements[i].map((element, index) => {
                sum += element * inputVector.getElements()[index];
            });
            newArray.push(sum);
        }

        return Vector.fromArray(newArray);
    }

    /**
     * Multiplies the current Matrix with the input Matrix. Returns null on invalid input, or if there is a dimension mismatch.
     * @param inputMatrix The Matrix to multiply with.
     */
    multiplyWithMatrix(inputMatrix: Matrix) : Matrix {
        if(!this.validateInput(inputMatrix, MatrixOperations.Multiplication)) {
            return null;
        }

        let newMatrix: number[][] = [];
        for (let i = 0; i < this.mDimension; i++) {
            let newArray: number[] = [];
            for(let j = 0; j < inputMatrix.nDimension; j++) {
                let sum = 0;
                this.elements[i].map((element, index) => {
                    sum += element * inputMatrix.getElements()[index][j];
                });
                newArray.push(sum);
            }
            newMatrix.push(newArray);
        }
        return Matrix.fromArrays(newMatrix);
    }

    /**
     * Returns the elements of this Matrix object as a multidimensional array.
     */
    getElements() : number[][] {
        return this.elements;
    }

    /**
     * Returns a square n x n Identity Matrix based on the input number of dimensions. Returns null on invalid input.
     * @param dimensions The number of columns and rows the Identity Matrix should have. Must be greater than 1.
     */
    static identity(dimensions: number): Matrix {
        if(dimensions == null || dimensions < 2) {
            return null;
        }

        let arrays: number[][] = [];
        for (let i = 0; i < dimensions; i++) {
            let array: number[] = [];
            for (let j = 0; j < dimensions; j++) {
                if(i === j) {
                    array.push(1);
                } else {
                array.push(0);
                }
            }
            arrays.push(array);
        }
        return new Matrix(arrays);
    }

    /** Validates if the input Matrix is compatible with the current Matrix for the specified operation. */
    private validateInput(matrix: Matrix, operation: MatrixOperations): boolean {
        if (matrix == null) {
            return false;
        }

        switch (operation) {
            case MatrixOperations.Addition:
            case MatrixOperations.Subtraction:
                return matrix.mDimension === this.mDimension && matrix.nDimension === this.nDimension;
            case MatrixOperations.Multiplication:
                return this.mDimension === matrix.nDimension;
        }
    }
}

enum MatrixOperations {
    Addition,
    Subtraction,
    Multiplication
}