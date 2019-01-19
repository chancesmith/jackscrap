import React, {Component} from 'react';
import styled, {ThemeProvider, createGlobalStyle} from 'styled-components';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

// views
import Home from './pages/Home';
import Driver from './pages/Driver';

// components
import defaultTheme from './theme.js';

const Styles = styled.div``;

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Authority-Rounded';
    font-style: normal;
    font-weight: 400;
    src: url('../fonts/Authority-Rounded.otf');
  }

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
      <Router>
        <ThemeProvider theme={defaultTheme}>
          <Styles>
            <GlobalStyle />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/driver" component={Driver} />
            </Switch>
          </Styles>
        </ThemeProvider>
      </Router>
    );
  }
}

export default App;
