import React from 'react';
import s from './Input.module.css'

const Input = ({input, meta, ...props}) => {

  const hasError = (meta.error && meta.touched);

  return (
    <div>
      <div>
        <input {...input} {...props} className={"form-control mt-4"}/>
        { hasError && <span>{meta.error}</span>}
      </div>


    </div>

  )
}

export default Input;