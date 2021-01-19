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
      mapboxApiAccessToken='pk.eyJ1IjoiYW5pa3JhbSIsImEiOiJja2l3NGlqMm0zZnU0MnZxajhjd2Iwd3FvIn0.19gcJrXX7nINBiw3ttmukw'
      mapStyle='mapbox://styles/anikram/ckiw58y2q4hhe1ap9wb16q2yh'
    >

    </ReactMapGL>
  );
}

export default RareMap;