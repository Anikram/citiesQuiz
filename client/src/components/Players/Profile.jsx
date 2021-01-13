import React, {Fragment, useState, useEffect} from "react";
import {toast} from "react-toastify";
import {Redirect} from "react-router-dom";

const Profile = ({setAuth, isAuthenticated, fetchProfile, profile,deleteToken}) => {
  const [name, setName] = useState('');

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

  return <Fragment>
    <h1 className='py-5'>Hello, {profile.user_name}! </h1>
    <button onClick={onLogoutButtonClick} className="btn btn-primary btn-block my-3">Logout</button>
  </Fragment>
};

export default Profile;