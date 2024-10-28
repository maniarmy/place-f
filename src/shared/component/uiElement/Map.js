import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import './Map.css';

function Map(props) {
  
  return (
    <div className={`map ${props.className}`} style={props.style}>
      <MapContainer className={`mymap ${props.className}`} center={props.mapPosition} zoom={props.mapZoom} scrollWheelZoom={false}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
    />
    <Marker position={[props.mapPosition.lat, props.mapPosition.lng]}>
      <Popup>
        A pretty CSS3 popup. <br /> Easily customizable.
      </Popup>
    </Marker>
  </MapContainer>
    </div>
  )
}

export default Map