import React, { useRef } from "react";
import axios from "axios";

function CatsCreate() {
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
    // get the cat information from the form
    const name = inputCatName.current.value;
    const description = inputCatDescription.current.value;
    const image = inputCatImage.current.value;
    const gender = inputCatGender.current.value;
    const adoptable = inputCatAdopt.current.value;
    const cage = inputCatCage.current.value;
    // const catsName = event.target.catsName.value;
    // addCats(catsName);
    const catInformation = { name, description, image, gender, adoptable, cage };
    await axios.post(`http://localhost:3000/api/cats/`, catInformation).then((res) => {
      window.alert(`Cat created successfully!`);
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>name:</label>
        <input type="text" ref={inputCatName} />
        <label>description:</label>
        <input type="text" ref={inputCatDescription} />
        <label>image:</label>
        <input type="text" ref={inputCatImage} />
        <label>gender:</label>
        <select ref={inputCatGender}>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Unknown">Unknown</option>
        </select>
        <label>adopt:</label>
        <select ref={inputCatAdopt}>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
        <label>cage:</label>
        <select ref={inputCatCage}>
          <option value="6/7">6/7</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="8">8</option>
          <option value="9">9</option>
        </select>
        <button>Create New Cat</button>
      </form>
    </>
  );
}

export default CatsCreate;
