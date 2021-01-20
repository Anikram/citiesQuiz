import React, {useEffect} from "react";
import sBtn from '../common/formControls/Button/Button.module.css'
import s from './Players.module.css'
import {Link, Redirect} from "react-router-dom";
import {formatDate} from "../../utils/helpers";

const Profile = ({isAuthenticated, fetchProfile, profile, games, getGames}) => {

  useEffect(() => {
    console.log('render profile')
    loadUserData()
  }, [profile.token])

  function loadUserData() {
    try {
      getGames(profile.user_id)
      fetchProfile(localStorage.getItem("token"))
    } catch (err) {
      console.error(err.message)
    }
  }

  return isAuthenticated ? <div className={s.playersContainer}>
      <div className={s.profileContainer}>
        <h1>Greetings, {profile.user_name}! </h1>
        {games.length
          ? <><h2>Your best score is <span className={s.scoreSpan}>{profile.top_score}</span>cities so far!</h2>
            <h3>Do you want to improve it?</h3></>
          : <><h2>Yoo haven't played yet? It's worth trying! ;-)</h2> <h2>Click New game to start.</h2></>}

        <Link to='/game'>
          <button className={sBtn.button + ' btn btn-info my-3'}>New game</button>
        </Link>

        {games.length ? <div>
          <hr/>
          <hr/>
          <h3>Recent games:</h3>
          {games.map((g, i) => (
            <div className={s.gamePanel} key={i}>
              <div className={g.win ? s.gameResultW : s.gameResultL}>{g.win ? 'W' : 'L'}</div>
              Cities guessed: <span>{g.score}</span> with <span>{g.distance}</span> km
              left! Played: {formatDate(g.created_at)}
              <hr/></div>))}
        </div> : <div>

        </div>}
      </div>


    </div>
    : <Redirect to='/'/>
};

export default Profile;