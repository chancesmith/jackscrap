import React, { Component } from "react";
import { base } from "./firebase.js";

class App extends Component {
  state = {
    pickups: []
  };
  componentDidMount() {
    this.pickupsRef = base.syncState("jackson", {
      context: this,
      state: "pickups"
    });
  }

  componentWillUnmount() {
    base.removeBinding(this.pickupsRef);
  }

  render() {
    const { pickups } = this.state;
    console.log(this.state.pickups);
    return (
      <ul>
        {Object.keys(pickups).map(pickup => (
          <li>
            <span>{pickups[pickup].address}</span>
            <span>{pickups[pickup].pickupType}</span>
            <span>{pickups[pickup].phone}</span>
            <span>{pickups[pickup].zip}</span>
          </li>
        ))}
      </ul>
    );
  }
}

export default App;
