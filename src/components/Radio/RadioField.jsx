import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Input, Div } from './style';

export default function RadioField(props) {
  const {
    error, onChange, options, onBlur,
  } = props;
  return (
    <>
      { options && options.length && options.map(({ value, label }) => (
        <Fragment key={label}>
          <Input className={(error === '') ? '' : 'error'} type="radio" name="sport" value={value} onChange={onChange} error={error} onBlur={onBlur} />
          { label }
          <br />
        </Fragment>
      ))}
      <Div className={(error === '') ? 'noerror' : 'error'}>
        {error}
      </Div>
    </>
  );
}

RadioField.propTypes = {
  error: PropTypes.string,
  onChange: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string),
  onBlur: PropTypes.string.isRequired,
};

RadioField.defaultProps = {
  error: '',
  options: [],
};
