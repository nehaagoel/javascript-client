import styled, { css } from 'styled-components';

const Input = styled.input`
border: 1px solid gray;
border-radius: 5px;
width: 98%;
padding: 1%;
${(props) => props.error
  && css`
  border: 1px solid red;
  color: red;

  `};
`;
const Div = styled.div`
border: 1px solid black;
padding: 3px;
`;
const Err = styled.p`
color: red;
`;
export { Input, Div, Err };
