import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import MDEditor from "@uiw/react-md-editor";

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

const Container = styled.div`
  width: 500px;
`;

function CommentUpdate() {
  let id = useParams();
  let history = useHistory();
  const [value, setValue] = useState("");
  const [catid, setCatID] = useState("");

  // handle function to return user to cat page
  const catPage = () => {
    history.push(`/cats/${catid}`);
  };

  // handle function for updating comment
  const updateComment = async () => {
    await axios
      .put(`/api/comments/${id.id}`, {
        text: value,
      })
      .then((res) => {
        window.alert(`Comment updated!`);
      });
    history.push(`/cats/${catid}`);
  };

  // useeffect to get the comment data
  useEffect(() => {
    async function getCommentData() {
      await axios.get(`/api/comments/${id.id}`).then((comment) => {
        setValue(comment.data.data.text);
        setCatID(comment.data.data.cat_id);
      });
    }
    getCommentData();
  }, []);

  return (
    <>
      <div>
        <Container>
        <h3>Edit Comment</h3>
        <MDEditor value={value} onChange={setValue} />
        </Container>
      </div>
      <Button onClick={() => updateComment()}>Update</Button>
      <Button onClick={() => catPage()}>Back</Button>
    </>
  );
}

export default CommentUpdate;
