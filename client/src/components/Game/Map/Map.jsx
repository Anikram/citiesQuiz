import React, {Fragment, useEffect, useState} from 'react';
import ReactMapGL, {Marker} from 'react-map-gl';
import {faCrown,faCheck} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import s from './Map.module.css'
import {faDotCircle} from "@fortawesome/free-regular-svg-icons";
import {calculateDistance} from "../../../utils/helpers";

function Map({city, onRoundFinish, currentScore}) {
  const [choiceMade, setChoiceMade] = useState(false)
  const [guessPosition, setGuessPosition] = useState({});
  const [successDistance, setSuccessDistance] = useState(0);

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
    const distance = calculateDistance(latitude, longitude, city.lat, city.long)
    if (distance <= 50) {
      setSuccessDistance(distance)
    }

      setTimeout(() => {
        onRoundFinish(distance)
        setGuessPosition({})
        setChoiceMade(false)
        setSuccessDistance(0)
      }, 2750)
  }

  useEffect(() => {
  }, [city, currentScore])

  return (
    <ReactMapGL
      {...viewport}
      mapboxApiAccessToken={process.env.NODE_ENV === "production" ? process.env.MAP_ACCESS_TOKEN : process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
      mapStyle='mapbox://styles/anikram/ckiw58y2q4hhe1ap9wb16q2yh'
      onClick={handleMapClick}
      getCursor={(e) => "crosshair"}
      onViewportChange={(viewport) => setViewport(viewport)}
    >

      <Fragment>

        {city && <Fragment>
          <div className={s.cityTitleDiv}>{city.capitalCity}</div>
          <div className={s.scoreDiv}>Distance: {currentScore} km</div>
          { successDistance !== 0 &&
          <div className={s.successDiv}>
            <FontAwesomeIcon icon={faCheck}/>
          </div> }
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
            guessPosition.latitude && <Fragment>
              <Marker latitude={guessPosition.latitude} longitude={guessPosition.longitude} offsetLeft={-10}
                      offsetTop={-15}>
                <div><FontAwesomeIcon
                  icon={faCrown}/></div>
              </Marker>
            </Fragment>
          }

        </Fragment>
      </Fragment>
    </ReactMapGL>
  );
}

export default Map;