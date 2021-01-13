import DefaultAvatar from '../../../assets/img/avatar-placeholder.png';
import s from './Avatar.module.css'
import React from 'react';

const Avatar = ({userAvatar}) => {
  return (
    <div className={s.avatarContainer}>
      <img className={s.avatarImage} src={ userAvatar || DefaultAvatar } alt=""/>
    </div>
  )
}

export default Avatar;