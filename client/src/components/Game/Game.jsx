import React, {Fragment, useEffect, useState} from 'react';
import s from './Game.module.css';
import Map from "./Map/Map";
import PopUpPanel from "../common/Panels/PopUpPannel/PopUpPanel";
import {Redirect} from "react-router-dom";
import buttonStyle from "../common/formControls/Button/Button.module.css";
import RareMap from "./Map/RareMap";

const winStyle = {
  background: 'forestgreen',
'font-weight': 'bold',
color: 'aliceblue'
}

const loseStyle = {
  background: 'crimson',
  'font-weight': 'bold',
  color: 'aliceblue'
}

const Game = ({isAuth, profile, createNewGame, gameData, finishGame, deleteGame, setTopScore, flushGameData}) => {
  const [exitGameTrigger, setExitGameTrigger] = useState(false) //trigger end game redirect
  const [gameRunning, setGameRunning] = useState(false); //game in progress?
  const [gameInit, setGameInit] = useState(false); //game is init?
  const [roundNumber, setRoundNumber] = useState(0); //current round
  const [cities, setCities] = useState([]);//cities array from api
  const [win, setWin] = useState(false);

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
    if (gameInit && gameRunning) {
      if (distance <= 0) setDistance(0)

      if (distance > 0 && cities.length === roundNumber && roundNumber !== 0) {
        if ((cities.length === roundNumber) && roundNumber !== 0) {
          if (profile.top_score < guessedCities) {
            setTopScore(profile.user_id, guessedCities)
          }
        }
        setWin(true)
        setGameOverPanel(true)
      }

      if (distance <= 0 && roundNumber !== 0) {
        setGameOverPanel(true)
      }
    }


  }, [cities, gameData, currentCity,
    distance, roundNumber, gameRunning,
    guessedCities, profile.top_score,
    profile.user_id, setTopScore])


  const initGame = (value) => {
    if (!isAuth) setExitGameTrigger(true)

    createNewGame(profile.user_id, value.toLowerCase()).catch(err => {
      console.err(err)
    })
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

  const handleGameFinish = () => {
    return finishGame(gameData.game_id, guessedCities, distance,win)
  }

  const quitGame = () => {
    handleGameFinish()
    setExitGameTrigger(true)
  }

  const retryGame = () => {
    finishGame(gameData.game_id, guessedCities, distance,win)
    flushGameData()
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
                    onSuccess={initGame} onDecline={quitGame} wDropdown={true} dropdownText={'Regions'} />

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
        (win
          ? <Fragment>
            <RareMap/>
            <PopUpPanel text={`You win! You guessed ${guessedCities} cities with ${distance} km left!`}
                        confirmText={`Retry`} declineText={`Thanks`}
                        onSuccess={retryGame} onDecline={quitGame} wDropdown={false} style={winStyle}/>

          </Fragment>
          : <Fragment>
            <RareMap/>
            <PopUpPanel text={`You have lost. You guessed ${guessedCities} cities with ${distance} km left!`}
                        confirmText={`Retry`} declineText={`Thank you`}
                        onSuccess={retryGame} onDecline={quitGame} wDropdown={false} style={loseStyle} />
          </Fragment>)

        }
      </div>
      : <Redirect to='/profile'/>

  )
}

export default Game;