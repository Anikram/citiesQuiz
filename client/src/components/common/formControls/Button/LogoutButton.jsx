import React from "react";
import buttonStyle from "./Button.module.css";
import {toast} from "react-toastify";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faDoorOpen} from '@fortawesome/free-solid-svg-icons'

const LogoutButton = ({logoutUser}) => {
  const onLogoutButtonClick = (e) => {
    e.preventDefault();
    logoutUser()
    toast.success('Logged out successfully')
  }

  return (
    <button onClick={onLogoutButtonClick} className={"btn btn-warning " + buttonStyle.button}><FontAwesomeIcon
      icon={faDoorOpen}/></button>
  )
}

export default LogoutButton;