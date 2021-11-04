import axios from "axios";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Link, useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import MDEditor from "@uiw/react-md-editor";

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
        <h1>{cat?.name}</h1>
        <Img src={cat?.image} alt={cat?.name} width="auto" height="400px" />
        <p>Description: {cat?.description}</p>
        <p>Gender: {cat?.gender}</p>
        <p>Adoptable: {cat?.adoptable}</p>
        <p>Cage: {cat?.cage}</p>
        <button onClick={() => catListPage()}>Back</button>
      </div>
      {(cat?.comments.length > 0) ? <h3>Comments</h3> : <></>}
      {cat?.comments?.map((element) => {
        return (
          <>
            <p key={element._id}>
              <hr />
              <MDEditor.Markdown
                source={`**` + element.username + `** *commented:*`}
              />
              <MDEditor.Markdown source={element.text} />
              <br />
              <hr />
            </p>
          </>
        );
      })}
    </>
  );
}

export default CatShow;
