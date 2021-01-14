import React, {useEffect, useState} from 'react';
import s from './Game.module.css';
import Map from "./Map/Map";
import PopUpPanel from "../common/Panels/PopUpPannel/PopUpPanel";
import {Redirect} from "react-router-dom";

const Game = ({fetchGameData, profile,createNewGame, gameData}) => {
  const [gameRunning, setGameRunning] = useState(true);
  const [cities, setCities] = useState([]);
  const [startPopPanel, setStartPopPanel] = useState(true);
  const [finishPopPanel, setFinishPopPanel] = useState(false);
  const [gameOverPanel, setGameOverPanel] = useState(false);
  const [region, setRegion] = useState('');
  const [finalScore, setFinalScore] = useState(0);

  useEffect(() => {
    setCities(gameData.cities)
  },[gameData])

  const loadCities = (value) => {
    console.log('loadCities triggered')
    console.log(value.toLowerCase())
    setStartPopPanel(false)
    createNewGame(profile.user_id)
    // fetchGameData(1)
    //  Load cities to reducer
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
  }

  const continueGame = () => {
    console.log('continue game triggered')
    setFinishPopPanel(false)
    if (!cities.length > 0) {
      setStartPopPanel(true)
    }
  }

  const gameOver = (score) => {
    setFinalScore(score)
    setGameOverPanel(true)
  }

  const retryCallBack = () => {

  }

  const quitCallBack = () => {

  }

  return (
    !gameRunning
      ? <Redirect to="/profile"/>
      : <div>

        <div className={`middle ${s.gameContainer}`}>
          <Map cities={cities} gameOverCallback={gameOver}/>
        </div>
        {!startPopPanel ||
        <PopUpPanel text={`Pick a region you want to play at:`} confirmText={`Start`} declineText={`Cancel`}
                    onSuccess={loadCities} onDecline={exitGame} wDropdown={true} dropdownText={'Regions'}/>
        }
        {!finishPopPanel || <PopUpPanel text={`Do you want the game to continue?`} confirmText={`Yes`} declineText={`No`}
                                        onSuccess={continueGame} onDecline={quitGame}/>
        }
        {!gameOverPanel ||
        <PopUpPanel text={`Game is over with final score of ${finalScore} km!`} confirmText={`Retry`} declineText={`Thank you`}
                    onSuccess={retryCallBack} onDecline={quitCallBack} wDropdown={false}/>
        }
      </div>

  )
}

export default Game;