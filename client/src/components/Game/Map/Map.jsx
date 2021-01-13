import React from 'react';
import ReactMapGL from 'react-map-gl';

function Map() {
  const [viewport, setViewport] = React.useState({
    latitude: 48.1599,
    longitude: 11.5761,
    zoom: 5,
    width: "100%",
    height: "100%"
  });

  return (
    <ReactMapGL
      {...viewport}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
      mapStyle='mapbox://styles/anikram/ckiw58y2q4hhe1ap9wb16q2yh'
      // onViewportChange={(viewport) => setViewport(viewport)}
    />
  );
}

export default Map;