import React, {Component} from 'react';
import styled, {ThemeProvider, createGlobalStyle} from 'styled-components';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

// views
import Driver from './pages/Driver';
import Listing from './pages/Listing';
import Request from './pages/Request';

// components
import defaultTheme from './theme';

const Styles = styled.div``;

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Authority-Rounded';
    font-style: normal;
    font-weight: 400;
    src: url('../fonts/Authority-Rounded.otf');
  }
  @font-face {
    font-family: 'GothamCond-BlackItalic';
    font-style: normal;
    font-weight: 400;
    src: url('../fonts/GothamCond-BlackItalic.otf');
  }

  body {
    font-family: sans-serif;
    font-size: 14px;
    padding: 0;
    margin: 0;
    background: #EAEBE2;
  }
  label {
    font-family: 'GothamCond-BlackItalic';
    text-transform: italic;
    font-size: 1.3rem;
    letter-spacing: 0.1em;
  }
  h1,h2,h3,h4,h5 {
    font-family: 'Authority-Rounded';
  }
  h1 {
    font-size: 3rem;
  }
  p {
    line-height: 1.8rem;
  }
  a {
    color: ${props => props.theme.gray};
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
      border: 2px solid ${props => props.theme.gray};
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
              <Route exact path="/" component={Request} />
              <Route exact path="/listing" component={Listing} />
              <Route path="/driver" component={Driver} />
            </Switch>
          </Styles>
        </ThemeProvider>
      </Router>
    );
  }
}

export default App;
