import React from 'react';
import {Field, reduxForm} from "redux-form";
import buttonStyle from "../common/formControls/Button/Button.module.css";
import {Link} from "react-router-dom";
import {maxLengthCreator, minLengthCreator, required} from "../../utils/validators";
import Input from "../common/formControls/Input";

const maxLength30 = maxLengthCreator(30);
const minLength5 = minLengthCreator(5);

const RegisterForm = ({handleSubmit}) => {
  return (
    <form onSubmit={handleSubmit} className='col-4'>
      <div>
        <Field name={"name"} type={"text"} placeholder={"name"} component={Input} validate={[maxLength30,minLength5]}/>
      </div>
      <div>
        <Field name={"email"} type={"text"} placeholder={"email"} component={Input} validate={[required,maxLength30,minLength5]}/>
      </div>
      <div>
        <Field name={"password"} type={"password"} placeholder={"password"} component={Input} validate={[required,maxLength30,minLength5]}/>
      </div>
      <div>
        <button className={"btn btn-success my-3 "+ buttonStyle.button}>Register</button>
        <Link className={'btn btn-warning my-1 '+ buttonStyle.button} to='/login'>Login</Link>
      </div>
    </form>
  )
}

const RegisterReduxForm = reduxForm({
  form: 'register'
})(RegisterForm)

export default RegisterReduxForm;