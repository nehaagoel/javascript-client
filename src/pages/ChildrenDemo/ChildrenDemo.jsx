import React from 'react';
import { Math } from '../../components';

export default class ChildrenDemo extends React.Component {
  children = (first, second, operator, answer) => {
    switch (operator) {
    case '+': return (`Sum of ${first} and ${second} is ${answer}`);
    case '-': return (`Subtracton of ${first} and ${second} is ${answer}`);
    case '*': return (`Multiplication of ${first} and ${second} is ${answer}`);
    case '/': return (`Division of ${first} and ${second} is ${answer}`);
    default: return (`${operator} of ${first} and ${second} is an Invalid Operator`);
    }
  }

  render() {
    return (
      <>
        <Math first="2" second="3" operator="+">
          {this.children}
        </Math>
        <Math first="3" second="5" operator="*">
          {this.children}
        </Math>
        <Math first="30" second="10" operator="/">
          {this.children}
        </Math>
        <Math first="20" second="15" operator="-">
          {this.children}
        </Math>
        <Math first="2" second="3" operator="?">
          {this.children}
        </Math>
        <Math first="2" second="3" operator="^">
          {this.children}
        </Math>
      </>
    );
  }
}
