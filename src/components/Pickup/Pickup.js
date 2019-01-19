import React from 'react';
import styled from 'styled-components';
import MapContainer from '../Maps/MapContainer';

const PickupWrap = styled.li`
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

const MapWrap = styled.div`
  margin-top: 50px;
  width: 100%;
  position: relative;
  height: 350px;
`;

class Pickup extends React.Component {
  state = {
    doubleCheckPickup: false,
  };

  render() {
    const {pickup, markPickupComplete, id} = this.props;
    const {doubleCheckPickup} = this.state;

    return (
      <div>
        <MapWrap>
          <MapContainer markers={[pickup.address]} />
        </MapWrap>
        <PickupWrap key={pickup}>
          <div>
            <span className="address">{pickup.address}</span>
            <span className="phone">{pickup.phone}</span>
          </div>
          <div>
            <span className="pickupType">{pickup.pickupType}</span>
            <span className="date">Added: {pickup.created_at.substring(0, pickup.created_at.indexOf(' '))}</span>
          </div>
        </PickupWrap>
      </div>
    );
  }
}

export default Pickup;
