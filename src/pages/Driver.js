import React, {Component} from 'react';
import styled from 'styled-components';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import {base} from '../firebase.js';

// components
import MapContainer from '../components/Maps/MapContainer';
import Pickup from '../components/Pickup/Pickup';
import {timingSafeEqual} from 'crypto';
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

const MarkComplete = styled(Button)`
  button {
    font-size: 2.5rem;
    width: 100%;
    padding: 1.1rem 1rem;
    background: ${props => (props.doubleCheckPickup ? '#ea4647' : null)};
  }
`;
// #endregion

class Driver extends Component {
  state = {
    pickups: [],
    coordsLoaded: false,
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

  // codeAddress = address => {
  //   const {google} = this.props;
  //   const geocoder = new google.maps.Geocoder();
  //   geocoder.geocode({address}, (results, status) => {
  //     if (status == 'OK') {
  //       this.setState({coordsLoaded: true});
  //       return {lat: results[0].geometry.location.lat(), long: results[0].geometry.location.lng()};
  //     } else {
  //       console.log(`Geocode was not successful for the following reason: ${status}`);
  //     }
  //   });
  // };

  render() {
    const {pickups, coordsLoaded, doubleCheckPickup} = this.state;

    return (
      <Styles>
        <PickupWrap>
          <ul>
            {Object.keys(pickups).length > 0 ? (
              Object.keys(pickups).map((pickup, i) => (
                <div>
                  <Pickup pickup={pickups[pickup]} id={pickup} coordsLoaded={coordsLoaded} />

                  <MarkComplete doubleCheckPickup={doubleCheckPickup}>
                    <button type="button" onClick={() => this.markPickupComplete(pickup)}>
                      {doubleCheckPickup ? 'Pickup complete?' : 'Picked up'}
                    </button>
                  </MarkComplete>
                </div>
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
