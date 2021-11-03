import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import styled from "styled-components";

const Label = styled.label`
  margin: 5px;
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
      await axios.get(`http://localhost:3000/api/cats/${id}`).then((cat) => {
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

  // update on clicking update button
  const handleUpdate = async (event) => {
    event.preventDefault();
    if (role === "Admin" && auth === "Auth") {
      await axios
        .put(`http://localhost:3000/api/cats/${id}`, updateCatDetail)
        .then((res) => {
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
      <form onSubmit={handleUpdate}>
        <Label>Name:</Label>
        <input
          type="text"
          name="name"
          minLength="2"
          value={updateCatDetail.name}
          onChange={(event) => handleChange(event)}
        />
        <br />
        <Label>Description:</Label>
        <input
          type="textarea"
          name="description"
          minLength="1"
          size="2em"
          value={updateCatDetail.description}
          onChange={(event) => handleChange(event)}
        />
        <br />
        <Label>Image url:</Label>
        <input
          type="text"
          name="image"
          minLength="5"
          value={updateCatDetail.image}
          onChange={(event) => handleChange(event)}
        />
        <br />
        <Label>Gender:</Label>
        <select name="gender" onChange={(event) => handleChange(event)}>
          <option value={updateCatDetail.gender} selected disabled hidden>
            {updateCatDetail.gender}
          </option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Unknown">Unknown</option>
        </select>
        <br />
        <Label>Adoptable:</Label>
        <select name="adoptable" onChange={(event) => handleChange(event)}>
          <option value={updateCatDetail.adoptable} selected disabled hidden>
            {updateCatDetail.adoptable}
          </option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
        <br />
        <Label>Cage:</Label>
        <select name="cage" onChange={(event) => handleChange(event)}>
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
        </select>
        <br />
        <button type="submit" value="Update Cat">
          Update Cat
        </button>
        <br />
        <button href={"/cats/list"}>Cancel</button>
      </form>
    </>
  );
}

export default CatsUpdate;
