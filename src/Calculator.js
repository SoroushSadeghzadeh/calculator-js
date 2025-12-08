export default class Calculator {
    constructor() {
        this.reset();
    }

    reset() {
        this.expression = [];
        this.current = "0";
        this.shouldResetOnNextDigit = false;
    }

    appendDigit(digit) {
        if (this.shouldResetOnNextDigit) {
            this.current = "0";
            this.expression = [];
            this.shouldResetOnNextDigit = false;
        }

        if ((this.current === "0") && (digit !== ".")) {
            this.current = digit;
        } else if ((digit === '.') && (this.current.includes("."))) {
            return;
        } else {
            this.current += digit;
        }
    }

    appendOperator(operator) {
        const lastToken = this.expression[this.expression.length - 1];
        if (["+", "-", "*", "/"].includes(lastToken)) {
            this.expression[this.expression.length - 1] = operator;
        } else {
            this.expression.push(this.current);
            this.expression.push(operator);
        }
        this.current = "0";
        this.shouldResetOnNextDigit = false;
    }

    toggleSign() {
        const num = parseFloat(this.current);
        if (!isNaN(num)) {
            this.current = (num * -1).toString();
        }
    }

    percent() {
        const num = parseFloat(this.current);
        if (!isNaN(num)) {
            this.current = (num / 100).toString();
        }
    }

    calculate() {
        if (this.expression.length === 0) return;

        this.expression.push(this.current);

        try {
            const outputQueue = [];
            const operatorStack = [];
            const precedence = {"+": 1, "-": 1, "*": 2, "/": 2};

            this.expression.forEach((token) => {
                                if (!isNaN(parseFloat(token)) && token.trim() !== "") {
                    outputQueue.push(parseFloat(token));
                } else if (["+", "-", "*", "/"].includes(token)) {
                    while (
                        operatorStack.length > 0 &&
                        precedence[operatorStack[operatorStack.length - 1]] >= precedence[token]
                    ) {
                        outputQueue.push(operatorStack.pop());
                    }
                    operatorStack.push(token);
                }
            });

            while (operatorStack.length > 0) {
                outputQueue.push(operatorStack.pop());
            }

            const stack = [];
            outputQueue.forEach(token => {
                if (typeof token === "number") {
                    stack.push(token);
                } else {
                    const b = stack.pop();
                    const a = stack.pop();

                    if (a === undefined || b === undefined) {
                                                throw new Error("Invalid expression: insufficient operands");
                    }

                                        let result;
                    switch (token) {
                        case "+":
                            result = a + b;
                            break;
                        case "-":
                            result = a - b;
                            break;
                        case "*":
                            result = a * b;
                            break;
                        case "/":
                            if (b === 0) throw new Error("خطا");
                            result = a / b;
                            break;
                    }
                    stack.push(result);
                }
            });

            if (stack.length === 0 || stack[0] === undefined) {
                throw new Error("خطا");
            }

            this.current = stack[0].toString();
            this.expression = [];
            this.shouldResetOnNextDigit = true;
        } catch (error) {
            this.current = "خطا";
            this.expression = [];
            this.shouldResetOnNextDigit = true;
        }
    }

    getDisplay() {
        return this.current;
    }
}