import React, {Fragment, useState} from "react";
import {Link} from "react-router-dom";
import {toast} from "react-toastify";
import buttonStyle from "../common/Button/Button.module.css";

const Login = ({setAuth, loginUser}) => {
  const [inputs, setInputs] = useState({
    email: '',
    password: ''
  })

  const {email, password} = inputs;

  const onChange = (e) => {
    setInputs({...inputs, [e.target.name]: e.target.value})
  }

  const onSubmitForm = async (e) => {
    e.preventDefault();
    const body = {email, password}
    loginUser(body)
  }
  return <div className='middle'>
    <h1 className="text-center py-5">Login</h1>
    <form onSubmit={onSubmitForm} className='col-4'>
      <input onChange={onChange} value={email} type="email" name="email" placeholder="email"
             className="form-control py-3"/>
      <input onChange={onChange} value={password} type="password" name="password" placeholder="password"
             className="form-control my-3"/>
      <button className={"btn btn-success my-3 "+ buttonStyle.button}>Login</button>
      <Link className={'btn btn-warning my-1 '+ buttonStyle.button} to='/register'>Register</Link>
    </form>

  </div>;
};

export default Login;