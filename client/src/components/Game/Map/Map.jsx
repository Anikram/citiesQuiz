import React, {Fragment, useEffect, useState} from 'react';
import ReactMapGL, {Marker} from 'react-map-gl';
import {faMapMarker} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import s from './Map.module.css'

function Map({cities, gameOverCallback}) {
  const [gameIsOn, setGameIsOn] = useState(false);
  const [score, setScore] = useState(0);
  const [currentCity, setCurrentCity] = useState({
    visible: false,
    lat: 0,
    long: 0,
    capitalCity: 'initial'
  });

  const [guessCities, setGuessCities] = useState(0);

  const [viewport, setViewport] = useState({
    latitude: 48.1599,
    longitude: 11.5761,
    zoom: 3.5,
    width: "100%",
    height: "100%"
  });


  const handleMapClick = (e) => {
    console.log('map clicked!')

    const city = cities[guessCities];
    // setCurrentCity({...city, visible: false})


    if (guessCities === 0) {
      //first iteration handle
      setCurrentCity({...city, visible: false});
      setGuessCities(guessCities + 1)
    } else if (!city) {
      //gameOver hendle
      setGameIsOn(false)
      gameOverCallback(score)
    } else {
      setCurrentCity({...currentCity, visible: true})
      setScore(score + 1)
      const timer = setTimeout(() => {
        setCurrentCity({...city, visible: false});
        setGuessCities(guessCities + 1)
      }, 1)
    }
  }

  useEffect(() => {
    setGameIsOn(true)
  }, [])

  return (
    <ReactMapGL
      {...viewport}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
      mapStyle='mapbox://styles/anikram/ckiw58y2q4hhe1ap9wb16q2yh'
      onClick={handleMapClick}
      // onViewportChange={(viewport) => setViewport(viewport)}
    >
      {!gameIsOn ||
      <Fragment>
        {!(guessCities === 0) ?
          <Fragment>
            <div className={s.cityTitleDiv}>{currentCity.capitalCity}</div>
            <div className={s.scoreDiv}>Score: {score} km</div>
          </Fragment>
          :
          <div className={s.cityTitleDiv}>Click to start</div>
        }
        <Fragment>
          <Marker latitude={currentCity.lat} longitude={currentCity.long} offsetLeft={-20} offsetTop={-10}>
            <div className={!currentCity.visible ? s.visible : s.invisible}><FontAwesomeIcon
              icon={faMapMarker}/></div>
          </Marker>
        </Fragment>

      </Fragment>
      }
    </ReactMapGL>
  );
}

export default Map;