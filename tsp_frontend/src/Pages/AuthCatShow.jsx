import axios from "axios";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Link, useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import MDEditor from "@uiw/react-md-editor";

const Img = styled.img`
  border-radius: 50%;
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
        <h1>{cat?.name}</h1>
        <Img src={cat?.image} alt={cat?.name} width="auto" height="400px" />
        <p>Description: {cat?.description}</p>
        <p>Gender: {cat?.gender}</p>
        <p>Adoptable: {cat?.adoptable}</p>
        <p>Cage: {cat?.cage}</p>
        <button onClick={() => catListPage()}>Back</button>
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
          <button>Add comment</button>
        </form>
      </div>
    </>
  );
}

export default AuthCatShow;
