import React, {Component} from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';

// #region Styled Components
const Nav = styled.div`
  position: relative;
  height: 50px;
  background: #152241;
  border-bottom: 10px solid #ea4647;
  img {
    width: 50px;
    position: absolute;
    top: 14px;
    right: 5px;
  }
`;
const Hero = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)),
    url(https://sh-drop.s3.us-east-1.amazonaws.com/cs/Leafpickup.jpg);
  background-size: cover;
  height: 46vh;
  background-position: 100% 40%;
`;
const Details = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  p {
    color: #152241;
    line-height: 0.9rem;
    font-size: 18px;
    &:first-of-type {
      margin: -30px 0 0 0;
    }
  }
`;
const Options = styled.div`
  display: flex;
  /* flex-direction: column; */
  align-items: center;
  justify-content: center;
  a {
    width: 50%;
    img {
      width: 100%;
    }
  }
`;
const Footer = styled.div`
  width: 100%;
  height: 200px;
  margin: 20px 0 30px 0;
  background: url('./images/footer-pattern.png');
  background-position: 50% 50%;
  background-size: cover;
  background-repeat: repeat-x;
`;
// #endregion
class Home extends Component {
  render() {
    return (
      <div>
        <header>
          <Nav>
            <img src="../images/menu-btn.png" alt="menu" />
          </Nav>
          <Hero>
            <img src="./images/logo.png" alt="JACKSCRAP" width="600rem" />
          </Hero>
        </header>
        <div>
          <Details>
            <img src="./images/truck-animation.gif" alt="menu" width="200px" />
            <p>Yard Debris, Leaves, or Oversized Trash on the curb?</p>
            <p>Lets us know and we'll take care of it, while updated you along the way.</p>
          </Details>
          <Options>
            <Link to="/request">
              <img src="./images/report-scrap.png" alt="report scrap" />
            </Link>
            <Link to="/listing">
              <img src="./images/status-of-scrap.png" alt="status of scrap" />
            </Link>
          </Options>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Home;
