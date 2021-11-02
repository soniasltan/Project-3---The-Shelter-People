import axios from "axios";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Link, useHistory, useParams } from "react-router-dom";
import styled from "styled-components";

const LinkStyled = styled(Link)`
  text-decoration: none;
  color: black;
`;
const Img = styled.img`
  border-radius: 50%;
`;

function CatShow() {
  let id = useParams();
  let history = useHistory();
  // For the cat data
  const [cat, setCat] = useState();
  // handle function to return user to cat list page
  const catListPage = () => {
    history.push(`/cats/list`);
  };
  // useeffect to get the cats data on render
  useEffect(() => {
    async function getCatData() {
      await axios.get(`http://localhost:3000/api/cats/${id.id}`).then((cat) => {
        setCat(cat.data.data);
      });
    }
    getCatData();
  }, []);

  return (
    <>
      <div>
        <h1>{cat?.name}</h1>
        <Img src={cat?.image} alt={cat?.name} width="400px" height="400px" />
        <p>Description: {cat?.description}</p>
        <p>Gender: {cat?.gender}</p>
        <p>Adoptable: {cat?.adoptable}</p>
        <p>Cage: {cat?.cage}</p>
        <button onClick={() => catListPage()}>Back</button>
      </div>
    </>
  );
}

export default CatShow;
