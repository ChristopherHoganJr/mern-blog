import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const loginAccount = (e) => {
    e.preventDefault();
    axios
      .post("/api/user/login", userInfo, { withCredentials: true })
      .then((user) => console.log(user))
      .catch((err) => console.log(err));
  };

  return (
    <>
      <h1>Login</h1>
      <form className='loginForm' onSubmit={(e) => loginAccount(e)}>
        <div className='loginContainer'>
          <label htmlFor=''>Email:</label>
          <input
            type='email'
            placeholder='email'
            className='loginInput'
            value={userInfo.email}
            onChange={(e) =>
              setUserInfo({ ...userInfo, email: e.target.value })
            }
          />
        </div>
        <div className='loginContainer'>
          <label htmlFor=''>Password:</label>
          <input
            type='password'
            placeholder='password'
            className='loginInput'
            value={userInfo.password}
            onChange={(e) =>
              setUserInfo({ ...userInfo, password: e.target.value })
            }
          />
        </div>
        <button className='loginButton'>Login Account</button>
      </form>
    </>
  );
};

export default Login;
