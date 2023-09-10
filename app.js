import React, { Component } from 'react';
import './Calculator.css';

class Calculator extends Component {
  constructor() {
    super();
    this.state = {
      displayValue: '0',
      operator: null,
      previousValue: null,
      waitingForOperand: false,
    };
  }

  inputDigit = (digit) => {
    const { displayValue, waitingForOperand } = this.state;

    if (waitingForOperand) {
      this.setState({
        displayValue: String(digit),
        waitingForOperand: false,
      });
    } else {
      this.setState({
        displayValue:
          displayValue === '0' ? String(digit) : displayValue + digit,
      });
    }
  };

  inputDecimal = () => {
    const { displayValue, waitingForOperand } = this.state;

    if (waitingForOperand) {
      this.setState({
        displayValue: '0.',
        waitingForOperand: false,
      });
    } else if (displayValue.indexOf('.') === -1) {
      this.setState({
        displayValue: displayValue + '.',
        waitingForOperand: false,
      });
    }
  };

  clearInput = () => {
    this.setState({
      displayValue: '0',
      operator: null,
      previousValue: null,
      waitingForOperand: false,
    });
  };

  inputOperator = (nextOperator) => {
    const { displayValue, operator, previousValue } = this.state;

    if (operator && !waitingForOperand) {
      const currentValue = parseFloat(displayValue);
      const result = this.performOperation(previousValue, currentValue, operator);
      this.setState({
        displayValue: String(result),
        previousValue: result,
      });
    } else {
      this.setState({
        previousValue: parseFloat(displayValue),
      });
    }

    this.setState({
      waitingForOperand: true,
      operator: nextOperator,
    });
  };

  performOperation = (previousValue, currentValue, operator) => {
    switch (operator) {
      case '+':
        return previousValue + currentValue;
      case '-':
        return previousValue - currentValue;
      case '*':
        return previousValue * currentValue;
      case '/':
        return previousValue / currentValue;
      default:
        return currentValue;
    }
  };

  handleEquals = () => {
    const { displayValue, operator, previousValue } = this.state;

    if (operator) {
      const currentValue = parseFloat(displayValue);
      const result = this.performOperation(previousValue, currentValue, operator);
      this.setState({
        displayValue: String(result),
        previousValue: null,
        operator: null,
        waitingForOperand: true,
      });
    }
  };

  render() {
    const { displayValue } = this.state;

    return (
      <div className="calculator-grid">
        <div className='previous-operand'></div>
        <div className='current-operand'></div>
        <div className="display">{displayValue}</div>
        <div className="buttons">
          <button onClick={() => this.inputDigit(7)}>7</button>
          <button onClick={() => this.inputDigit(8)}>8</button>
          <button onClick={() => this.inputDigit(9)}>9</button>
          <button onClick={() => this.inputOperator('/')}>/</button>
          <button onClick={() => this.inputDigit(4)}>4</button>
          <button onClick={() => this.inputDigit(5)}>5</button>
          <button onClick={() => this.inputDigit(6)}>6</button>
          <button onClick={() => this.inputOperator('*')}>*</button>
          <button onClick={() => this.inputDigit(1)}>1</button>
          <button onClick={() => this.inputDigit(2)}>2</button>
          <button onClick={() => this.inputDigit(3)}>3</button>
          <button onClick={() => this.inputOperator('+')}>+</button>
          <button onClick={() => this.inputDecimal()}>.</button>
          <button onClick={() => this.inputDigit(0)}>0</button>
          <button className='span-two' onClick={this.clearInput}>AC</button>
          <button className='span-two'  onClick={() => this.handleEquals()}>=</button>
          <button onClick={() => this.inputOperator('-')}>-</button>
        </div>
      </div>
    );
  }
}

export default Calculator;
