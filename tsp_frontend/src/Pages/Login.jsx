import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

function Login({ setAuth, setRole, setUsername }) {
  const [login, setLogin] = useState({});
  const history = useHistory();

  const handleUsernameChange = (event) => {
    const value = event.target.value;
    setLogin({ ...login, username: value });
  };

  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setLogin({ ...login, password: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await axios
      .post(`http://localhost:3000/api/login`, login)
      .then((res) => {
        if (res.data.success === true) {
          setAuth("Auth");
          setUsername(res.data.username);
          if (res.data.role === "Admin") {
            setRole("Admin");
          }
          history.push(`/`);
        }
      })
      .catch((err) => {
        console.log("err", err);
        alert(
          `Sorry, login failed! If you do not have an account, please sign up for one.`
        );
      });
  };

  return (
    <>
      <h1>Login</h1>
      <form>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={login.username}
            onChange={handleUsernameChange}
          ></input>
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={login.password}
            onChange={handlePasswordChange}
            minlength="6"
          ></input>
        </label>
        <input type="submit" onClick={handleSubmit} value="Submit" />
      </form>
    </>
  );
}

export default Login;
