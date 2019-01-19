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
    pickups: [],
  };

  componentDidMount() {
    // this.pickupsRef = base.syncState('jackson', {
    //   context: this,
    //   state: 'pickups',
    //   queries: {
    //     orderByChild: 'pickupComplete',
    //     equalTo: false,
    //   },
    // });
  }

  componentWillUnmount() {
    // base.removeBinding(this.pickupsRef);
  }

  addRequest = () => {
    const {address, zipcode, phone, pickupType, pickupSize} = this.state;
    const immediatelyAvailableReference = base
      .push('jackson', {
        data: {created_at: new Date(), address, zip: zipcode, phone, pickupType, pickupSize, pickupComplete: false},
      })
      .then(newLocation => {
        const generatedKey = newLocation.key;
        this.setState({
          address: '',
          zipcode: '',
          phone: '',
          pickupType: '',
          pickupSize: '',
        });
      })
      .catch(err => {
        // handle error
      });
    // available immediately, you don't have to wait for the Promise to resolve
    const generatedKey = immediatelyAvailableReference.key;
  };

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
              this.addRequest();
            }}>
            <fieldset>
              <label>
                <span>Address:</span>
                <input
                  type="text"
                  placeholder="address"
                  value={address}
                  onChange={e => this.handleChange(e.target.value, 'address')}
                />
              </label>
              <label>
                <span>Zipcode:</span>
                <input
                  type="text"
                  placeholder="zipcode"
                  value={zipcode}
                  onChange={e => this.handleChange(e.target.value, 'zipcode')}
                />
              </label>
              <label>
                <span>Phone Number:</span>
                <input
                  type="text"
                  placeholder="phone"
                  value={phone}
                  onChange={e => this.handleChange(e.target.value, 'phone')}
                />
              </label>
              <label>
                <span>Pickup Type:</span>
                <input
                  type="text"
                  placeholder="pickup type"
                  value={pickupType}
                  onChange={e => this.handleChange(e.target.value, 'pickupType')}
                />
              </label>
              <label>
                <span>Pickup Size:</span>
                <input
                  type="text"
                  placeholder="pickup size"
                  value={pickupSize}
                  onChange={e => this.handleChange(e.target.value, 'pickupSize')}
                />
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
