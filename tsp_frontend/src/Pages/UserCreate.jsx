import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

const Label = styled.label`
  margin: 5px;
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
  padding: 10px;
  margin: 6px 2px;
  border: 1px solid black;
  border-radius: 6px;
  box-sizing: border-box;
  cursor: pointer;
  font-size: 16px;
  background-color: #EFBE93;
  @media only screen and (max-width: 600px) {
    border: 1px solid black;
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

const addUser = async (user) => {
  console.log("user", user);
  await axios.post(`/api/users`, user);
};

function UserCreate() {
  const [user, setUser] = useState({});
  const history = useHistory();

  const handleEmailChange = (event) => {
    const value = event.target.value;
    setUser({ ...user, email: value });
  };

  const handleUsernameChange = (event) => {
    const value = event.target.value;
    setUser({ ...user, username: value });
  };

  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setUser({ ...user, password: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (user.password.length < 6) {
      alert("Password must be at least 6 characters long!");
    } else {
      addUser(user);
      alert(`New user ${user.username} created successfully!`);
      history.push("/login");
    }
  };

  return (
    <>
      <h1>Create New User</h1>
      <form onSubmit={handleSubmit}>
        <Label>
          Email:
          <Input
            type="email"
            name="email"
            value={user.email}
            onChange={handleEmailChange}
            required
          ></Input>
        </Label>
        <Label>
          Username:
          <Input
            type="text"
            name="username"
            value={user.username}
            onChange={handleUsernameChange}
            required
          ></Input>
        </Label>
        <Label>
          Password (min. 6 chars):
          <Input
            type="password"
            name="password"
            value={user.password}
            onChange={handlePasswordChange}
            required
          ></Input>
        </Label>
        <Button>Create User</Button>
      </form>
    </>
  );
}

export default UserCreate;
