import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import {
  CardWrapper,
  CardImage,
  CardTextWrapper,
  CardTextTitle,
  CardStatWrapper,
  CardStats,
  LinkText,
} from "../Components/CatCardStyle";
import Tilt from "react-parallax-tilt";

const LinkStyled = styled(Link)`
  text-decoration: none;
  color: black;
`;

// const Img = styled.img`
//   border-radius: 50%;
// `;
const Div = styled.div`
  display: inline-flex;
  margin: 5px;
`;
const CatWrapper = styled.div`
width: 80%;
margin: 5px auto;
display: flex;
flex-wrap: wrap;
justify-content: space-around;
`;
const ContentContainer = styled.div`
display: flex;
flex-direction: column;
align-items: center;
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
    setCats(cats.filter((cat) => cat._id !== id));
  };

  const updateCat = (id) => {
    history.push(`/cats/edit/${id}`);
  };

  return (
    <>
      <h1>Cats</h1>
      <ContentContainer>
        {/* Only allow admin to make new cat */}
        {role === "Admin" && (
          <>
            <LinkStyled to="/cats/new">
              <button>Create Cat</button>
            </LinkStyled>
          </>
        )}
        <CatWrapper >
        {cats.map((element) => {
          return (
            <>
              <Div class="cats">
                <Tilt key={element._id}>
                  <CardWrapper>
                      <CardImage background={element.image}>
                      <Link to={`/cats/${element._id}`} />
                        </CardImage>
                    <CardTextWrapper>
                      <CardTextTitle>{element.name}</CardTextTitle>
                    </CardTextWrapper>
                    {role === "Admin" && (
                      <>
                        <CardStatWrapper>
                          <CardStats>
                            <LinkText onClick={() => updateCat(element._id)}>
                              Update
                            </LinkText>
                          </CardStats>
                          <CardStats>
                            <LinkText onClick={() => deleteCat(element._id)}>
                              X
                            </LinkText>
                          </CardStats>
                        </CardStatWrapper>
                      </>
                    )}
                  </CardWrapper>
                </Tilt>
                {/* <p key={element._id}>
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
                {/* {role === "Admin" && (
                    <>
                      <button onClick={() => updateCat(element._id)}>
                        Update
                      </button>
                      <button onClick={() => deleteCat(element._id)}>X</button>
                    </>
                  )}
                </p> */}
              </Div>
            </>
          );
        })}
        </CatWrapper>
      </ContentContainer>
    </>
  );
}

export default CatsList;
