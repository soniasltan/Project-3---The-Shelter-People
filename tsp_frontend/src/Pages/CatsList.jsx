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
const Div = styled.div`
  display: inline-flex;
  margin: 5px;
`;

function CatsList({ role }) {
  // For the cat data
  const [cats, setCats] = useState([]);
  let history = useHistory();
  // useeffect to get the cats data on render
  useEffect(() => {
    async function getCatsData() {
      await axios.get(`/api/cats/`).then((cat) => {
        setCats(cat.data.data);
      });
    }
    getCatsData();
  }, []);

  const deleteCat = (id) => {
    axios.delete(`/api/cats/${id}`);
    window.alert(`Goodbye cat :(`);
    setCats(cats.filter(cat=>cat._id !== id))
  };

  const updateCat = (id) => {
    history.push(`/cats/edit/${id}`);
  };

  return (
    <>
      <h1>Cats</h1>
      <div>
        {/* Only allow admin to make new cat */}
        {role === "Admin" && (
          <>
            <LinkStyled to="/cats/new">
              <button>Create Cat</button>
            </LinkStyled>
          </>
        )}
        {cats.map((element) => {
          return (
            <>
              <Div class="cats">
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
                  {/* Only allow delete/update if admin */}
                  {role === "Admin" && (
                    <>
                      <button onClick={() => updateCat(element._id)}>
                        Update
                      </button>
                      <button onClick={() => deleteCat(element._id)}>X</button>
                    </>
                  )}
                </p>
              </Div>
            </>
          );
        })}
      </div>
    </>
  );
}

export default CatsList;
