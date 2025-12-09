export default class Calculator {
    constructor() {
        this.reset();
    }

    reset() {
        this.expression = [];
        this.current = "0";
        this.resultShown = false;
    }

    appendDigit(digit) {
        // اگر نتیجه قبلی نمایش داده شده و کاربر عدد زد → ریست شود
        if (this.resultShown) {
            this.current = "0";
            this.resultShown = false;
        }

        if (this.current === "0" && digit !== ".") {
            this.current = digit;
        } else if (digit === "." && this.current.includes(".")) {
            return;
        } else {
            this.current += digit;
        }
    }

    appendOperator(operator) {
        // اگر نتیجه قبلاً نشان داده شده بود
        if (this.resultShown) {
            this.expression = [this.current];
            this.resultShown = false;
        } else {
            this.expression.push(this.current);
        }

        const last = this.expression[this.expression.length - 1];
        if (["+", "-", "*", "/"].includes(last)) {
            // جایگزینی اپراتور
            this.expression[this.expression.length - 1] = operator;
        } else {
            this.expression.push(operator);
        }

        this.current = "0";
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
            const precedence = { "+": 1, "-": 1, "*": 2, "/": 2 };

            for (const token of this.expression) {
                if (!isNaN(token)) {
                    outputQueue.push(parseFloat(token));
                } else if (precedence[token]) {
                    while (
                        operatorStack.length &&
                        precedence[operatorStack.at(-1)] >= precedence[token]
                        ) {
                        outputQueue.push(operatorStack.pop());
                    }
                    operatorStack.push(token);
                }
            }

            while (operatorStack.length) {
                outputQueue.push(operatorStack.pop());
            }

            const stack = [];
            for (const token of outputQueue) {
                if (typeof token === "number") {
                    stack.push(token);
                } else {
                    const b = stack.pop();
                    const a = stack.pop();
                    if (a === undefined || b === undefined) {
                        throw new Error("Invalid expression");
                    }
                    if (token === "/" && b === 0) throw new Error("خطا");

                    const result = eval(`${a} ${token} ${b}`);
                    stack.push(result);
                }
            }

            this.current = stack[0].toString();
            this.expression = [];
            this.resultShown = true;

        } catch (err) {
            this.current = "خطا";
            this.expression = [];
            this.resultShown = true;
        }
    }

    getDisplay() {
        return this.current;
    }
}
