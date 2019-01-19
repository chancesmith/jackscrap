import React, {Component} from 'react';
import styled from 'styled-components';
import {base} from '../firebase.js';

// components
import Button from '../components/styles/Button';

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
const RequestWrap = styled.div`
  margin: 30px 0 0 0;
  display: flex;
  align-items: center;
  justify-content: center;
  fieldset {
    border: 0;
    display: flex;
    flex-direction: column;
    label {
      padding: 0 0 20px 0;
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
`;
// #endregion

class Listing extends Component {
  state = {
    address: '',
    zipcode: '',
    phone: '',
    pickupType: '',
    pickupSize: '',
  };

  // componentDidMount() {
  //   this.pickupsRef = base.syncState('jackson', {
  //     context: this,
  //     state: 'pickups',
  //     queries: {
  //       orderByChild: 'pickupComplete',
  //       equalTo: false,
  //     },
  //   });
  // }

  // componentWillUnmount() {
  //   base.removeBinding(this.pickupsRef);
  // }

  handleChange = (val, stateItem) => {
    this.setState({[stateItem]: val});
  };

  render() {
    const {address, zipcode, phone, pickupType, pickupSize} = this.state;
    return (
      <Styles>
        <Header>
          <Logo>JACKSCRAP</Logo>
          <h1>Give us your trash</h1>
        </Header>
        <RequestWrap>
          <form
            action="#"
            onSubmit={e => {
              e.preventDefault();
              console.log('form submit');
            }}>
            <fieldset>
              <label>
                <span>Address:</span>
                <input type="text" value={address} onChange={e => this.handleChange(e.target.value, 'address')} />
              </label>
              <label>
                <span>Zipcode:</span>
                <input type="text" value={zipcode} onChange={e => this.handleChange(e.target.value, 'zipcode')} />
              </label>
              <label>
                <span>Phone Number:</span>
                <input type="text" value={phone} onChange={e => this.handleChange(e.target.value, 'phone')} />
              </label>
              <label>
                <span>Pickup Type:</span>
                <input type="text" value={pickupType} onChange={e => this.handleChange(e.target.value, 'pickupType')} />
              </label>
              <label>
                <span>Pickup Size:</span>
                <input type="text" value={pickupSize} onChange={e => this.handleChange(e.target.value, 'pickupSize')} />
              </label>
              <Button>
                <input type="submit" value="Send Request" />
              </Button>
            </fieldset>
          </form>
        </RequestWrap>
      </Styles>
    );
  }
}

export default Listing;
