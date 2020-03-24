import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import { Math } from '../../components';

const useStyles = (theme) => ({
  root: {
    margin: theme.spacing(2),
  },
});

class ChildrenDemo extends React.Component {
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
    const { classes } = this.props;
    return (
      <>
        <div className={classes.root}>
          <Math first="2" second="3" operator="+" children={this.children} />
          <Math first="3" second="5" operator="*" children={this.children} />
          <Math first="30" second="10" operator="/" children={this.children} />
          <Math first="20" second="15" operator="-" children={this.children} />
          <Math first="2" second="3" operator="?" children={this.children} />
          <Math first="2" second="3" operator="^" />
        </div>
      </>
    );
  }
}
ChildrenDemo.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(useStyles)(ChildrenDemo);
