import React from 'react';
import PropTypes from 'prop-types';
import { Select, Div } from './style';

function SelectField(props) {
  const {
    error, onChange, options, defaultText, onBlur,
  } = props;
  return (
    <>
      <Select className={(error === '') ? '' : 'error'} onChange={onChange} error={error} onBlur={onBlur}>
        { defaultText && <option>{defaultText}</option>}
        {
          options && options.length
          && options.map(({ value, label }) => <option key={label} value={value}>{label}</option>)
        }
      </Select>
      <Div className={(error === '') ? '' : 'error'}>
        {error}
      </Div>
    </>
  );
}

export default SelectField;

SelectField.propTypes = {
  error: PropTypes.string,
  onChange: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string),
  defaultText: PropTypes.string,
  onBlur: PropTypes.string.isRequired,
};

SelectField.defaultProps = {
  error: '',
  options: [],
  defaultText: 'Select',
};
