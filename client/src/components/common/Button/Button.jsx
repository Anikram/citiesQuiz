import s from './Button.module.css';
import React from 'react';

const Button = ({text, side}) => {
  return (
    <button className={'btn btn-dark ' + s.button + ' ' + (side === 'left' ? s.left : s.right)}>
      <p>{text}</p>
    </button>
  )
}

export default Button;