
/** The Vector object represents a mathematical vector. 
 * It is an n-dimensional array of numbers, on which standard Linear Algebra applies.
 */
export class Vector {
    public readonly dimension: number;
    private elements: number[] = [];

    private constructor(inputArray: number[]) {
        this.elements = inputArray;
        this.dimension = inputArray.length;
    }

    static fromArray(inputArray: number[]) : Vector {
        if(inputArray == null || inputArray.length === 0) {
            return null;
        }

        let isNull = false;
        inputArray.forEach(element => {
            if(element == null) {
                isNull = true;
            };
        });
        
        return isNull ? null : new Vector(inputArray);
    }

    /** Calculates the sum of the current Vector and the input Vector, and returns the resulting Vector.
     * @param {Vector} inputVector The Vector to add to the current Vector.
     */
    add(inputVector: Vector) : Vector {
        if(!this.validateInput(inputVector)) {
            return null;
        }

        for (let i = 0; i < this.elements.length; i++) {
            this.elements[i] += inputVector.elements[i];
        }
        return this;
    }

    /** Calculates the difference Vector, by subtracting the input Vector from the urrent Vector.
     * @param {Vector} inputVector The Vector to subtract from the current Vector.
     */
    subtract(inputVector: Vector) : Vector {
        if(!this.validateInput(inputVector)) {
            return null;
        }

        for (let i = 0; i < this.elements.length; i++) {
            this.elements[i] -= inputVector.elements[i];
        }
        return this;
    }
    

    dotProduct(inputVector: Vector) : number {
        if(!this.validateInput(inputVector)) {
            return null;
        }

        let sum = 0;
        this.elements.forEach((element, index) => sum += (element * inputVector.elements[index]));
        return sum;
    }

    getElements() : number[] {
        return this.elements;
    }

    /** Validates if the input vector is compatible with the current Vector. */
    private validateInput(vector: Vector) {
        if(vector == null || vector.dimension !== this.dimension) {
            return false;
        }
        return true;
    }
}