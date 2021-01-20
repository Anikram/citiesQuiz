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
        <h1 className='py-5'>Greetings, {profile.user_name}! </h1>
        <h2 className='py-1'>Your best score is <span className={s.scoreSpan}>{profile.top_score}</span>cities so far!
        </h2>
        <h3 className='py-1'>Do you want to improve it?</h3>
        <Link to='/game'>
          <button className={sBtn.button + ' btn btn-info my-3'}>New game</button>
        </Link>
        <hr/>
        <div>
          <h3>Recent games:</h3>
          {games.map((g, i) => (
            <div className={s.gamePanel} key={i}>Cities guessed: <span>{g.score}</span> with <span>{g.distance}</span> km
              left! Played: {formatDate(g.created_at)} </div>))}
        </div>
      </div>


    </div>
    : <Redirect to='/'/>
};

export default Profile;