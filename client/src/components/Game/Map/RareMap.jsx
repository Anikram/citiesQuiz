import React, {useState} from 'react';
import ReactMapGL from 'react-map-gl';

function RareMap() {
  const [viewport, setViewport] = useState({
    latitude: 48.1599,
    longitude: 11.5761,
    zoom: 1,
    width: "100%",
    height: "80vh"
  });

  return (
    <ReactMapGL
      {...viewport}
      mapboxApiAccessToken={process.env.NODE_ENV === 'production' ? process.env.MAP_TOKEN : process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
      mapStyle={process.env.NODE_ENV === 'production' ? process.env.MAP_STYLE : process.env.REACT_APP_MAP_STYLE}
    >

    </ReactMapGL>
  );
}

export default RareMap;