import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";

const LinkStyled = styled(Link)`
  text-decoration: none;
  color: black;
`;
function CatsList() {
  // For the cat data
  const [cats, setCats] = useState([]);
  let history = useHistory();
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
    history.push(`/cats/list`);
  };

  const updateCat = (id) => {
    history.push(`/cats/edit/${id}`);
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
