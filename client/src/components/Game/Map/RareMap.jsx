import React, {useState} from 'react';
import ReactMapGL from 'react-map-gl';
require('dotenv').config()

function RareMap() {
  const [viewport, setViewport] = useState({
    latitude: 48.1599,
    longitude: 11.5761,
    zoom: 1,
    width: "100%",
    height: "85vh"
  });

  return (
    <ReactMapGL
      {...viewport}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
      mapStyle={process.env.REACT_APP_MAP_STYLE}
    >

    </ReactMapGL>
  );
}

export default RareMap;