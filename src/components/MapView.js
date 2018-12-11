import React, { Component } from 'react';
import { Map, TileLayer, Marker, Popup, Polyline, } from '../map_components';
import RoutingMachine from './RoutingMachine';
import L from 'leaflet';

export default class MapView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      initial_lat: 42.373222,
      initial_lng: -72.519852,
      end_lat: 42.373222,
      end_lng: -72.51982,
      renderRoute: false,
      mapCenter: [42.36, -71.36],
      zoom: 14
    };
  }

  componentWillReceiveProps(props) {
    let route = props["route"];
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

  createMap() {
    let map = L.map('map', {
      center: [42.373222, -72.519852],
      zoom: 15,
      weight: 10,
      layers: [
        // L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png')
        L.tileLayer("https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png")
        // L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png")
      ]
    });
    this.initial_marker = L.marker([this.state.initial_lat, this.state.initial_lng])
    this.initial_marker.addTo(map);
    return map;
  }

  setRouting(map) {
    this.routingControl = L.Routing.control({itineraryClassName: "routing-directions"});
    this.routingControl.addTo(map);
  }

  addRouting(waypoints) {
    this.routingControl.getPlan().setWaypoints(waypoints);
  }

  componentDidMount() {
    this.map = this.createMap();
    this.setRouting(this.map)
  }

  render() {
    if(this.state.renderRoute) {

      this.map.removeLayer(this.initial_marker);

      let waypoints = this.state.route.map(coords => {
        return L.latLng(coords[0], coords[1])
      });

      console.log(this.state.route.length);

      let filteredWaypoints = waypoints.filter(function(value, index, Arr) {
        return index % 5 == 0;
      });

      this.addRouting(filteredWaypoints);
      let mid_lat = this.state.route[0][0]+this.state.route[this.state.route.length-1][0]/2
      let mid_lng = this.state.route[0][1]+this.state.route[this.state.route.length-1][1]/2
      this.map.panTo(new L.LatLng(mid_lat, mid_lng));
    } else {
    }

    return (
      <div id="map"></div>
    );
  }
  }
