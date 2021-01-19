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
      mapboxApiAccessToken='pk.eyJ1IjoiYW5pa3JhbSIsImEiOiJja2l3NHJyOWIzZXhlMnlsYnZxMjFwc2V2In0.bbOgwP1diRO6BiV2guyPwA'
      mapStyle='mapbox://styles/mapbox/light-v10'
    >

    </ReactMapGL>
  );
}

export default RareMap;