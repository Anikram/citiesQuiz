import React, {Fragment, useEffect, useState} from 'react';
import s from './Game.module.css';
import Map from "./Map/Map";
import PopUpPanel from "../common/Panels/PopUpPannel/PopUpPanel";
import {Redirect} from "react-router-dom";
import buttonStyle from "../common/formControls/Button/Button.module.css";
import RareMap from "./Map/RareMap";

const Game = ({isAuth, profile, createNewGame, gameData, finishGame, deleteGame, setTopScore}) => {
  const [exitGameTrigger, setExitGameTrigger] = useState(false)
  const [gameRunning, setGameRunning] = useState(false);
  const [gameInit, setGameInit] = useState(false);
  const [roundNumber, setRoundNumber] = useState(0)
  const [cities, setCities] = useState([]);

  const [guessedCities, setGuessedCities] = useState(0);
  const [currentCity, setCurrentCity] = useState({});


  const [startPopPanel, setStartPopPanel] = useState(true);
  const [pausePannel, setPausePannel] = useState(false);
  const [gameOverPanel, setGameOverPanel] = useState(false);
  const [score, setScore] = useState(1500);

  useEffect(() => {
    if (gameData.cities) setCities(gameData.cities)
    if (cities) setCurrentCity(cities[roundNumber])
    if (currentCity) setGameInit(true)

    if (gameRunning) {
      if (score <= 0) setScore(0)
      if (score <= 0 || ((cities.length === roundNumber) && roundNumber !== 0)) {
        setGameOverPanel(true)
      }
      if ((cities.length === roundNumber) && roundNumber !== 0) {
        console.log('end game condition to update the score')
        if (profile.top_score < score) {
          setTopScore(profile.user_id, score)
        }
      }
    }


  }, [cities, gameData, currentCity, score, roundNumber])


  const initGame = (value) => {
    if (!isAuth) setExitGameTrigger(true)

    createNewGame(profile.user_id, value.toLowerCase())
    if (gameInit) setGameRunning(true)

    // fetchGameData(gameData.game_id)
  }

  const gameRoundHandle = (roundData) => {
    console.log('Distance: ' + roundData)
    if (roundData <= 50) setGuessedCities((c) => c + 1)
    setScore((score) => score - roundData)
    setRoundNumber((round) => (round + 1))
  }

  const pauseGame = () => {
    console.log('exitGame triggered')
    setStartPopPanel(false)
    setPausePannel(true)
    //show popup and exit to profile
  }

  const updateTopScore = () => {

  }

  const quitGame = () => {
    console.log('quit game!')
    console.log(profile.top_score)
    console.log(score)
    // updateTopScore()
    setExitGameTrigger(true)
  }

  const retryGame = () => {
    console.log('Retry!')
    cities.length === roundNumber ? finishGame(gameData.game_id,score) : deleteGame(gameData.game_id)
    // updateTopScore()
    setGameRunning(false)
    setGameOverPanel(false)
    setGameInit(false)
    setCities([])
    setScore(1500)
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
          {currentCity && <Map city={currentCity} onRoundFinish={gameRoundHandle} currentScore={score}/>}
          <button onClick={pauseGame} className={"btn btn-warning " + buttonStyle.button + ' ' + s.quitButtonDiv}>Quit
          </button>
        </div>

        {!pausePannel || <PopUpPanel text={`Are you sure you want to quit?`} confirmText={`Yes`} declineText={`No`}
                                     onSuccess={quitGame} onDecline={continueGame}/>
        }
        {!gameOverPanel ||
        <Fragment>
          <RareMap/>
          <PopUpPanel text={`Game is over. You guessed ${guessedCities} cities with ${score} km left!`}
                      confirmText={`Retry`} declineText={`Thank you`}
                      onSuccess={retryGame} onDecline={quitGame} wDropdown={false}/>
        </Fragment>

        }
      </div>
      : <Redirect to='/profile'/>

  )
}

export default Game;