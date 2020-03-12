import React from 'react';
import PropTypes from 'prop-types';
import Button from './style';

const ButtonField = (props) => {
  const {
    disabled,
  } = props;
  return (
    <>
      <Button type="button" disabled={disabled}>Submit</Button>
    </>
  );
};

export default ButtonField;

ButtonField.propTypes = {
  // color: PropTypes.string,
  disabled: PropTypes.bool,
  // style: PropTypes.objectOf(PropTypes.string),
  // value: PropTypes.string.isRequired,
  // onClick: PropTypes.func.isRequired,
  // error: PropTypes.bool,
};

ButtonField.defaultProps = {
  // color: '',
  disabled: 'false',
  // style: {},
  // error: 'false',
};
