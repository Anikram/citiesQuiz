import React, {Fragment, useEffect, useState} from 'react';
import ReactMapGL, {Marker} from 'react-map-gl';
import {faCross, faCrown, faMapMarker} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import s from './Map.module.css'
// import sBtn from '../../../components/common/Button/Button.module.css'
import Button from "../../common/formControls/Button/Button";
import buttonStyle from "../../common/formControls/Button/Button.module.css";
import {faDotCircle} from "@fortawesome/free-regular-svg-icons";

function Map({city, onRoundFinish,currentScore}) {
  const [choiceMade, setChoiceMade] = useState(false)
  const [guessPosition, setGuessPosition] = useState({});

  const [viewport, setViewport] = useState({
    latitude: 48.1599,
    longitude: 11.5761,
    zoom: 3,
    width: "100%",
    height: "80vh"
  });

  const calculateDistance = (p1lat, p1long, p2lat, p2long) => {
    const EARTH_RADIUS = 6371;
    //raw coordinates
    const lat1 = p1lat;
    const lng1 = p1long;
    const lat2 = p2lat;
    const lng2 = p2long;

    //converted to RADs coordinates
    const lat1Rad = lat1 * Math.PI / 180;
    const lat2Rad = lat2 * Math.PI / 180;
    const lng1Rad = lng1 * Math.PI / 180;
    const lng2Rad = lng2 * Math.PI / 180;

    //cos and sin
    const cl1 = Math.cos(lat1Rad);
    const cl2 = Math.cos(lat2Rad);
    const sl1 = Math.sin(lat1Rad);
    const sl2 = Math.sin(lat2Rad);
    const delta = lng1Rad - lng2Rad;
    const cdelta = Math.cos(delta);
    const sdelta = Math.sin(delta);

    const y = Math.sqrt(Math.pow(cl2 * sdelta, 2) + Math.pow(cl1 * sl2 - sl1 * cl2 * cdelta, 2));
    const x = sl1 * sl2 + cl1 * cl2 * cdelta;

    const ad = Math.atan2(y, x);
    const distance = ad * EARTH_RADIUS;

    return Math.round(distance)
  }


  const handleMapClick = ({lngLat: [longitude, latitude]}) => {
    console.log('map clicked!')
    setGuessPosition({longitude, latitude})
    setChoiceMade(true)
    const distance = calculateDistance(latitude,longitude, city.lat, city.long)
    setTimeout(() => {
      onRoundFinish(distance)
      setGuessPosition({})
      setChoiceMade(false)
    },100)
  }

  useEffect(() => {

  }, [city,currentScore])

  return (
    <ReactMapGL
      {...viewport}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
      mapStyle='mapbox://styles/anikram/ckiw58y2q4hhe1ap9wb16q2yh'
      onClick={handleMapClick}
      getCursor={(e) => "crosshair"}
      // onViewportChange={(viewport) => setViewport(viewport)}
    >
      {/*{marker.longitude && <Marker {...marker}><FontAwesomeIcon*/}
      {/*  icon={faCross}/></Marker>}*/}

      <Fragment>

        { city && <Fragment>
          <div className={s.cityTitleDiv}>{city.capitalCity}</div>
          <div className={s.scoreDiv}>Score: {currentScore} km</div>
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