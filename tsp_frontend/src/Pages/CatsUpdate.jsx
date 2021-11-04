import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
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

const DescriptionLabel = styled.label`
  margin: 40px 5px 43px 5px;
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

const DescriptionInput = styled.textarea`
font-family: "Spartan", sans-serif;
  height: 90px;
  resize: none;
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

function CatsUpdate({ role, auth }) {
  const history = useHistory();
  const { id } = useParams();
  const [updateCatDetail, setUpdateCatDetail] = useState({
    name: "",
    description: "",
    image: "",
    gender: "",
    cage: "",
    adoptable: "",
  });

  // get the cat data for the update form to prepopulate the values
  useEffect(() => {
    async function getCatData() {
      await axios.get(`/api/cats/${id}`).then((cat) => {
        setUpdateCatDetail({
          gender: cat.data.data.gender,
          name: cat.data.data.name,
          description: cat.data.data.description,
          image: cat.data.data.image,
          adoptable: cat.data.data.adoptable,
          cage: cat.data.data.cage,
        });
      });
    }
    getCatData();
  }, []);

  //for every change in cat details, update the state
  const handleChange = (event) => {
    const name = event.target.name;
    setUpdateCatDetail({ ...updateCatDetail, [name]: event.target.value });
  };

  // update on clicking update Button
  const handleUpdate = async (event) => {
    event.preventDefault();
    if (role === "Admin" && auth === "Auth") {
      await axios.put(`/api/cats/${id}`, updateCatDetail).then((res) => {
        window.alert(`Cat updated successfully!`);
      });
      history.push(`/cats/list`);
    } else {
      window.alert(`Sorry, only Admin can update cats!`);
      history.push(`/cats/list`);
    }
  };

  return (
    <>
      <h1>Update Cat Details</h1>
      <Form onSubmit={handleUpdate}>
        <CatInfo>
        <LabelContainer>
        <Label>Name:</Label>
        <DescriptionLabel>Description:</DescriptionLabel>
        <Label>Image URL:</Label>
        <Label>Gender:</Label>
        <Label>Adoptable:</Label>
        <Label>Cage:</Label>
        </LabelContainer>
        <InputContainer>
        <Input
          type="text"
          name="name"
          minLength="2"
          value={updateCatDetail.name}
          onChange={(event) => handleChange(event)}
          required
        />
        <DescriptionInput
          type="textarea"
          name="description"
          minLength="1"
          value={updateCatDetail.description}
          onChange={(event) => handleChange(event)}
          required
        />
        <Input
          type="text"
          name="image"
          minLength="5"
          value={updateCatDetail.image}
          onChange={(event) => handleChange(event)}
        />
        <Select name="gender" onChange={(event) => handleChange(event)}>
          <option value={updateCatDetail.gender} selected disabled hidden>
            {updateCatDetail.gender}
          </option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Unknown">Unknown</option>
        </Select>
        <Select name="adoptable" onChange={(event) => handleChange(event)}>
          <option value={updateCatDetail.adoptable} selected disabled hidden>
            {updateCatDetail.adoptable}
          </option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </Select>
        <Select name="cage" onChange={(event) => handleChange(event)}>
          <option value={updateCatDetail.cage} selected disabled hidden>
            {updateCatDetail.cage}
          </option>
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
        <Button type="submit" value="Update Cat">
          Update Cat
        </Button>
        <Button href={"/cats/list"}>Cancel</Button>
      </Form>
    </>
  );
}

export default CatsUpdate;
