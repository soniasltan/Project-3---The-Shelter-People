import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";

const LinkStyled = styled(Link)`
  text-decoration: none;
  color: black;
`;
const Img = styled.img`
  border-radius: 50%;
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
      <h1>Cats</h1>
      {cats.map((element) => {
        return (
          <>
            <div class="cats">
              <p key={element._id}>
                <LinkStyled to={`/cats/${element._id}`}>
                  <Img
                    src={element.image}
                    alt={element.name}
                    width="100px"
                    height="100px"
                  />
                </LinkStyled>
                <br />
                {element.name}
                <br />
                <button onClick={() => deleteCat(element._id)}>X</button>
                <button onClick={() => updateCat(element._id)}>update</button>
              </p>
            </div>
          </>
        );
      })}
    </div>
  );
}

export default CatsList;