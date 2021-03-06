import React, {Fragment, useEffect, useState} from 'react';
import ReactMapGL, {FlyToInterpolator, Marker} from 'react-map-gl';
import {faCrown, faCheck} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import s from './Map.module.css'
import {faDotCircle} from "@fortawesome/free-regular-svg-icons";
import {calculateDistance} from "../../../utils/helpers";

require('dotenv').config();

function Map({city, onRoundFinish, currentScore}) {
  const [choiceMade, setChoiceMade] = useState(false)
  const [guessPosition, setGuessPosition] = useState({});
  const [successDistance, setSuccessDistance] = useState(0);
  const [transitionDuration, setTransitionDuration] = useState(100);

  const [viewport, setViewport] = useState({
    latitude: 48.1599,
    longitude: 11.5761,
    zoom: 3,
    width: "100%",
    height: "85vh"
  });

  const distanceCheck = (distance) => {
    return distance <= 50
  }

  const handleMapClick = ({lngLat: [longitude, latitude]}) => {
    setGuessPosition({longitude, latitude})

    setChoiceMade(true)
    setTransitionDuration(1000)
    setTimeout(() => {
      setTransitionDuration(100)
    }, 3000)
    setViewport({
      latitude: city.lat,
      longitude: city.long,
      zoom: 5,
      width: "100%",
      height: "85vh"
    })
    const distance = calculateDistance(latitude, longitude, city.lat, city.long)
    if (distanceCheck(distance)) {
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
    setViewport({
      latitude: 48.1599,
      longitude: 11.5761,
      zoom: 3,
      width: "100%",
      height: "85vh"
    })
  }, [city])

  return (
    <ReactMapGL
      {...viewport}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
      mapStyle={process.env.REACT_APP_MAP_STYLE}
      onClick={handleMapClick}
      getCursor={(e) => "crosshair"}
      onViewportChange={(viewport) => setViewport(viewport)}
      transitionDuration={transitionDuration}
      transitionInterpolator={new FlyToInterpolator()}
    >

      <Fragment>

        {city && <Fragment>
          <div className={s.cityTitleDiv}>{city.capitalCity}</div>
          <div className={s.scoreDiv}>Distance: {currentScore} km</div>
          {successDistance !== 0 &&
          <div className={s.successDiv}>
            <FontAwesomeIcon icon={faCheck}/>
          </div>}
        </Fragment>}

        <Fragment>
          {
            choiceMade &&
            <Fragment>

                <Marker latitude={city.lat} longitude={city.long} offsetLeft={-10} offsetTop={-12}>
                  <div className={successDistance ? s.successColor : s.cityColor}>
                  <FontAwesomeIcon
                    icon={faDotCircle}/>
                  </div>

                </Marker>

            </Fragment>

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