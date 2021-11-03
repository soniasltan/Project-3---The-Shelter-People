import React, { useRef } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

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
      await axios
        .post(`/api/cats/`, catInformation)
        .then((res) => {
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
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text" ref={inputCatName} minLength="2" />
        <br />
        <label>Description:</label>
        <input type="text" ref={inputCatDescription} minLength="1" />
        <br />
        <label>Image url:</label>
        <input type="url" ref={inputCatImage} minLength="5" />
        <br />
        <label>Gender:</label>
        <select ref={inputCatGender}>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Unknown">Unknown</option>
        </select>
        <br />
        <label>Adoptable:</label>
        <select ref={inputCatAdopt}>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
        <br />
        <label>Cage:</label>
        <select ref={inputCatCage}>
          <option value="6/7">6/7</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="8">8</option>
          <option value="9">9</option>
        </select>
        <br />
        <button>Create New Cat</button>
        <br />
        <button onClick={handleCancel}>Cancel</button>
      </form>
    </>
  );
}

export default CatsCreate;
