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
        if (this.resultShown) {
            this.reset();
        }
        if (this.current === "0" && digit !== ".") {
            this.current = digit;
        } else if (digit === "." && this.current.includes(".")) {
            // Do nothing if a decimal point is already present
        } else {
            this.current += digit;
        }
    }

    appendOperator(operator) {
        if (this.resultShown) {
            this.expression = [this.current];
            this.resultShown = false;
        } else if (this.current !== "") {
            this.expression.push(this.current);
        }

        const last = this.expression[this.expression.length - 1];
        if (["+", "-", "*", "/"].includes(last)) {
            this.expression[this.expression.length - 1] = operator;
        } else {
            this.expression.push(operator);
        }

        this.current = "";
    }

    toggleSign() {
        if (this.current === "" || this.current === "0") return;
        const num = parseFloat(this.current);
        if (!isNaN(num)) {
            this.current = (num * -1).toString();
        }
    }

    percent() {
        if (this.current === "") return;
        const num = parseFloat(this.current);
        if (!isNaN(num)) {
            this.current = (num / 100).toString();
        }
    }

    calculate() {
        if (this.expression.length < 2) return;

        if (this.current !== "") {
            this.expression.push(this.current);
        }

        // Ensure the expression ends with a number
        const lastElement = this.expression[this.expression.length - 1];
        if (["+", "-", "*", "/"].includes(lastElement)) {
            this.expression.pop();
        }

        try {
            // Using a safer evaluation than eval()
            const result = this.evaluateExpression(this.expression);
            this.current = result.toString();
            this.expression = [];
            this.resultShown = true;

        } catch (err) {
            this.current = "Error";
            this.expression = [];
            this.resultShown = true;
        }
    }

    evaluateExpression(expression) {
        // This is a simplified evaluation that respects order of operations (MDAS)
        // It's safer than eval()
        let values = [];
        let ops = [];

        for (let i = 0; i < expression.length; i++) {
            let token = expression[i];
            if (!isNaN(parseFloat(token)) && isFinite(token)) {
                values.push(parseFloat(token));
            } else { // operator
                while (ops.length > 0 && this.hasPrecedence(ops[ops.length - 1], token)) {
                    values.push(this.applyOp(ops.pop(), values.pop(), values.pop()));
                }
                ops.push(token);
            }
        }

        while (ops.length > 0) {
            values.push(this.applyOp(ops.pop(), values.pop(), values.pop()));
        }

        const result = values.pop();
        if (result === Infinity || result === -Infinity) {
            throw new Error("Division by zero");
        }
        return result;
    }

    hasPrecedence(op1, op2) {
        return (op1 === '*' || op1 === '/') && (op2 === '+' || op2 === '-');
    }

    applyOp(op, b, a) {
        switch (op) {
            case '+': return a + b;
            case '-': return a - b;
            case '*': return a * b;
            case '/':
                if (b === 0) throw new Error("Division by zero");
                return a / b;
        }
    }


    getMainDisplay() {
        return this.current || "0";
    }

    getMemoryDisplay() {
        return this.expression.join(" ");
    }
}
