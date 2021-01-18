import React, {Fragment, useEffect, useState} from 'react';
import ReactMapGL, {Marker} from 'react-map-gl';
import {faCrown} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import s from './Map.module.css'
import {faDotCircle} from "@fortawesome/free-regular-svg-icons";
import {calculateDistance} from "../../../utils/helpers";

function Map({city, onRoundFinish,currentScore}) {
  const [choiceMade, setChoiceMade] = useState(false)
  const [guessPosition, setGuessPosition] = useState({});

  const [viewport, setViewport] = useState({
    latitude: 48.1599,
    longitude: 11.5761,
    zoom: 3,
    width: "100%",
    height: "85vh"
  });




  const handleMapClick = ({lngLat: [longitude, latitude]}) => {
    setGuessPosition({longitude, latitude})
    setChoiceMade(true)
    const distance = calculateDistance(latitude,longitude, city.lat, city.long)
    setTimeout(() => {
      onRoundFinish(distance)
      setGuessPosition({})
      setChoiceMade(false)
    },1500)
  }

  useEffect(() => {
    console.log('Map render')
  }, [city,currentScore])

  return (
    <ReactMapGL
      {...viewport}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
      mapStyle='mapbox://styles/anikram/ckiw58y2q4hhe1ap9wb16q2yh'
      onClick={handleMapClick}
      getCursor={(e) => "crosshair"}
      onViewportChange={(viewport) => setViewport(viewport)}
    >

      <Fragment>

        { city && <Fragment>
          <div className={s.cityTitleDiv}>{city.capitalCity}</div>
          <div className={s.scoreDiv}>Distance: {currentScore} km</div>
        </Fragment>}

        <Fragment>
          {
            choiceMade &&
          <Marker latitude={city.lat} longitude={city.long} offsetLeft={-10} offsetTop={-12}>
            <div><FontAwesomeIcon
              icon={faDotCircle}/></div>
          </Marker>
          }

          {
            guessPosition.latitude && <Marker latitude={guessPosition.latitude} longitude={guessPosition.longitude} offsetLeft={-10} offsetTop={-15}>
              <div><FontAwesomeIcon
                icon={faCrown}/></div>
            </Marker>
          }

        </Fragment>
      </Fragment>
    </ReactMapGL>
  );
}

export default Map;