// @flow

import React, { Component } from 'react'
import { Map, TileLayer, Marker, Popup, Polyline, } from '../map_components'


export default class MapView extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      initial_lat: 42.373222,
      initial_lng: -72.519852,
      renderRoute: false,
      mapCenter: [42.36, -71.36],
      zoom: 14
    };
  }

  componentWillReceiveProps(props) {
    let route = props["route"];
    console.log(route);

    this.setState({
      renderRoute: true,
      mapCenter: route[0],
      route: route,
      initial_lat: route[0][0],
      initial_lng: route[0][1],
      end_lat: route[route.length-1][0],
      end_lng: route[route.length-1][1]
    });
  }

  componentWillMount() {
    if (navigator.geolocation) {
      let position = this.setPosition.bind(this);
      navigator.geolocation.getCurrentPosition(position);
    }
  }

  render() {
    let initial_position = [this.state.initial_lat, this.state.initial_lng]
    let route;
    let initial_marker;
    let end_marker;

    if(this.state.renderRoute) {
      route = <Polyline positions={this.state.route} weight={9} opacity={.5} />
      initial_marker = <Marker key={`marker-1`} position={[this.state.initial_lat, this.state.initial_lng]}>
        <Popup>
          <span>Starting Point</span>
        </Popup>
     </Marker>;
      end_marker = <Marker key={`marker-2`} position={[this.state.end_lat, this.state.end_lng]}>
          <Popup>
            <span>Destination Point</span>
          </Popup>
      </Marker>
    } else {
      route = <Marker position={initial_position}></Marker>;
    }

    return (
      <Map center={initial_position} zoom={this.state.zoom} style={{
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.3,
        fillColor: '#ffffff'
      }}>
        <TileLayer
          url="https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png"
        />
        {route}
        {initial_marker}
        {end_marker}
      </Map>
    )
  }

  setPosition(position) {
    this.setState({
      initial_lat: position.coords.latitude,
      initial_lng: position.coords.longitude,
      zoom: 13
    });
  }

  // style() {
  //   // console.log(sn);
  //   // if (sn == feature.properties.name) {
  //   //   return {
  //   //     weight: 2,
  //   //     opacity: 1,
  //   //     color: 'white',
  //   //     dashArray: '3',
  //   //     fillOpacity: 0.3,
  //   //     fillColor: '#ff0000'
  //   //   };
  //   // } else {
  //   //   return {
  //   //     weight: 2,
  //   //     opacity: 1,
  //   //     color: 'white',
  //   //     dashArray: '3',
  //   //     fillOpacity: 0.3,
  //   //     fillColor: '#666666'
  //   //   };
  //   // }
  //   return {
  //     weight: 2,
  //     opacity: 1,
  //     color: 'white',
  //     dashArray: '3',
  //     fillOpacity: 0.3,
  //     fillColor: '#ff0000'
  //   };
  // }
}
