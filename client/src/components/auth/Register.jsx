import React, {Fragment, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {toast} from "react-toastify";
import buttonStyle from "../common/Button/Button.module.css";
import authAPI from "../../api/authAPI";

const Register = ({setAuth, registerUser}) => {
  const [inputs, setInputs] = useState({
    name: '',
    email: '',
    password: ''
  })

  const {email, name, password} = inputs;

  const onChange = (e) => {
    setInputs({...inputs,[e.target.name]: e.target.value})
  }

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      registerUser(email, password, name)
    } catch (err) {
      console.error(err.message)
    }

  }

  return <div className='middle'>
    <h1 className="text-center py-5">Register</h1>
    <form onSubmit={onSubmitForm} className='col-4'>
      <input className="form-control my-3" type="name" name="name" placeholder="name" value={name} onChange={onChange}/>
      <input className="form-control my-3" type="email" name="email" placeholder="email" onChange={onChange}/>
      <input className="form-control my-3" type="password" name="password" placeholder="password" onChange={onChange}/>
      <button className={"btn btn-success my-3 "+ buttonStyle.button} > Register </button>
      <Link className={'btn btn-warning my-1 '+ buttonStyle.button} to='/login'>Login</Link>
    </form>

  </div>;
};

export default Register;