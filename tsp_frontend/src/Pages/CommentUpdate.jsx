import axios from "axios";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Link, useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import MDEditor from "@uiw/react-md-editor";

function CommentUpdate({ userName, role }) {
  let id = useParams();
  let history = useHistory();
  // For the cat data
  const [value, setValue] = useState("");
  const [catid, setCatID] = useState("");
  // handle function to return user to cat list page
  const catListPage = () => {
    history.push(`/cats/${catid}`);
  };

  // handle function for updating comment
  const updateComment = async (id) => {
    let updateCommentText = prompt("Update the comment:");

    await axios
      .put(`/api/comments/${id}`, {
        text: updateCommentText,
      })
      .then((res) => {
        window.alert(`Comment updated!`);
      });
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
      <button onClick={() => catListPage()}>Back</button>
    </>
  );
}

export default CommentUpdate;
