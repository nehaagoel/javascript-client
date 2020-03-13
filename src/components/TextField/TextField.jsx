import React from 'react';
import PropTypes from 'prop-types';
import { Input, Err } from './style';

const TextField = (props) => {
  const {
    error, arg, dis, onChange, onBlur,
  } = props;
  const outPut = error ? (
    <>
      <Input type="text" placeholder={arg} error onChange={onChange} onBlur={onBlur} />
      <Err>{error}</Err>
    </>
  ) : (
    <>
      <Input type="text" placeholder={arg} disabled={dis} onChange={onChange} onBlur={onBlur} />
      <br />
    </>
  );
  return outPut;
};

export default TextField;

TextField.propTypes = {
  arg: PropTypes.string,
  dis: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.string.isRequired,
  onBlur: PropTypes.string.isRequired,
};
TextField.defaultProps = {
  arg: '',
  dis: '',
  error: '',
};
