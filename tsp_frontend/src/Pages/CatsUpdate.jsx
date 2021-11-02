import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

//Change to Controlled Form to repopulate the value

function CatsUpdate() {
  const { id } = useParams();
  const [catDetail, setCatDetail] = useState("");
  const [inputCatName, setInputCatName] = useState("");
  const [inputCatDescription, setInputCatDescription] = useState("");
  const [inputCatImage, setInputCatImage] = useState("");
  const [inputCatGender, setInputCatGender] = useState("");
  const [inputCatAdopt, setInputCatAdopt] = useState("");
  const [inputCatCage, setInputCatCage] = useState("");

  // get the cat data for the update form
  useEffect(() => {
    async function getCatData() {
      await axios.get(`http://localhost:3000/api/cats/${id.id}`).then((cat) => {
        setCatDetail(cat.data.data);
      });
    }
    getCatData();
  }, []);

  const handleUpdate = async () => {
    const name = inputCatName;
    const description = inputCatDescription;
    const image = inputCatImage;
    const gender = inputCatGender;
    const adoptable = inputCatAdopt;
    const cage = inputCatCage;

    const payload = { name, description, image, gender, adoptable, cage };

    await axios
      .put(`http://localhost:3000/api/cats/${id._id}`, payload)
      .then((res) => {
        window.alert(`Cat updated successfully!`);
      });
  };

  return (
    <div>
      <p>In this page you'll see the form to update a cat</p>
      <label>name:</label>
      <input type="text" value={catDetail.name} />
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
