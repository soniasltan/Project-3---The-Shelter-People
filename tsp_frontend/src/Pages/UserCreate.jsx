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

const UserInfo = styled.div`
  display: flex;
  justify-contents: center;
  align-items: center;
  margin-bottom: 10px;
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
  margin: 8px 5px 0px 0px;
  padding: 4px;
`;

const Input = styled.input`
font-family: "Spartan", sans-serif;
padding: 3px 0px;
margin: 5px 5px;
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

const PasswordDescription = styled.p`
  font-size: 10px;
  margin: -2px 5px 0px 11px;
`;

const PasswordLabel = styled.label`
  margin: 11px 5px 0px 0px;
  padding: 4px;
`;

const PasswordInput = styled.input`
  font-family: "Spartan", sans-serif;
  padding: 3px 0px;
  margin: 7px 5px;
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
      <Form onSubmit={handleSubmit}>
        <UserInfo>
        <LabelContainer>
        <Label>
          Email:
        </Label>
        <Label>
          Username:
        </Label>
        <PasswordLabel>
          Password:
        </PasswordLabel>
        <PasswordDescription>(min. 6 chars)</PasswordDescription>
        </LabelContainer>
        <InputContainer>
          <Input
            type="email"
            name="email"
            value={user.email}
            onChange={handleEmailChange}
            required
          ></Input>
          <Input
            type="text"
            name="username"
            value={user.username}
            onChange={handleUsernameChange}
            required
          ></Input>
          <PasswordInput
            type="password"
            name="password"
            value={user.password}
            onChange={handlePasswordChange}
            required
          ></PasswordInput>
          </InputContainer>
        </UserInfo>
        <Button>Create User</Button>
      </Form>
    </>
  );
}

export default UserCreate;
