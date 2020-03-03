import React from 'react';
import { Input, Err } from './style';

export const TextField = (props) => {
  const {
    error, arg, dis,
  } = props;

  const outPut = error ? (
    <>
      <Input type="text" placeholder={arg} error />
      <Err> Could not be greater than 100 </Err>
    </>
  ) : (
    <>
      <Input type="text" placeholder={arg} disabled={dis} />
      <br />
    </>
  );

  return outPut;
};
