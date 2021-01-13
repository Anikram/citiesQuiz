import React, {Fragment, useEffect} from "react";
import {toast} from "react-toastify";
import sBtn from '../common/Button/Button.module.css'
import s from './Players.module.css'
import {Redirect} from "react-router-dom";

const Profile = ({setAuth, isAuthenticated, fetchProfile, profile, deleteToken}) => {

  useEffect(() => {
    getName()
    console.log(profile)
  },[])

  async function getName() {
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
    <button className={sBtn.button + ' btn btn-info my-3'}>New game</button>

  </div>
};

export default Profile;