import React, {Fragment, useEffect, useState} from 'react';
import s from './Game.module.css';
import Map from "./Map/Map";
import PopUpPanel from "../common/Panels/PopUpPannel/PopUpPanel";
import {Redirect} from "react-router-dom";
import buttonStyle from "../common/formControls/Button/Button.module.css";
import RareMap from "./Map/RareMap";

const Game = ({isAuth, profile, createNewGame, gameData, finishGame, deleteGame, setTopScore}) => {
  const [exitGameTrigger, setExitGameTrigger] = useState(false) //trigger end game redirect
  const [gameRunning, setGameRunning] = useState(false); //game in progress?
  const [gameInit, setGameInit] = useState(false); //game is init?
  const [roundNumber, setRoundNumber] = useState(0); //current round
  const [cities, setCities] = useState([]);//cities array from api

  const [guessedCities, setGuessedCities] = useState(0); // number of guessed cities
  const [currentCity, setCurrentCity] = useState({}); // current city for render a map


  const [startPopPanel, setStartPopPanel] = useState(true); // modal for game start (triggers init)
  const [pausePannel, setPausePannel] = useState(false); // model for pause
  const [gameOverPanel, setGameOverPanel] = useState(false); // modal for game over
  const [distance, setDistance] = useState(1500); // distance limit

  useEffect(() => {
    //initializing conditions
    if (gameData.cities) setCities(gameData.cities)
    if (cities) setCurrentCity(cities[roundNumber])
    if (currentCity) setGameInit(true)

    //end game conditions
    if (gameRunning) {
      if (distance <= 0) setDistance(0)
      if (distance <= 0 || ((cities.length === roundNumber) && roundNumber !== 0)) {
        setGameOverPanel(true)
      }
      if ((cities.length === roundNumber) && roundNumber !== 0) {
        if (profile.top_score < guessedCities) {
          setTopScore(profile.user_id, guessedCities)
        }
      }
    }


  }, [cities, gameData, currentCity,
    distance, roundNumber, gameRunning,
    guessedCities, profile.top_score,
    profile.user_id, setTopScore])


  const initGame = (value) => {
    if (!isAuth) setExitGameTrigger(true)

    createNewGame(profile.user_id, value.toLowerCase())
    if (gameInit) setGameRunning(true)

  }

  const gameRoundHandle = (roundData) => {
    if (roundData <= 50) setGuessedCities((c) => c + 1)
    setDistance((distance) => distance - roundData)
    setRoundNumber((round) => (round + 1))
  }

  const pauseGame = () => {
    setStartPopPanel(false)
    setPausePannel(true)
  }

  const quitGame = () => {
    setExitGameTrigger(true)
  }

  const retryGame = () => {
    cities.length === roundNumber ? finishGame(gameData.game_id, distance) : deleteGame(gameData.game_id)

    setGameRunning(false)
    setGameOverPanel(false)
    setGameInit(false)
    setCities([])
    setDistance(1500)
    setGuessedCities(0)
    setCurrentCity({})
    setRoundNumber(0)
    setStartPopPanel(true)
  }

  const continueGame = () => {
    console.log('continue game triggered')
    setPausePannel(false)
    if (!cities.length > 0) {
      setStartPopPanel(true)
    }
  }


  return (
    !exitGameTrigger
      ? !gameRunning
      ? <Fragment>
        <RareMap/>
        <PopUpPanel text={`Pick a region you want to play at:`} confirmText={`Start`} declineText={`Cancel`}
                    onSuccess={initGame} onDecline={quitGame} wDropdown={true} dropdownText={'Regions'}/>

      </Fragment>

      : <div>
        <div className={`middle ${s.gameContainer}`}>
          {currentCity &&
          <Map city={currentCity} onRoundFinish={gameRoundHandle} currentScore={distance}/>}
          <button onClick={pauseGame} className={"btn btn-warning " + buttonStyle.button + ' ' + s.quitButtonDiv}>Quit
          </button>
        </div>

        {!pausePannel || <PopUpPanel text={`Are you sure you want to quit?`} confirmText={`Yes`} declineText={`No`}
                                     onSuccess={quitGame} onDecline={continueGame}/>
        }
        {!gameOverPanel ||
        <Fragment>
          <RareMap/>
          <PopUpPanel text={`Game is over. You guessed ${guessedCities} cities with ${distance} km left!`}
                      confirmText={`Retry`} declineText={`Thank you`}
                      onSuccess={retryGame} onDecline={quitGame} wDropdown={false}/>
        </Fragment>

        }
      </div>
      : <Redirect to='/profile'/>

  )
}

export default Game;