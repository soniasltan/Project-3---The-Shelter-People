import React, { useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function CatsUpdate() {
  const inputCatName = useRef();
  const inputCatDescription = useRef();
  const inputCatImage = useRef();
  const inputCatGender = useRef();
  const inputCatAdopt = useRef();
  const inputCatCage = useRef();

  let id = useParams();
  
  const handleUpdate = async () => {
    const name = inputCatName.current.value;
    const description = inputCatDescription.current.value;
    const image = inputCatImage.current.value;
    const gender = inputCatGender.current.value;
    const adoptable = inputCatAdopt.current.value;
    const cage = inputCatCage.current.value;

    const payload = { name, description, image, gender, adoptable, cage };

    await axios.put(`http://localhost:3000/api/cats/${id}`, payload).then((res) => {
      window.alert(`Cat updated successfully!`);
    });

  };

  return (
    <div>
      <p>In this page you'll see the form to update a cat</p>
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
      <input type="submit" onClick={handleUpdate} value="update cat" />
    </div>
  );
}

export default CatsUpdate;