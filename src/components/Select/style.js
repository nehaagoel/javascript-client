import styled from 'styled-components';

const Select = styled.select`
width: 100%;
padding: 1%;
&.error{
  border: 1px solid red;
  text-color: red;
}
&.noerror{
  display: none;
}
`;

const Div = styled.div`
&.error{
  color: red;
}
&.noerror{
  display: none;
}
`;

export { Select, Div };
