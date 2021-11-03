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
    setToggle(!toggle);
    let text = value;
    let cat_id = id.id;
    let user_id = userName;
    let username = userName;

    const payload = { text, cat_id, user_id, username };
    axios.post(`/api/cats/${id.id}/newcomment`, payload).then((res) => {
      window.alert(`Comment added!`);
    });
  };

  // handle function for updating comment
  const updateComment = async (id) => {
    history.push(`/comments/edit/${id}`);
  };

  // handle function for deleting comment
  const deleteComment = (id) => {
    setToggle(!toggle);
    axios.delete(`/api/comments/${id}`);
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
      <div>
        <h3>Comments</h3>
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
