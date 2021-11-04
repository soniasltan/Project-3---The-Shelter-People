import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-contents: center;
  align-items: center;
`;

const LoginInfo = styled.div`
  display: flex;
  justify-contents: center;
  align-items: center;
`;

const LabelContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 2px;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin: 4px 5px;
  padding: 4px;
`;

const Input = styled.input`
  font-family: "Spartan", sans-serif;
  margin: 5px;
  border: 1px solid black;
  border-radius: 6px;
  box-sizing: border-box;
  cursor: pointer;
  font-size: 16px;
  @media only screen and (max-width: 600px) {
    border: 1px solid black;
    border-radius: 6px;
    box-sizing: border-box;
    cursor: pointer;
    font-size: 14px;
    position:relative;
}
  }
`;

const Button = styled.button`
  font-family: "Spartan", sans-serif;
  font-weight: bold;
  padding: 10px;
  margin: 6px 2px;
  border: none;
  border-radius: 6px;
  box-sizing: border-box;
  cursor: pointer;
  font-size: 16px;
  background-color: #EFBE93;
  @media only screen and (max-width: 600px) {
    border: none;
    border-radius: 6px;
    box-sizing: border-box;
    cursor: pointer;
    font-size: 14px;
    position: relative;
  }
  &:hover {
    background-color: rgb(228, 228, 228);
  }
  &:active {
    background-color: grey};
  }
`;

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
      .post(`/api/login`, login)
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
      <Form>
        <LoginInfo>
        <LabelContainer>
          <Label>Username:</Label>
          <Label>Password:</Label>
        </LabelContainer>
        <InputContainer>
          <Input
            type="text"
            name="username"
            value={login.username}
            onChange={handleUsernameChange}
          />
          <Input
            type="password"
            name="password"
            value={login.password}
            onChange={handlePasswordChange}
            minlength="6"
          />
        </InputContainer>
        </LoginInfo>
        <Button type="submit" onClick={handleSubmit}>
          Submit
        </Button>
      </Form>
    </>
  );
}

export default Login;
