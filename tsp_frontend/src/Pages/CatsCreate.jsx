import React, { useRef } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Label = styled.label`
  margin: 7px 5px 8px 5px;
`;

const CatInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;
`;

const LabelContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin-top: 2.5px;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
font-family: "Spartan", sans-serif;
  margin: 5px;
  padding: 2px;
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
`;

const Select = styled.select`
  margin: 5px;
  border-radius: 6px;
  padding: 2px;
  cursor: pointer;
  font-family: "Spartan", sans-serif;
`;

const Button = styled.button`
  font-family: "Spartan", sans-serif;
  font-weight: bold;
  padding: 10px;
  margin: 7px 2px;
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

function CatsCreate({ role, auth }) {
  let history = useHistory();
  ///////////////////////// useRef for uncontrolled form //////////////////////////////////
  const inputCatName = useRef();
  const inputCatDescription = useRef();
  const inputCatImage = useRef();
  const inputCatGender = useRef();
  const inputCatAdopt = useRef();
  const inputCatCage = useRef();
  ///////////////////////// useRef for uncontrolled form //////////////////////////////////

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (role === "Admin" && auth === "Auth") {
      // get the cat information from the form
      const name = inputCatName.current.value;
      const description = inputCatDescription.current.value;
      const image = inputCatImage.current.value;
      const gender = inputCatGender.current.value;
      const adoptable = inputCatAdopt.current.value;
      const cage = inputCatCage.current.value;
      const catInformation = {
        name,
        description,
        image,
        gender,
        adoptable,
        cage,
      };
      console.log(catInformation);
      await axios.post(`/api/cats/`, catInformation).then((res) => {
        window.alert(`Cat created successfully!`);
        history.push(`/cats/list`);
      });
    } else {
      window.alert(`Sorry, only Admin can create cats!`);
      history.push(`/cats/list`);
    }
  };

  // for redirecting back
  const handleCancel = () => {
    history.push(`/cats/list`);
  };

  return (
    <>
      <h1>Create New Cat</h1>
      <Form onSubmit={handleSubmit}>
        <CatInfo>
        <LabelContainer>
        <Label>Name:</Label>
        <Label>Description:</Label>
        <Label>Image url:</Label>
        <Label>Gender:</Label>
        <Label>Adoptable:</Label>
        <Label>Cage:</Label>
        </LabelContainer>
        <InputContainer>
        <Input type="text" ref={inputCatName} minLength="2" required />
        <Input type="text" ref={inputCatDescription} minLength="1" required />
        <Input type="url" ref={inputCatImage} minLength="5" />
        <Select ref={inputCatGender}>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Unknown">Unknown</option>
        </Select>
        <Select ref={inputCatAdopt}>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </Select>
        <Select ref={inputCatCage}>
          <option value="6/7">6/7</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="8">8</option>
          <option value="9">9</option>
        </Select>
        </InputContainer>
        </CatInfo>
        <Button>Create New Cat</Button>
        <Button onClick={handleCancel}>Cancel</Button>
      </Form>
    </>
  );
}

export default CatsCreate;
