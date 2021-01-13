import React from 'react';
import s from './Players.module.css';
import Avatar from "../common/Avatar/Avatar";
import Button from "../common/Button/Button";

const Player = ({name = 'placeholder', number = 1, score = '1234', avatarUrl}) => {
  return (
    <tr className={s.tr}>
      <td>
        <div className={s.playerAvaContainer}><Avatar/></div>
      </td>
      <td><span className={s.number}>{`${number}.`}</span></td>
      <td><span className={s.name}>{name}</span></td>
      <td><span className={s.score}>{score + ' km'}</span></td>
    </tr>
  )
}

const Players = () => {
  return (
    <div className={s.playersContainer + ' middle'}>
      <div className={s.playersPanel}>
        <div className={s.playersText}>
          <h1>Top score</h1>
          <div className={s.playersList}>
            <table className={s.table}>
              <tbody>
              <Player name='Tolik'/>
              <Player name='Lelik'/>
              <Player name='Bolik'/>
              <Player name='Golik'/>
              <Player name='Zolik'/>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className={s.actionDiv}>
        <Button side='right' text='New game'/>
      </div>
    </div>
  )
}

export default Players;