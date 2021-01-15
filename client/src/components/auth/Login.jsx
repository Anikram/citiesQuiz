import React, {Fragment, useState} from "react";
import {Link} from "react-router-dom";
import {toast} from "react-toastify";
import buttonStyle from "../common/formControls/Button/Button.module.css";
import LoginForm from "./LoginForm";

const Login = ({loginUser}) => {
  const onSubmitForm = async (formData) => {
    try {
      loginUser(formData.email, formData.password)
    } catch (err) {
      console.error(err.message)
    }

  }
  return <div className='middle'>
    <h1 className="text-center py-5">Login</h1>
    <LoginForm onSubmit={onSubmitForm}/>
    {/*<form onSubmit={onSubmitForm} className='col-4'>*/}
    {/*  <input onChange={onChange} value={email} type="email" name="email" placeholder="email"*/}
    {/*         className="form-control py-3"/>*/}
    {/*  <input onChange={onChange} value={password} type="password" name="password" placeholder="password"*/}
    {/*         className="form-control my-3"/>*/}
    {/*  <button className={"btn btn-success my-3 "+ buttonStyle.button}>Login</button>*/}
    {/*  <Link className={'btn btn-warning my-1 '+ buttonStyle.button} to='/register'>Register</Link>*/}
    {/*</form>*/}

  </div>;
};

export default Login;