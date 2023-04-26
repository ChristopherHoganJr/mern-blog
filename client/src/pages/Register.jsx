import React, { useState } from "react";
import axios from "axios";

const Register = () => {
  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  const submitRegister = (e) => {
    e.preventDefault();
    axios
      .post("/api/user/register", userInfo, { withCredentials: true })
      .then((user) => console.log(user))
      .catch((err) => {
        setErrors(err.response.data.errors);
        console.log(err);
      });
  };

  console.log(errors);
  return (
    <>
      <h1>Register</h1>
      <form className='loginForm' onSubmit={(e) => submitRegister(e)}>
        <div className='loginContainer'>
          <label htmlFor=''>Username:</label>
          <input
            type='text'
            placeholder='username'
            className='loginInput'
            value={userInfo.username}
            onChange={(e) =>
              setUserInfo({ ...userInfo, username: e.target.value })
            }
          />
          {errors?.username?.message ?? (
            <p className='loginError'>{errors?.username?.message}</p>
          )}
        </div>
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
          {errors?.email?.message ?? (
            <p className='loginError'>{errors?.email?.message}</p>
          )}
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
          {errors?.password?.message ?? (
            <p className='loginError'>{errors?.password?.message}</p>
          )}
        </div>
        <div className='loginContainer'>
          <label htmlFor=''>Confirm Password:</label>
          <input
            type='password'
            placeholder='confirm password'
            className='loginInput'
            value={userInfo.confirmPassword}
            onChange={(e) =>
              setUserInfo({ ...userInfo, confirmPassword: e.target.value })
            }
          />
          {errors?.confirmPassword?.message ?? (
            <p className='loginError'>{errors?.confirmPassword?.message}</p>
          )}
        </div>
        <button className='loginButton'>Register Account</button>
      </form>
    </>
  );
};

export default Register;
