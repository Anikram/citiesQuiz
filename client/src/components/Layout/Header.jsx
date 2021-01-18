import React, {Fragment, useEffect} from 'react';
import PlayerPanel from "../common/Panels/Player/PlayerPanel";
import s from "./Layout.module.css"
import style from "../common/formControls/Button/Button.module.css";
import {Link} from "react-router-dom";
import LogoutButton from "../common/formControls/Button/LogoutButton";

const Header = ({isAuthenticated, setAuth, profile, deleteToken}) => {
  const logoutUser = () => {
    deleteToken()
    setAuth(false)
  }

  useEffect(() => {
  }, [isAuthenticated])
  return (
    <header className={'header ' + s.header}>
      <div className={s.logo}>
        <Link to='/'><h1><span>C</span>ities Quiz</h1></Link>
      </div>
      <div className={s.headerActions}>
        {isAuthenticated
          ? <Fragment>
            <PlayerPanel name={`${profile.user_name}`}/>
            <div className={s.headerButtons}>
              <LogoutButton logoutUser={logoutUser}/>
            </div>
          </Fragment>
          : <div className='my-4'>
            <Link to='/login' className={style.button + ' btn btn-dark'}>Login</Link>
            <Link to='/register' className={style.button + ' btn btn-dark'}>Register</Link>
          </div>
        }
      </div>
    </header>
  )
}

export default Header;