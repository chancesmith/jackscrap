import React, {Component} from 'react';
import styled from 'styled-components';
import moment from 'moment';
import {base} from '../firebase';

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
  margin: 30px 0;
  display: flex;
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
`;
const Dropdown = styled.div``;
const DropdownMenuTrigger = styled.div`
  button {
    background: #eee;
    color: #333;
    font-size: 1.3em;
    text-align: left;
    width: 100%;
  }
`;
const MenuWrap = styled.div`
  background: #eee;
`;
const DropdownMenu = styled.div`
  height: 0;
  overflow: visible;
  position: relative;
  z-index: 2;
  width: ${props => props.width}px;
  button {
    margin: 0;
    border-bottom: 1px solid #333;
    background: #c9c9c9;
    color: #333;
    font-size: 1.3em;
    text-align: left;
    width: 100%;
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
    showPickupMenu: false,
  };

  addRequest = () => {
    const {address, zipcode, phone, pickupType, pickupSize} = this.state;
    const immediatelyAvailableReference = base
      .push('jackson', {
        data: {
          created_at: moment().format('M/D/YYYY h:mm:ss'),
          address,
          zip: zipcode,
          phone,
          pickupType,
          pickupSize,
          pickupComplete: false,
        },
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
    this.setState({[stateItem]: val, showPickupMenu: false});
  };

  showPickupMenu = event => {
    event.preventDefault();

    this.setState({showPickupMenu: true}, () => {
      document.addEventListener('click', this.closePickupMenu);
    });
  };

  closePickupMenu = event => {
    const {showPickupMenu} = this.state;
    if (showPickupMenu) {
      if (!this.dropdownMenu.contains(event.target)) {
        this.setState({showPickupMenu: false}, () => {
          document.removeEventListener('click', this.closePickupMenu);
        });
      }
    }
  };

  render() {
    const {address, zipcode, phone, pickupType, pickupSize, showPickupMenu} = this.state;
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
                <Dropdown>
                  <DropdownMenuTrigger
                    ref={element => {
                      this.dropdownMenuTrigger = element;
                    }}>
                    <Button>
                      <button type="button" onClick={this.showPickupMenu}>
                        {pickupType !== '' ? pickupType : 'select pickup type'}
                      </button>
                    </Button>
                  </DropdownMenuTrigger>

                  {showPickupMenu ? (
                    <DropdownMenu
                      ref={element => {
                        this.dropdownMenu = element;
                      }}
                      width={this.dropdownMenuTrigger.offsetWidth}>
                      <MenuWrap>
                        <Button>
                          <button type="button" onClick={() => this.handleChange('Leaves', 'pickupType')}>
                            Leaves
                          </button>
                        </Button>
                        <Button>
                          <button type="button" onClick={() => this.handleChange('Yard Debris', 'pickupType')}>
                            Yard Debris
                          </button>
                        </Button>
                        <Button>
                          <button type="button" onClick={() => this.handleChange('Oversized Trash', 'pickupType')}>
                            Oversized Trash
                          </button>
                        </Button>
                        <Button>
                          <button type="button" onClick={() => this.handleChange('Donation', 'pickupType')}>
                            Donation
                          </button>
                        </Button>
                      </MenuWrap>
                    </DropdownMenu>
                  ) : null}
                </Dropdown>
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
