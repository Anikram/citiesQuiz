import React, {useEffect} from 'react';
import s from './Players.module.css';
import Avatar from "../common/Avatar/Avatar";
import sBtn from "../common/formControls/Button/Button.module.css";
import {Link} from "react-router-dom";

const Player = ({name = 'placeholder', score = '1234', avatarUrl}) => {
  return (
    <tr className={s.tr}>
      <td>
        <div className={s.playerAvaContainer}><Avatar/></div>
      </td>
      <td><span className={s.name}>{name}</span></td>
      <td><span className={s.score}>{score}</span></td>
    </tr>
  )
}

const Players = ({profile, fetchTopUsers, fetchProfile, users, isAuth}) => {
  useEffect(() => {
    getName()
    fetchTopUsers()
  }, [isAuth])

  function getName() {
    try {
      fetchProfile(localStorage.getItem("token"))
    } catch (err) {
      console.error(err.message)
    }
  }

  return (
    <div className={s.playersContainer}>
      <div className={s.playersPanel}>
        <div className={s.playersText}>
          <h1>Top score</h1>
          <div className={s.playersList}>
            <table className={s.table}>
              <tbody>
              {
                users.map(u => {
                  return <Player key={u.user_name} name={u.user_name} score={u.top_score}/>
                })
              }
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className={s.actionDiv}>
        {!isAuth || <Link to='/game'>
          <button className={sBtn.button + ' btn btn-info my-3'}>New game</button>
        </Link>}
      </div>
    </div>
  )
}

export default Players;