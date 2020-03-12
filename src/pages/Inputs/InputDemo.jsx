/* eslint-disable no-console */
import React from 'react';
import * as yup from 'yup';
import {
  selectOptions, radioOptionsCricket, radioOptionsFootball,
} from '../../config/constants';
import {
  TextField, SelectField, RadioField, ButtonField,
} from '../../components';

class InputDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      sport: '',
      cricket: '',
      football: '',
      nameError: '',
      sportError: '',
      cricketError: '',
      footballError: '',
      isTouch: false,
    };
  }

handleNameChange = (e) => {
  this.setState({ name: e.target.value }, () => {
    console.log(this.state);
    this.getError('name');
  });
  this.isTouched();
}

handleSportChange = (e) => {
  this.setState({ sport: e.target.value }, () => {
    console.log(this.state);
    this.getError('sport');
  });
  if (e.target.value === 'cricket') {
    this.setState({ football: '' });
  } else if (e.target.value === 'football') {
    this.setState({ cricket: '' });
  } else {
    this.setState({ cricket: '', football: '' });
  }
  this.isTouched();
}

handlePositionChange = (e) => {
  const { sport } = this.state;
  console.log('handle position change is ', this.state);
  if (sport === 'cricket') {
    this.setState({ cricket: e.target.value }, () => { this.getError(sport); });
  } else if (sport === 'football') {
    this.setState({ football: e.target.value }, () => { this.getError(sport); });
  }
  this.isTouched();
}

handleSpecialtyBlur = () => {
  const { sport } = this.state;
  this.getError(sport);
  this.isTouched();
}

RadioOption = () => {
  let { radioValue } = this.state;
  const { sport } = this.state;
  if (sport === 'cricket') {
    radioValue = radioOptionsCricket;
  } else if (sport === 'football') {
    radioValue = radioOptionsFootball;
  }
  return (radioValue);
};

getError = async (key, value) => {
  const schema = yup.object().shape({
    name: yup.string().required('Name is a required field').min(3),
    sport: yup.string().ensure().required('Sport is a required field'),
    cricket: yup.string().required('What you do is a required field'),
    football: yup.string().required('What you do is a required field'),
  });
  // const key = `${[field]}Error`;
  // schema.validateAt(field, { [field]: this.state[field] })
  try {
    await schema.validateAt(key, value);
    console.log('7');
    this.setState({ error: '' });
  } catch (err) {
    console.log('8');
    this.setState({ error: err.errors });
  }
}

hasErrors = () => {
  const {
    nameError, sportError, cricketError, footballError,
  } = this.state;
  return !!((nameError || sportError || cricketError || footballError));
}

isTouched = () => {
  const {
    sport, name, cricket, football,
  } = this.state;
  this.setState({ isTouch: true });
  return !!(sport || name || cricket || football);
}

render() {
  const {
    sport, nameError, sportError, cricketError,
  } = this.state;
  return (
    <>
      <p><b>Name:</b></p>
      <TextField error={nameError} onChange={this.handleNameChange} onBlur={this.isTouched} />
      <p><b>Select the game you play?</b></p>
      <SelectField
        error={sportError}
        onChange={this.handleSportChange}
        options={selectOptions}
        onBlur={this.isTouched}
      />
      <div>
        {
          (sport === '' || sport === 'Select') ? ''
            : (
              <>
                <p><b>What you do?</b></p>
                <RadioField
                  error={cricketError}
                  options={this.RadioOption()}
                  onChange={this.handlePositionChange}
                  onBlur={this.isTouched}
                />
              </>
            )
        }
      </div>
      <div>
        <ButtonField />
        <ButtonField onClick={this.handleSpecialtyBlur} />
      </div>
    </>
  );
}
}
export default InputDemo;
