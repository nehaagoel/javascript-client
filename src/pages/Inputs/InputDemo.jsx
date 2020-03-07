/* eslint-disable no-console */
import React from 'react';

import { selectOptions, radioOptionsCricket, radioOptionsFootball } from '../../config/constants';
import { TextField, SelectField, RadioField } from '../../components';


class InputDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      sport: '',
      cricket: '',
      football: '',
    };
  }

handleNameChange = (e) => {
  this.setState({ name: e.target.value }, () => console.log(this.state));
}

handleSportChange = (e) => {
  this.setState({ sport: e.target.value }, () => console.log(this.state));
  if (e.target.value === 'cricket') {
    this.setState({ football: '' });
  } else if (e.target.value === 'football') {
    this.setState({ cricket: '' });
  } else {
    this.setState({ cricket: '', football: '' });
  }
}

handlePositionChange = (e) => {
  const { sport } = this.state;
  console.log('handle position change is ', this.state);
  if (sport === 'cricket') {
    this.setState({ cricket: e.target.value }, () => console.log(this.state));
  } else if (sport === 'football') {
    this.setState({ football: e.target.value }, () => console.log(this.state));
  }
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

render() {
  const { sport } = this.state;
  return (
    <>
      <p><b>Name:</b></p>
      <TextField error="" onChange={this.handleNameChange} />
      <p><b>Select the game you play?</b></p>
      <SelectField error="" onChange={this.handleSportChange} options={selectOptions} />
      <div>
        {
          (sport === '' || sport === 'Select') ? ''
            : (
              <>
                <p><b>What you do?</b></p>
                <RadioField error="" options={this.RadioOption()} onChange={this.handlePositionChange} />
              </>
            )
        }
      </div>
    </>
  );
}
}
export default InputDemo;
