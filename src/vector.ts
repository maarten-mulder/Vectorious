/** The Vector object represents a mathematical vector. 
 * It is an n-dimensional array of numbers, on which standard Linear Algebra applies.
 */
export class Vector {
    public readonly dimension: number;
    private elements: number[] = [];

    private constructor(inputArray: number[]) {
        this.elements = JSON.parse(JSON.stringify(inputArray));
        this.dimension = inputArray.length;
    }

    /**
     * Creates a Vector object based on the input number array. Returns null on invalid input.
     * @param inputArray The input array to create a Vector object from.
     */
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

    /** Calculates the sum of the current Vector and the input Vector, and returns the resulting Vector. Returns null on invalid input. 
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

    /** Calculates the difference Vector, by subtracting the input Vector from the current Vector. Returns null on invalid input.
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
    
    /**
     * Multiplies each element of this Vector with the input scale factor. Returns null on invalid input.
     * @param scaleFactor The scale factor to multiply each element with.
     */
    scale(scaleFactor: number) : Vector {
        if(scaleFactor == null) {
            return null;
        }
        this.elements = this.elements.map(element => { return scaleFactor * element})
        return this;
    }

    /**
     * Calculates the dot product of the current Vector with the input Vector. Returns null on invalid input.
     * @param inputVector The input Vector to calculate the dot product with.
     */
    dotProduct(inputVector: Vector) : number {
        if(!this.validateInput(inputVector)) {
            return null;
        }

        let sum = 0;
        this.elements.forEach((element, index) => sum += (element * inputVector.elements[index]));
        return sum;
    }

    /**
     * Returns the elements of this Vector object as a number array.
     */
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