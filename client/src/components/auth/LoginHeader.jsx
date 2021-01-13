import React, {Fragment, useState} from "react";
import {Link} from "react-router-dom";
import {toast} from "react-toastify";
import buttonStyle from "../common/Button/Button.module.css";

const LoginHeader = ({setAuth}) => {
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

    const response = await fetch("http://localhost:5000/auth/login", {
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(body)
    })

    const parseRes = await response.json()

    if (parseRes.token) {
      localStorage.setItem("token", parseRes.token)
      setAuth(true);
      toast.success("Logged in successfully!")
    } else {
      console.log(parseRes)
      setAuth(false);
      if (parseRes.errors) {
        parseRes.errors.map(e => {
          toast.error(`${e.param} has ${e.msg}`)
        })
      } else {
        toast.error(parseRes)
      }
    }
  }
  return <Fragment>
    <form onSubmit={onSubmitForm} >
      <input onChange={onChange} value={email} type="email" name="email" placeholder="email"
             className="form-control"/>
      <input onChange={onChange} value={password} type="password" name="password" placeholder="password"
             className="form-control"/>
      <button className={"btn btn-success"+ buttonStyle.button}>Submit</button>
      <Link className={'btn btn-warning'+ buttonStyle.button} to='/register'>Register</Link>
    </form>

  </Fragment>;
};

export default LoginHeader;