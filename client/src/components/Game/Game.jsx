import React, {useEffect, useState} from 'react';
import s from './Game.module.css';
import Map from "./Map/Map";
import PopUpPanel from "../common/Panels/PopUpPannel/PopUpPanel";
import {Redirect} from "react-router-dom";
import buttonStyle from "../common/Button/Button.module.css";

const Game = ({fetchGameData, profile,createNewGame, gameData, finishGame, deleteGame}) => {
  const [gameRunning, setGameRunning] = useState(true);
  const [cities, setCities] = useState([]);
  const [startPopPanel, setStartPopPanel] = useState(true);
  const [finishPopPanel, setFinishPopPanel] = useState(false);
  const [gameOverPanel, setGameOverPanel] = useState(false);
  const [finalScore, setFinalScore] = useState(0);

  useEffect(() => {
    setCities(gameData.cities)
  },[gameData])

  const loadCities = (value) => {
    console.log('loadCities triggered')
    console.log('region: ' + value)
    setStartPopPanel(false)
    createNewGame(profile.user_id,value.toLowerCase())
  }

  const exitGame = () => {
    console.log('exitGame triggered')
    setStartPopPanel(false)
    setFinishPopPanel(true)
    //show popup and exit to profile
  }

  const quitGame = () => {
    console.log('quit game triggered')
    setFinishPopPanel(false)
    setGameRunning(false)
    deleteGame(gameData.game_id)
  }

  const continueGame = () => {
    console.log('continue game triggered')
    setFinishPopPanel(false)
    if (!cities.length > 0) {
      setStartPopPanel(true)
    }
  }

  const handleGameOver = (score) => {
    setFinalScore(score)
    setGameOverPanel(true)
  }

  const retryCallBack = () => {
    setStartPopPanel(true)
    setGameOverPanel(false)
    finishGame(gameData.game_id)
  }

  const quitCallBack = () => {
    setGameRunning(false)
    finishGame(gameData.game_id)
  }

  return (
    !gameRunning
      ? <Redirect to="/profile"/>
      : <div>

        <div className={`middle ${s.gameContainer}`}>
          <Map cities={cities} gameOverCallback={handleGameOver}/>
          <button onClick={exitGame} className={"btn btn-warning " + buttonStyle.button +' '+ s.quitButtonDiv}>Quit</button>
        </div>
        {!startPopPanel ||
        <PopUpPanel text={`Pick a region you want to play at:`} confirmText={`Start`} declineText={`Cancel`}
                    onSuccess={loadCities} onDecline={exitGame} wDropdown={true} dropdownText={'Regions'}/>
        }
        {!finishPopPanel || <PopUpPanel text={`Are you sure you want to quit?`} confirmText={`Yes`} declineText={`No`}
                                        onSuccess={quitGame} onDecline={continueGame}/>
        }
        {!gameOverPanel ||
        <PopUpPanel text={`Game is over with final score of ${finalScore} km!`} confirmText={`Retry`} declineText={`Thank you`}
                    onSuccess={retryCallBack} onDecline={quitCallBack} wDropdown={false}/>
        }
      </div>

  )
}

export default Game;