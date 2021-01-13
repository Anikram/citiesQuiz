import React, {Fragment} from 'react';
import PlayerPanel from "../common/Panels/Player/PlayerPanel";
import s from "./Layout.module.css"
import style from "../common/Button/Button.module.css";
import {Link} from "react-router-dom";
import LogoutButton from "../common/Button/LogoutButton";

const Header = ({isAuthenticated, setAuth, profile,deleteToken}) => {
  const logoutUser = () => {
    deleteToken()
    setAuth(false)
  }
  return (
    <header className={'header ' + s.header}>
      <div>
        <Link to='/'><h1><span>C</span>ities Quiz</h1></Link>
      </div>
      <div>

      </div>
      <div>
        {isAuthenticated
          ? <Fragment>
            <Link to='/profile'><PlayerPanel name={`${profile.user_name}`}/></Link>
            <LogoutButton logoutUser={logoutUser}/>
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