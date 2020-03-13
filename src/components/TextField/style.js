import styled, { css } from 'styled-components';

const Input = styled.input`
border: 1px solid gray;
border-radius: 5px;
width: 98%;
padding: 1%;
color: solid black;
${(props) => props.error
  && css`
  border: 1px solid red;
  color: red;

  `};
`;
const Err = styled.p`
color: red;
`;
export { Input, Err };
