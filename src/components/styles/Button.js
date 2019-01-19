import styled from 'styled-components';

const Button = styled.div`
  button,
  input {
    display: block;
    margin: 15px 0 0 0;
    padding: 12px 15px;
    background: teal;
    color: #fff;
    &:hover {
      cursor: pointer;
      opacity: 0.8;
    }
  }
  a {
    display: block;
    margin: 15px 0 0 0;
    padding: 12px 15px;
    background: teal;
    color: #fff;
    text-decoration: none;
    &:hover {
      cursor: pointer;
      opacity: 0.8;
    }
  }
`;

export default Button;
