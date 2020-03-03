import React from 'react';
import { Div } from '../../components/TextField/style';
import { TextField } from '../../components/TextField/TextField';

function TextFieldDemo() {
  return (
    <>
      <Div>
        <p><b>This is a Disabled input</b></p>
        <TextField dis arg="Disabled Input" />
        <p><b>A valid input</b></p>
        <TextField arg="Accessible" />
        <p><b>An input with errors</b></p>
        <TextField error arg="101" err="Must be equal to 10" />
      </Div>
    </>
  );
}
export default TextFieldDemo;
