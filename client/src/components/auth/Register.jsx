import React from "react";
import RegisterReduxForm from "./RegisterForm";

const Register = ({registerUser}) => {

  const onSubmitForm = async (formData) => {
    const {email, password, name} = formData;
    try {
      registerUser(email, password, name)
    } catch (err) {
      console.error(err.message)
    }
  }

  return <div className='middle'>
    <h1 className="text-center py-5">Register</h1>
    <RegisterReduxForm onSubmit={onSubmitForm}/>
  </div>;
};

export default Register;