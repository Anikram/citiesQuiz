import React, {useEffect} from 'react';
import s from './Players.module.css';
import Avatar from "../common/Avatar/Avatar";
import Button from "../common/Button/Button";
import {toast} from "react-toastify";

const Player = ({name = 'placeholder', score = '1234', avatarUrl}) => {
  return (
    <tr className={s.tr}>
      <td>
        <div className={s.playerAvaContainer}><Avatar/></div>
      </td>
      <td><span className={s.name}>{name}</span></td>
      <td><span className={s.score}>{score + ' km'}</span></td>
    </tr>
  )
}

const Players = ({profile,fetchTopUsers, fetchProfile, users}) => {

  useEffect(() => {
    getName()
    console.log(profile)
    fetchTopUsers()
  },[])

  async function getName() {
    try {
      fetchProfile(localStorage.getItem("token"))
    } catch (err) {
      console.error(err.message)
    }
  }
  return (
    <div className={s.playersContainer + ' middle'}>
      <div className={s.playersPanel}>
        <div className={s.playersText}>
          <h1>Top score</h1>
          <div className={s.playersList}>
            <table className={s.table}>
              <tbody>
              {
                users.map(u => {
                  return <Player name={u.user_name} score={u.top_score}/>
                })
              }
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