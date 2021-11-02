import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";

//Change to Controlled Form to repopulate the value

function CatsUpdate() {
  const history = useHistory();
  const { id } = useParams();

  const [catDetail, setCatDetail] = useState({});
  // const [inputCatName, setInputCatName] = useState("");
  // const [inputCatDescription, setInputCatDescription] = useState("");
  // const [inputCatImage, setInputCatImage] = useState("");
  // const [inputCatGender, setInputCatGender] = useState("");
  // const [inputCatAdopt, setInputCatAdopt] = useState("");
  // const [inputCatCage, setInputCatCage] = useState("");

  // get the cat data for the update forms
  useEffect(() => {
    const getCatData = async (id) => {
      const url = `http://localhost:3000/api/cats/${id}`;
      const catData = await axios.get(url);
      setCatDetail(catData.data);
    };
    getCatData(id);
  }, [id]);

  // useEffect(() => {
  //   async function getCatData() {
  //     await axios.get(`http://localhost:3000/api/cats/${id}`).then((cat) => {
  //       setCatDetail(cat.data.data);
  //     });
  //   }
  //   getCatData();
  // }, []);

  const changeName = (event) => {
    const value = event.target.value;
    setCatDetail({ ...catDetail, Name: value });
  };

  const changeDescription = (event) => {
    const value = event.target.value;
    setCatDetail({ ...catDetail, Description: value });
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    // const name = inputCatName;
    // const description = inputCatDescription;
    // const image = inputCatImage;
    // const gender = inputCatGender;
    // const adoptable = inputCatAdopt;
    // const cage = inputCatCage;

    // const catDetail = { name, description, image, gender, adoptable, cage };
      await axios.put(`http://localhost:3000/api/cats/${catDetail._id}`, catDetail)
      .then((res) => {
        window.alert(`Cat updated successfully!`);
        history.push(`/cats/list`);
      });
  };

// await axios.put(`http://localhost:3000/api/cats/${catDetail._id}`, catDetail)
// .then((res) => {
//   window.alert(`Cat updated successfully!`);
//   history.push(`/cats/list`);
// });
// };
// }

  return (
    <div>
      <p>In this page you'll see the form to update a cat</p>
      <form onSubmit={handleUpdate}>
      <label>Name:</label>
      <input
        type="text"
        placeholder="name"
        value={catDetail.name}
        onChange={changeName}
      />
      <label>Description:</label>
      <input
        type="textarea"
        placeholder="description"
        value={catDetail.description}
        onChange={changeDescription}
      />
      <label>Image:</label>
      <input
        type="text"
        placeholder="imageURL"
        value={catDetail.image}
      />
      <label>Gender:</label>
      <select value={catDetail.gender}>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Unknown">Unknown</option>
      </select>
      <label>Adopt:</label>
      <select value={catDetail.adoptable}>
        <option value="Yes">Yes</option>
        <option value="No">No</option>
      </select>
      <label>Cage:</label>
      <select value={catDetail.cage}>
        <option value="6/7">6/7</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="8">8</option>
        <option value="9">9</option>
      </select>
      <button>Update Cat</button>
      <button href={'/cats/list'}>Cancel</button>
      </form>
    </div>
  );
}

export default CatsUpdate;