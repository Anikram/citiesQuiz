import React, {Fragment} from "react";
import buttonStyle from "./Button.module.css";
import {toast} from "react-toastify";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCoffee, faDoorClosed} from '@fortawesome/free-solid-svg-icons'

const LogoutButton = ({logoutUser}) => {
  const onLogoutButtonClick = (e) => {
    e.preventDefault();
    logoutUser()
    toast.success('Logged out successfully')
  }

  return (
    <button onClick={onLogoutButtonClick} className={"btn btn-warning " + buttonStyle.button}>L</button>
  )
}

export default LogoutButton;