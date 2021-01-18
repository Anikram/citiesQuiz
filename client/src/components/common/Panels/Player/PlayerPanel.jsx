import React from 'react';
import s from './PlayerPanel.module.css';
import Avatar from "../../Avatar/Avatar";
import {Link} from "react-router-dom";

const PlayerPanel = ({name, avatarUrl}) => {
  return (
    <div className={s.playerPanel + ' my-2'}>
      <Link to='/profile'>
      <div className={s.playerAvatar}>
        <Avatar userAvatar={avatarUrl}/>
      </div>
      <div className={s.playerName}>
        <h2>{name}</h2>
      </div>
      </Link>
    </div>
  )
}

export default PlayerPanel;