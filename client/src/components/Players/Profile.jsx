import React, {Fragment, useEffect} from "react";
import {toast} from "react-toastify";
import s from '../common/Button/Button.module.css'
import {Redirect} from "react-router-dom";

const Profile = ({setAuth, isAuthenticated, fetchProfile, profile,deleteToken}) => {

  useEffect(() => {
    getName()
    console.log(profile)
  },[])

  const onLogoutButtonClick = (e) => {
    e.preventDefault();
    deleteToken()
    setAuth(false)
    toast.success('Logged out successfully')
  }

  async function getName() {
    try {
      fetchProfile(localStorage.getItem("token"))
    } catch (err) {
      console.error(err.message)
    }
  }

  return <div className='middle'>
    <h1 className='py-5'>Hello, {profile.user_name}! </h1>
    <h2 className='py-3'>Your best score is {profile.top_score} so far!</h2>
    <h3 className='py-3'>Want to improve it?</h3>
    <button className={s.button + ' btn btn-info my-3'}>New game</button>

  </div>
};

export default Profile;