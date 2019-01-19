import React, {Component} from 'react';
import styled, {ThemeProvider, createGlobalStyle} from 'styled-components';
import defaultTheme from './theme.js';

// views
import Home from './pages/Home';

const Styles = styled.div``;

const GlobalStyle = createGlobalStyle`
  body {
    font-family: sans-serif;
    font-size: 14px;
    padding: 0;
    margin: 0;
  }
  h1 {
    font-size: 3rem;
  }
  p {
    line-height: 1.8rem;
  }
  a {
    color: teal;
    cursor: pointer;
  }
  button {
    outline: none;
  }
  ul {
    padding: 0px;
  }
  input {
    outline: none;
    box-sizing: border-box;
    padding: 1.1rem 1.2rem;
    font-size: 1.1rem;
    &:focus {
      border: 2px solid teal;
    }
  }

`;

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={defaultTheme}>
        <Styles>
          <GlobalStyle />
          <Home />
        </Styles>
      </ThemeProvider>
    );
  }
}

export default App;
