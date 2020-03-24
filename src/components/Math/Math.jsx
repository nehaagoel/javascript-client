import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { operators } from '../../config/constants';

export default class Math extends Component {
  result = (first, second, operator) => {
    let answer = first + operator + second;
    answer = (operators.includes(operator)) ? eval(answer) : 'Invalid Operation';
    return answer;
  }

  render() {
    const {
      first, second, operator, children,
    } = this.props;
    const answer = this.result(first, second, operator);
    return (children !== undefined) ? (<p>{children(first, second, operator, answer)}</p>)
      : (<p>{`${first + operator + second} = ${answer}`}</p>);
  }
}

Math.propTypes = {
  first: PropTypes.number.isRequired,
  second: PropTypes.number.isRequired,
  operator: PropTypes.oneOf(['+', '-', '*', '/']).isRequired,
  children: PropTypes.func,
};

Math.defaultProps = {
  children: undefined,
};
