import React from 'react';
import s from './Game.module.css';
import Map from "./Map/Map";

const Game = () => {
  return (
    <div className={`middle ${s.gameContainer}`}>
      <Map />
    </div>
  )
}

export default Game;