import React from 'react';
import { Div } from '../../components/TextField/style';
import { TextField, Slider } from '../../components';
import { banners } from '../../config/constants';

function TextFieldDemo() {
  return (
    <>
      <Div>
        <div>
          <Slider alt="No Image" duration="1000" height="300" random banner={banners} />
        </div>
        <p><b>This is a Disabled input</b></p>
        <TextField dis arg="Disabled Input" />
        <p><b>A valid input</b></p>
        <TextField arg="Accessible" />
        <p><b>An input with errors</b></p>
        <TextField error="Could not be more than" arg="101" />
      </Div>
    </>
  );
}
export default TextFieldDemo;
