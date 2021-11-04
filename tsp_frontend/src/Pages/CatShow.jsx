import axios from "axios";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Link, useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import MDEditor from "@uiw/react-md-editor";

const Img = styled.img`
  border-radius: 80%;
  object-fit: cover;
`;

const Button = styled.button`
  font-family: "Spartan", sans-serif;
  font-weight: bold;
  padding: 10px;
  margin: 6px 2px;
  border: none;
  border-radius: 6px;
  box-sizing: border-box;
  cursor: pointer;
  font-size: 16px;
  background-color: #EFBE93;
  @media only screen and (max-width: 600px) {
    border: none;
    border-radius: 6px;
    box-sizing: border-box;
    cursor: pointer;
    font-size: 14px;
    position: relative;
  }
  &:hover {
    background-color: rgb(228, 228, 228);
  }
  &:active {
    background-color: grey};
  }
`;

const ContentBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  grid-area: content;
  align-items: center;
`;

const Content1 = styled.div`
  width: 500px;
  height: 100%;
`;

const Container = styled.div`
  width: 500px;
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
  // useeffect to get the cats data
  useEffect(() => {
    async function getCatData() {
      await axios.get(`/api/cats/${id.id}`).then((cat) => {
        setCat(cat.data.data);
      });
    }
    getCatData();
  }, []);

  return (
    <>
      <div>
        <ContentBox>
        <h1>{cat?.name}</h1>
        <Img src={cat?.image} alt={cat?.name} width="400px" height="400px" />
        <Content1>
        <h4>Description:</h4>
        <p> {cat?.description}</p>
        <h4>Gender:</h4><p>{cat?.gender}</p>
        <h4>Adoptable:</h4><p> {cat?.adoptable}</p>
        <h4>Cage:</h4><p> {cat?.cage}</p>
        </Content1>
        <Button onClick={() => catListPage()}>Back</Button>
        </ContentBox>
      </div>
      <div>
        <br />
      {(cat?.comments.length > 0) ? <h2>Comments</h2> : <></>}
      {cat?.comments?.map((element) => {
        return (
          <>
          <Container>
            <p key={element._id}>
              <hr />
              <MDEditor.Markdown
                source={`**` + element.username + `** *commented:*`}
              />
              <MDEditor.Markdown source={element.text} />
              <br />
              <hr />
            </p>
            </Container>
          </>
        );
      })}
      </div>
    </>
  );
}

export default CatShow;
