import React from 'react'
import './map.scss'
import { Map, TileLayer } from 'react-leaflet'


interface Props {

}

interface State {

}

class GeoMap extends React.Component<Props, State> {
  state = {
    lat: 45.5051,
    lng: -122.6750,
    zoom: 9,
  }

  render() {
    return (
      <Map center={[this.state.lat, this.state.lng]} zoom={this.state.zoom}>
        <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
      </Map>
    )
  }
}

export default GeoMap
