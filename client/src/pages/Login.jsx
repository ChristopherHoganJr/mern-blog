import React, { useState } from "react";

const Login = () => {
  return (
    <>
      <h1>Login</h1>
      <form className='loginForm'>
        <div className='loginContainer'>
          <label htmlFor=''>Username:</label>
          <input type='text' placeholder='username' className='loginInput' />
        </div>
        <div className='loginContainer'>
          <label htmlFor=''>Password:</label>
          <input
            type='password'
            placeholder='password'
            className='loginInput'
          />
        </div>
        <button className='loginButton'>Login Account</button>
      </form>
    </>
  );
};

export default Login;
