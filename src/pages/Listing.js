import React, {Component} from 'react';
import styled from 'styled-components';
import {base} from '../firebase.js';

// #region Styled Components
const Styles = styled.div``;
const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(rgba(243, 226, 189, 0.5), rgba(183, 142, 66, 0.5)),
    url(https://sh-drop.s3.us-east-1.amazonaws.com/cs/Leafpickup.jpg);
  background-size: cover;
  height: 40vh;
  background-position: 100% 40%;
  h1 {
    color: white;
    font-size: 5rem;
    text-shadow: 2px 2px 2px #3a3a3a6e;
  }
`;
const Logo = styled.div`
  color: white;
  font-size: 2rem;
  font-family: 'Authority-Rounded';
`;
const Search = styled.div`
  input {
    width: 19rem;
  }
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
    background: teal;
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
  border: 1px solid #eee;
  margin: 17px 0;
  width: 500px;
  display: flex;
  padding: 1.2em;
  div {
    flex: 1;
    &:first-of-type {
      flex: 2;
    }
  }
  span {
    display: block;
    width: 75%;
    &.address {
      font-size: 1.5rem;
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

  render() {
    const {pickups, searchInput} = this.state;
    const filteredResults = Object.keys(pickups).filter(pickup =>
      pickups[pickup].address.match(new RegExp(`${searchInput}`, 'gi')),
    );
    return (
      <Styles>
        <Header>
          <Logo>JACKSCRAP</Logo>
          <h1>Find My Pickup</h1>
          <Search>
            <input type="text" placeholder="search address" onChange={e => this.handleSearch(e.target.value)} />
          </Search>
        </Header>
        <PickupWrap>
          <ul>
            {filteredResults.length > 0 ? (
              filteredResults.map(pickup => (
                <Pickup key={pickup}>
                  <div>
                    <span className="address">{pickups[pickup].address}</span>
                    <span className="phone">{pickups[pickup].phone}</span>
                  </div>
                  <div>
                    <span className="pickupType">{pickups[pickup].pickupType}</span>
                    <span className="date">
                      Added: {pickups[pickup].created_at.substring(0, pickups[pickup].created_at.indexOf(' '))}
                    </span>
                  </div>
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
