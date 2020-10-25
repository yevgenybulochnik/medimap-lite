import React from 'react'
import './map.scss'
import L from 'leaflet'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import MarkerClusterGroup from 'react-leaflet-markercluster'
import MarkerTable from './markerTable'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

const defaultMarkericon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  popupAnchor: [12, 0],
})

interface Props {
  data: any[];
  locationData: any[];
}

class GeoMap extends React.Component<Props, {}> {
  state = {
    lat: 45.5051,
    lng: -122.6750,
    zoom: 9,
    markerData: [],
  }

  getLocations() {
    const { data, locationData } = this.props
    const filteredLocations = data.map((datum: any) => datum.location_id)
    return locationData.filter((d: any) => filteredLocations.includes(d.id))
  }

  getMarkerData(locationId: number) {
    const { data } = this.props
    const markerData = data.filter((datum: any) => datum.location_id === locationId)
    return markerData
  }

  render() {

    return (
      <Map center={[this.state.lat, this.state.lng]} zoom={this.state.zoom}>
        <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
        <MarkerClusterGroup>
          {
            this.getLocations().map((location: any) => (
              <Marker
                position={location.gps}
                icon={defaultMarkericon}
                onClick={() => this.getMarkerData(location.id)}
              >
                <Popup maxWidth={1000} autoClose={false} closeOnClick={false}>
                  <div style={{width: '400px'}}>
                    <MarkerTable
                      data={this.getMarkerData(location.id)}
                    />
                  </div>
                </Popup>
              </Marker>
            ))
          }
        </MarkerClusterGroup>
      </Map>
    )
  }
}

export default GeoMap
