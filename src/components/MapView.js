// @flow

import React, { Component } from 'react'
import { Map, TileLayer, Marker, Popup } from '../map_components'

type State = {
  lat: number,
  lng: number,
  zoom: number,
}

export default class MapView extends Component<{}, State> {
  state = {
    lat: 51.505,
    lng: -0.09,
    zoom: 13,
  }

  render() {
    const position = [this.state.lat, this.state.lng]
    return (
      <Map center={position} zoom={this.state.zoom} style={{
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
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </Map>
    )
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
