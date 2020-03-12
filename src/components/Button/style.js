import styled from 'styled-components';

const Button = styled.button`{
padding: 1%;
border-radius: 4px;
border: 1px solid grey;
color: black;
font-weight: 550;
}
&.pass{
  background-color: green;
}
&.disabled{
  color: grey;
  border-style: none;
}
`;

export default Button;
