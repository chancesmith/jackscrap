import React from 'react';

import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

class MapContainer extends React.Component {
  state = {
    selectedPlace: {
      name: '',
    },
  };

  onInfoWindowClose = () => {
    console.log('info window closed');
  };

  onMarkerClick = () => {
    console.log('marker clicked');
  };

  renderMarkers = markers => {
    return markers.map(marker => {
      // console.log('maerker', marker);
      return <Marker title={marker} name={marker} position={{lat: 35.61362, lng: -88.82155}} />;
    });
  };

  // codeAddress = address => {
  //   const {google} = this.props;
  //   const geocoder = new google.maps.Geocoder();
  //   geocoder.geocode({address}, (results, status) => {
  //     if (status == 'OK') {
  //       return {lat: results[0].geometry.location.lat(), long: results[0].geometry.location.lng()};
  //     } else {
  //       console.log(`Geocode was not successful for the following reason: ${status}`);
  //     }
  //   });
  // };

  // initialize = () => {
  //   geocoder = new google.maps.Geocoder();
  //   var latlng = new google.maps.LatLng(-34.397, 150.644);
  //   var mapOptions = {
  //     zoom: 8,
  //     center: latlng,
  //   };
  //   map = new google.maps.Map(document.getElementById('map'), mapOptions);
  // };

  render() {
    const {markers, google} = this.props;

    return (
      <Map
        google={google}
        zoom={14}
        initialCenter={{lat: 35.61362, lng: -88.82155}}
        const
        style={{width: '100%', height: '100%'}}>
        {this.renderMarkers(markers)}
      </Map>
    );
  }
}

const LoadingContainer = props => <div>Fancy loading container!</div>;

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_maps_apiKey,
  LoadingContainer: LoadingContainer,
  libraries: ['places', 'directions', 'geocoding'],
})(MapContainer);
