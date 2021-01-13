import React from 'react';
import s from './PlayerPanel.module.css';
import Avatar from "../../Avatar/Avatar";

const PlayerPanel = ({name, avatarUrl}) => {
  return (
    <div className={s.playerPanel + ' my-2'}>
      <div className={s.playerAvatar}>
        <Avatar userAvatar={avatarUrl}/>
      </div>
      <div className={s.playerName}>
        <h2>{name}</h2>
      </div>
    </div>
  )
}

export default PlayerPanel;