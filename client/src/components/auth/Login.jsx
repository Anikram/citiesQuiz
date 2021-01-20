import React from "react";
import LoginForm from "./LoginForm";

const Login = ({loginUser}) => {
  const onSubmitForm = async (formData) => {
    try {
      loginUser(formData.email, formData.password)
    } catch (err) {
      console.error(err.message)
    }

  }
  return <div>
    <h1 className="text-center py-5">Login</h1>
    <LoginForm onSubmit={onSubmitForm}/>
  </div>;
};

export default Login;