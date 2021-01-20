import React, {useEffect, useState} from 'react';
import ReactMapGL, {FlyToInterpolator} from 'react-map-gl';
require('dotenv').config()

function RareMap() {
  const [viewport, setViewport] = useState({
    latitude: 48.1599,
    longitude: 11.5761,
    zoom: 1,
    width: "100%",
    height: "100%"
  });

  useEffect(()=> {
    setViewport((v)=>({...v,zoom:3}))
  },[])

  return (
    <ReactMapGL
      {...viewport}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
      mapStyle={process.env.REACT_APP_MAP_STYLE}
      onViewportChange={(viewport) => setViewport(viewport)}
      transitionDuration={1000}
      transitionInterpolator={new FlyToInterpolator()}
    >

    </ReactMapGL>
  );
}

export default RareMap;