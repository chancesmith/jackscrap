import styled, {withTheme} from 'styled-components';

const Button = styled.div`
  button,
  input {
    display: block;
    font-family: 'Authority-Rounded';
    letter-spacing: 0.1em;
    margin: 15px 0 0 0;
    padding: 12px 15px;
    background: #152241;
    color: #fff;
    border-radius: 6px;
    &:hover {
      cursor: pointer;
      opacity: 0.8;
    }
  }
  a {
    font-family: 'Authority-Rounded';
    letter-spacing: 0.1em;
    border-radius: 6px;
    display: block;
    margin: 15px 0 0 0;
    padding: 12px 15px;
    background: #152241;
    color: #fff;
    text-decoration: none;
    &:hover {
      cursor: pointer;
      opacity: 0.8;
    }
  }
`;

export default Button;
