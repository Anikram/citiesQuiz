import React, {Fragment, useEffect} from "react";
import {toast} from "react-toastify";
import sBtn from '../common/formControls/Button/Button.module.css'
import s from './Players.module.css'
import {Link, Redirect} from "react-router-dom";

const Profile = ({isAuthenticated, fetchProfile, profile, deleteToken}) => {

  useEffect(() => {
    loadUserData()
  },[isAuthenticated])

  async function loadUserData() {
    try {
      fetchProfile(localStorage.getItem("token"))
    } catch (err) {
      console.error(err.message)
    }
  }

  return <div className='middle ml-5'>
    <h1 className='py-5'>Greetings, {profile.user_name}! </h1>
    <h2 className='py-1'>Your best score is <span className={s.scoreSpan}>{profile.top_score}</span> so far!</h2>
    <h3 className='py-1'>Do you want to improve it?</h3>
    <Link to='/game'><button className={sBtn.button + ' btn btn-info my-3'}>New game</button></Link>

  </div>
};

export default Profile;