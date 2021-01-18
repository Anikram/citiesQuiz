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
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
      mapStyle='mapbox://styles/anikram/ckiw58y2q4hhe1ap9wb16q2yh'
      // onViewportChange={(viewport) => setViewport(viewport)}
    >

    </ReactMapGL>
  );
}

export default RareMap;