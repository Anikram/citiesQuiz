import React, {Fragment, useEffect, useState} from 'react';
import ReactMapGL, {Marker} from 'react-map-gl';
import {faDoorOpen, faMapMarker} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import s from './Map.module.css'
// import sBtn from '../../../components/common/Button/Button.module.css'
import Button from "../../common/Button/Button";
import buttonStyle from "../../common/Button/Button.module.css";

function Map({cities, gameOverCallback,quitButtonCb}) {
  const [gameIsOn, setGameIsOn] = useState(false);
  const [score, setScore] = useState(1500);
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
    height: "80vh"
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
      //gameOver handle
      setGameIsOn(false)
      setScore(1500)
      setGuessCities(0)
      gameOverCallback(score)
    } else {
      setCurrentCity({...currentCity, visible: true})
      setScore(score - 1)
      const timer = setTimeout(() => {
        setCurrentCity({...city, visible: false});
        setGuessCities(guessCities + 1)
      }, 2500)
    }
  }
  const QUIT_BUTTON_STYLING = {
    position: 'fixed',
    bottom: '10vh',
    left: '10vw',
  }

  useEffect(() => {
    setGameIsOn(true)
  }, [gameIsOn])

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
          : <Fragment>
            <div className={s.cityTitleDiv}>Click to start</div>
          </Fragment>

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