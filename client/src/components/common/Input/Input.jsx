import React, {useState} from 'react';
import s from './Input.module.css'

const Input = ({placeholderText, inputType, onKeyPressedCallback, ...props}) => {
  let [value, setValue] = useState('');

  const onButtonEnterPress = (e) => {
    // onKeyPressedCallback(e.target.value)
  }

  return (
    <input className={s.input}
           autoFocus={true}
           onChange={(e) =>  setValue(e.target.value)}
           // onKeyPress={onButtonEnterPress}
           type={inputType}
           placeholder={placeholderText}
           value={value}/>
  )
}

export default Input;