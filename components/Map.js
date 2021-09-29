import { useState } from 'react'
import ReactMapGL, { Marker, Popup } from 'react-map-gl'
import getCenter from 'geolib/es/getCenter'

function Map({ searchResults }) {
  const [selectedLocation, setSelectedLocation] = useState({})

  //transform search results object
  const coordinates = searchResults.map((result) => ({
    longitude: result.long,
    latitude: result.lat,
  }))

  const center = getCenter(coordinates)

  const [viewport, setViewport] = useState({
    latitude: center.latitude,
    longitude: center.longitude,
    zoom: 11,
    width: '100%',
    height: '100%',
  })

  console.log('selectedLocation', selectedLocation.long)

  return (
    <ReactMapGL
      {...viewport}
      mapStyle="mapbox://styles/seanpatrick89/cku4iuk580wgj17mo6cx1jv44"
      mapboxApiAccessToken={process.env.mapbox_key}
      width="100%"
      height="100%"
      onViewportChange={(viewport) => setViewport(viewport)}
    >
      {searchResults.map((result) => (
        <div key={result.long}>
          <Marker
            longitude={result.long}
            latitude={result.lat}
            offsetLeft={-20}
            offsetTop={-10}
          >
            <p
              role="img"
              aria-label="push-pin"
              onClick={() => setSelectedLocation(result)}
              className="cursor-pointer text-2xl animate-bounce"
            >
              📍
            </p>
          </Marker>
          {selectedLocation.long === result.long ? (
            <Popup
              latitude={result.lat}
              longitude={result.long}
              closeButton={true}
              closeOnClick={true}
              onClose={() => setSelectedLocation({})}
              // anchor="top"
            >
              <div className="z-50">{result.title}</div>
            </Popup>
          ) : (
            false
          )}
        </div>
      ))}
    </ReactMapGL>
  )
}

export default Map
