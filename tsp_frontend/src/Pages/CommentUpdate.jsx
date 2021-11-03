import axios from "axios";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Link, useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import MDEditor from "@uiw/react-md-editor";

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
        <h3>Edit Comment</h3>
        <MDEditor value={value} onChange={setValue} />
      </div>
      <button onClick={() => updateComment()}>Update</button>
      <button onClick={() => catPage()}>Back</button>
    </>
  );
}

export default CommentUpdate;
