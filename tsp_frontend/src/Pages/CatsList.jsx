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

const CatCreateBtn = styled(Link)`
  text-decoration: none;
  outline: none;
  border: none;
`;

const Button = styled.button`
  font-family: "Spartan", sans-serif;
  font-weight: bold;
  margin-bottom: 10px;
  border-radius: 30px;
  background-color: #EFBE93;
  color: #000;
  padding: 10px 25px;
  font-size: 18px;
  outline: none;
  cursor: pointer;
  border: none;
  transition: all 0.5s ease;

  &:hover {
    background-color: rgb(228, 228, 228);
  }
  &:active {
    background-color: grey};
  }

  @media only screen and (max-width: 1000px) {
    /* width: 100%; */
    padding: 10px 25px;
  }
  @media only screen and (max-width: 375px) {
    padding: 10px 25px;
    font-size: 16px;
  }
`;

const Div = styled.div`
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
            <CatCreateBtn to="/cats/new">
              <Button>Create Cat</Button>
            </CatCreateBtn>
          </>
        )}
        <CatWrapper>
          {cats.map((element) => {
            return (
              <>
                <Div class="cats">
                  <Tilt key={element._id}>
                    <CardWrapper>
                      <Link to={`/cats/${element._id}`}>
                        <CardImage src={element.image} />
                      </Link>
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
