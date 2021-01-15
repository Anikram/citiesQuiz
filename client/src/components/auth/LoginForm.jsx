import React from 'react';
import {Field, reduxForm} from "redux-form";
import {Link} from "react-router-dom";
import buttonStyle from "../common/formControls/Button/Button.module.css";
import {maxLengthCreator, minLengthCreator, required} from "../../utils/validators";
import Input from "../common/formControls/Input";
import formStyle from '../common/formControls/Input.module.css'

const maxLength30 = maxLengthCreator(30);
const minLength5 = minLengthCreator(5);

const LoginForm = (props) => {

  return (
    <form onSubmit={props.handleSubmit} className='col-4'>
      <div>
        <Field name={"email"} type={"text"} placeholder={"email"} component={Input}
               validate={[required,maxLength30,minLength5]}/>
      </div>
      <div>
        <Field name={"password"} type={"password"} placeholder={"password"} component={Input}
               className="form-control my-3" validate={[required,maxLength30,minLength5]}/>
      </div>
      {props.error && <div className={formStyle.formError}>
        {props.error}
      </div>}
      <div>
        <button className={"btn btn-success my-3 " + buttonStyle.button}>Login</button>
        <Link className={'btn btn-warning my-1 ' + buttonStyle.button} to='/register'>Register</Link>
      </div>
    </form>
  )
}

const LoginReduxFrom = reduxForm({
  form: 'login'
})(LoginForm)

export default LoginReduxFrom;