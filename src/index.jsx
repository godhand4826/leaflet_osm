import React,{useState, useEffect} from 'react'
import ReactDOM from 'react-dom'

import {CircleMarker,MapContainer, TileLayer, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet/dist/images/marker-icon.png'
import 'leaflet/dist/images/marker-shadow.png'

const position=[25,121]

const style ={
	height:'100vh',
	width:'100%'
}

function Earthquake(){
	const [earthquake, setEarthquake] = useState(null)
	useEffect(() => {
		fetch('https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson')
			.then(res => res.json())
			.then(json => json.features.map(({properties:{mag}, geometry:{coordinates}})=> ({mag, lat:coordinates[1], lng:coordinates[0]})))
			.then(data => console.log(data)||setEarthquake(data))
	}, [])
	if (!earthquake){
		return ''
	}
	return <section>
		{earthquake.map(({mag,lat,lng}, i) => (
			<CircleMarker key={i} center={{lat,lng}} radius={mag*2}>
				<Popup>{mag}</Popup>
			</CircleMarker>
		))}
	</section>	
}

function Map(){
	return <MapContainer center={position} zoom={5} style={style}>
		<TileLayer
			attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
			url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
		/>
		<Earthquake/>
	</MapContainer>
}

ReactDOM.render(<Map/>, document.getElementById('root'))