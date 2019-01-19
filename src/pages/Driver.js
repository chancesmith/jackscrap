import React, {Component} from 'react';
import styled from 'styled-components';
import {base} from '../firebase.js';

// components
import Button from '../components/styles/Button';

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
const MarkComplete = styled(Button)`
  button {
    font-size: 2.5rem;
    width: 100%;
    padding: 1.1rem 1rem;
    background: ${props => (props.doubleCheckPickup ? 'SteelBlue' : null)};
  }
`;
// #endregion

class Driver extends Component {
  state = {
    doubleCheckPickup: false,
    pickups: [],
  };

  componentDidMount() {
    this.pickupsRef = base.syncState('jackson', {
      context: this,
      state: 'pickups',
      queries: {
        orderByChild: 'pickupComplete',
        equalTo: false,
        limitToFirst: 1,
      },
    });
  }

  componentWillUnmount() {
    base.removeBinding(this.pickupsRef);
  }

  markPickupComplete = id => {
    const {doubleCheckPickup, pickups} = this.state;
    if (doubleCheckPickup) {
      const newPickups = {...pickups};
      newPickups[id] = {...newPickups[id], pickupComplete: true};
      this.setState({pickups: newPickups, doubleCheckPickup: false});
    } else {
      this.setState({doubleCheckPickup: true});
    }
  };

  render() {
    const {pickups, doubleCheckPickup} = this.state;

    return (
      <Styles>
        <PickupWrap>
          <ul>
            {Object.keys(pickups).length > 0 ? (
              Object.keys(pickups).map(pickup => (
                <>
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
                  <MarkComplete doubleCheckPickup={doubleCheckPickup}>
                    <button type="button" onClick={() => this.markPickupComplete(Object.keys(pickups)[0])}>
                      {doubleCheckPickup ? 'Pickup complete?' : 'Pickup'}
                    </button>
                  </MarkComplete>
                </>
              ))
            ) : (
              <NoMatches>
                <p>
                  No more pickups!{' '}
                  <span role="img" aria-label="clapping emoji">
                    👏
                  </span>
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
