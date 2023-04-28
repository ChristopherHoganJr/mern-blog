import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// contexts
import { UserContext } from "../../contexts/UserContext";

const LogoutButton = () => {
  const navigate = useNavigate();
  const { setCurrentUser } = useContext(UserContext);
  const logout = (e) => {
    e.preventDefault();
    axios
      .get("/api/user/logout", { withCredentials: true })
      .then(() => {
        setCurrentUser(null);
        navigate("/");
      })
      .catch((err) => console.log(err));
  };
  return (
    <button
      className='bg-red-200 rounded-md font-bold py-2 px-6'
      onClick={(e) => logout(e)}>
      Logout
    </button>
  );
};

export default LogoutButton;
