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
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  shadowUrl: markerShadow,
  shadowSize: [41, 41],
  shadowAnchor: [12, 41],
  popupAnchor: [0, -42],
})

interface Props {
  data: any[];
  locationData: any[];
  position: any;
  zoom: number;
}

class GeoMap extends React.Component<Props, {}> {

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

    const {
      position,
      zoom,
    } = this.props

    return (
      <Map
        center={position}
        zoom={zoom}
        scrollWheelZoom={false}
      >
        <TileLayer
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          attribution='&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors'
        />
        <MarkerClusterGroup maxClusterRadius={50}>
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
