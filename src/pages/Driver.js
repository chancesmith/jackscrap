import React, {Component} from 'react';
import {base} from '../firebase.js';
import styled from 'styled-components';

// #region Styled Components
const Styles = styled.div``;
const NoMatches = styled.div`
  margin: 30px 0 0 0;
  font-size: 1.2em;
  color: green;
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

class Driver extends Component {
  state = {
    pickups: [],
  };
  componentDidMount() {
    this.pickupsRef = base.syncState('jackson', {
      context: this,
      state: 'pickups',
    });
  }

  componentWillUnmount() {
    base.removeBinding(this.pickupsRef);
  }

  render() {
    const {pickups} = this.state;

    return (
      <Styles>
        <PickupWrap>
          <ul>
            {Object.keys(pickups).length > 0 ? (
              Object.keys(pickups)
                .splice(0, 1)
                .map(pickup => (
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
                  No more pickups! <span>👏</span>
                </p>
              </NoMatches>
            )}
          </ul>
        </PickupWrap>
      </Styles>
    );
  }
}

export default Driver;
