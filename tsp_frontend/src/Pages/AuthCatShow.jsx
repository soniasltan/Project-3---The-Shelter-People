import axios from "axios";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Link, useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import MDEditor from "@uiw/react-md-editor";

const Img = styled.img`
  border-radius: 50%;
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

function AuthCatShow({ userName, role }) {
  let id = useParams();
  let history = useHistory();
  // For the cat data
  const [cat, setCat] = useState();
  const [toggle, setToggle] = useState(false);
  const [value, setValue] = useState("");
  // handle function to return user to cat list page
  const catListPage = () => {
    history.push(`/cats/list`);
  };
  // handle function for adding comment
  const handleComment = (event) => {
    event.preventDefault();
    let text = value;
    let cat_id = id.id;
    let user_id = userName;
    let username = userName;

    const payload = { text, cat_id, user_id, username };
    axios.post(`/api/cats/${id.id}/newcomment`, payload).then((res) => {
      window.alert(`Comment added!`);
    });
    setToggle(!toggle);
  };

  // handle function for updating comment
  const updateComment = async (id) => {
    history.push(`/comments/edit/${id}`);
  };

  // handle function for deleting comment
  const deleteComment = (commentid) => {
    setToggle(!toggle);
    axios.delete(`/api/comments/${commentid}`);
    window.alert(`Comment deleted!`);
    // Potential brain drain: need to understand the structure of cat + comments
    // Each cat contains an array of comments, each comment is an object
    // This is the removed comment
    let removedComment = cat.comments.filter((comment) => {return comment._id === commentid})[0];
    // Now need to get the comment out of the cat, without messing the other cat data values
    // use spread operator to keep the other cat data values, then set the comments to not include the removed comment
    setCat({...cat, comments: cat.comments.filter(c =>c._id !== removedComment._id)});
  };

  // useeffect to get the cats data
  useEffect(() => {
    async function getCatData() {
      await axios.get(`/api/cats/${id.id}`).then((cat) => {
        setCat(cat.data.data);
      });
    }
    getCatData();
  }, [toggle]);

  return (
    <>
      <div>
      <ContentBox>
        <h1>{cat?.name}</h1>
        <Img src={cat?.image} alt={cat?.name} width="auto" height="400px" />
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
        {cat?.comments.length > 0 ? <h3>Comments</h3> : <></>}
        {cat?.comments?.map((element) => {
          return (
            <>
              <p key={element._id}>
                <hr />
                <MDEditor.Markdown
                  source={`**` + element.username + `** *commented:*`}
                />
                <MDEditor.Markdown source={element.text} />
                {/* Only admin can update/delete all comments. Guest can only update/delete own comment */}
                {role === "Admin" && (
                  <>
                    <button onClick={() => updateComment(element._id)}>
                      &#9998; Edit
                    </button>
                    <button onClick={() => deleteComment(element._id)}>
                      &#128465; Del
                    </button>
                  </>
                )}
                {element.username === userName && role === "Guest" && (
                  <>
                    <button onClick={() => updateComment(element._id)}>
                      &#9998;
                    </button>
                    <button onClick={() => deleteComment(element._id)}>
                      &#128465;
                    </button>
                  </>
                )}
                <br />
                <hr />
              </p>
            </>
          );
        })}
        <form onSubmit={handleComment}>
          <MDEditor value={value} onChange={setValue} />
          <Button>Add comment</Button>
        </form>
      </div>
    </>
  );
}

export default AuthCatShow;
