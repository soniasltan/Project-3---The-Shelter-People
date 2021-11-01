import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styled from "styled-components";

const LinkStyled = styled(Link)`
  text-decoration: none;
  color: black;
`;
function CatsList() {
  // For the cat data
  const [cats, setCats] = useState([]);
  // useeffect to get the cats data on render
  useEffect(() => {
    async function getCatsData() {
      await axios.get(`http://localhost:3000/api/cats/`).then((cat) => {
        setCats(cat.data.data);
      });
    }
    getCatsData();
  }, []);

  const deleteCat = (id) => {
    axios.delete(`http://localhost:3000/api/cats/${id}`);
  };

  const updateCat = (id) => {
    window.location.href = `/cats/update/${id}`;
  };

  return (
    <div>
      <p>Cats</p>
      {cats.map((element) => {
        return (
          <>
            <p key={element._id}>
              <LinkStyled to={`/cats/${element._id}`}>
                {element.name}
              </LinkStyled>
              <br />
              <button onClick={() => deleteCat(element._id)}>X</button>
              <button onClick={() => updateCat(element._id)}>update</button>
            </p>
          </>
        );
      })}
    </div>
  );
}

export default CatsList;
