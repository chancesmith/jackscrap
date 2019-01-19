import React, {Component} from 'react';
import styled from 'styled-components';
import {base} from '../firebase.js';

// #region Styled Components
const Styles = styled.div``;
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
  /* background: linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)),
    url(https://sh-drop.s3.us-east-1.amazonaws.com/cs/Leafpickup.jpg);
  background-size: cover; */
  height: 46vh;
  background-position: 100% 40%;
  img {
    width: 50%;
  }
`;
// const Header = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   background: linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)),
//     url(https://sh-drop.s3.us-east-1.amazonaws.com/cs/Leafpickup.jpg);
//   background-size: cover;
//   height: 40vh;
//   background-position: 100% 40%;
//   h1 {
//     color: white;
//     font-size: 5rem;
//     text-shadow: 2px 2px 2px #3a3a3a6e;
//   }
// `;
// const Logo = styled.div`
//   position: absolute;
//   top: -10px;
//   color: white;
//   font-size: 2rem;
//   font-family: 'Authority-Rounded';
// `;
const Search = styled.div`
  margin-top: 70px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  fieldset {
    border: 0;
    display: flex;
    flex-direction: column;
    label {
      padding: 0 0 20px 0;
      color: #ea4647;
      input {
        width: 25rem;
      }
    }
    span {
      display: flex;
      flex-direction: column;
      padding: 0 0 8px 0;
    }
  }
  /* input {
    width: 19rem;
  } */
`;
const NoMatches = styled.div`
  margin: 30px 0 0 0;
  font-size: 1.2em;
  color: red;
  text-align: center;
  a {
    display: block;
    margin: 15px 0 0 0;
    padding: 12px 15px;
    background: ${props => props.theme.gray};
    color: #fff;
    text-decoration: none;
    &:hover {
      cursor: pointer;
      opacity: 0.8;
    }
  }
`;
const PickupWrap = styled.div`
  margin: 30px 0 0 0;
  display: flex;
  align-items: center;
  justify-content: center;
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }
`;
const Pickup = styled.li`
  /* border: 1px solid #eee; */
  margin: 17px 0;
  width: 500px;
  display: flex;
  padding: 1.2em;
  background: #fff;
  border-radius: 5px;
  font-family: 'GothamCond-BlackItalic';
  text-transform: italic;
  color: #152241;
  justify-content: space-between;
  div {
    /* flex: 1; */

    &:first-of-type {
      flex: 2;
    }
  }
  span {
    display: block;
    width: 75%;
    &.address {
      font-size: 1.5rem;
      letter-spacing: 0.1em;
      text-transform: uppercase;
    }
    &.date,
    &.pickupType {
      font-size: 1.1rem;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: #b3b3b3;
    }
  }
`;
// #endregion

class Listing extends Component {
  state = {
    searchInput: '',
    pickups: [],
  };

  componentDidMount() {
    this.pickupsRef = base.syncState('jackson', {
      context: this,
      state: 'pickups',
      queries: {
        orderByChild: 'pickupComplete',
        equalTo: false,
      },
    });
  }

  componentWillUnmount() {
    base.removeBinding(this.pickupsRef);
  }

  handleSearch = val => {
    this.setState({searchInput: val});
  };

  getIcon = text => {
    if (text === 'leaves') {
      return <img src="./images/icons/leaves.png" alt="yard" width="75px" />;
    }
    if (text === 'yard debris') {
      return <img src="./images/icons/yard-debris.png" alt="yard" width="75px" />;
    }
    if (text === 'donation') {
      return <img src="./images/icons/donation.png" alt="yard" width="75px" />;
    }
    if (text === 'oversized trash') {
      return <img src="./images/icons/oversized-trash.png" alt="yard" width="75px" />;
    }
  };

  render() {
    const {pickups, searchInput} = this.state;
    const filteredResults = Object.keys(pickups).filter(pickup =>
      pickups[pickup].address.match(new RegExp(`${searchInput}`, 'gi')),
    );
    return (
      <Styles>
        <header>
          <Nav>
            <img src="../images/menu-btn.png" alt="menu" />
          </Nav>
          <Hero>
            <img src="./images/status-of-scrap.png" alt="status scrap" />
          </Hero>
          <Search>
            <fieldset>
              <label>
                <span>Search address</span>
                <input type="text" onChange={e => this.handleSearch(e.target.value)} />
              </label>
            </fieldset>
          </Search>
        </header>
        <PickupWrap>
          <ul>
            {filteredResults.length > 0 ? (
              filteredResults.map(pickup => (
                <Pickup key={pickup}>
                  <div>
                    <span className="address">{pickups[pickup].address}</span>
                    <span className="date">
                      Date added: {pickups[pickup].created_at.substring(0, pickups[pickup].created_at.indexOf(' '))}
                    </span>
                    <span className="pickupType">{pickups[pickup].pickupType}</span>
                  </div>
                  <div>{this.getIcon(pickups[pickup].pickupType.toLowerCase())}</div>
                </Pickup>
              ))
            ) : (
              <NoMatches>
                <p>
                  No results matched: '{searchInput}'{' '}
                  <span role="img" aria-label="sad emoji">
                    😞
                  </span>
                </p>
                <a href="#">Request a Pickup</a>
              </NoMatches>
            )}
          </ul>
        </PickupWrap>
      </Styles>
    );
  }
}

export default Listing;
