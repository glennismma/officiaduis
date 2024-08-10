class Lexer {
    constructor(input) {
        this.input = input;
        this.position = 0;
        this.currentChar = this.input[this.position];
    }

    advance() {
        this.position++;
        if (this.position >= this.input.length) {
            this.currentChar = null; // End of input
        } else {
            this.currentChar = this.input[this.position];
        }
    }

    scanNumericLiteral() {
        let result = '';
        let hasDecimalPoint = false;

        while (this.currentChar !== null && (this.isDigit(this.currentChar) || (this.currentChar === '.' && !hasDecimalPoint))) {
            if (this.currentChar === '.') {
                if (hasDecimalPoint) {
                    throw new Error('Invalid numeric literal: multiple decimal points.');
                }
                hasDecimalPoint = true;
            }
            result += this.currentChar;
            this.advance();
        }

        if (result === '.' || result === '') {
            throw new Error('Invalid numeric literal.');
        }

        return { type: 'NUMERIC_LITERAL', value: parseFloat(result) };
    }

    isDigit(char) {
        return char >= '0' && char <= '9';
    }
}

// Example usage:
const lexer = new Lexer('123.45');
const numericLiteralToken = lexer.scanNumericLiteral();
console.log(numericLiteralToken); // Output: { type: 'NUMERIC_LITERAL', value: 123.45 }
