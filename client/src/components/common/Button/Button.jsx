import s from './Button.module.css';
import React from 'react';

const Button = ({text = 'default', side, cb, value}) => {
  return (
    <button onClick={() => cb(value)} className={'btn btn-dark ' + s.button + ' ' + (side === 'left' ? s.left : s.right)}>{text}</button>
  )
}

export default Button;