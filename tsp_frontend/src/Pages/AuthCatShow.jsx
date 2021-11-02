import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";

const LinkStyled = styled(Link)`
  text-decoration: none;
  color: black;
`;
const Img = styled.img`
  border-radius: 50%;
`;

function AuthCatShow() {
  let id = useParams();
  // For the cat data
  const [cat, setCat] = useState();
  const [toggle, setToggle] = useState(false);
  // handle function for adding comment
  const handleComment = (event) => {
    event.preventDefault();
    setToggle(!toggle);
    let text = event.target[0].value;
    let cat_id = id.id;
    let user_id = id.id;
    let email = id.id;

    const payload = { text, cat_id, user_id, email };
    axios
      .post(`http://localhost:3000/api/cats/${id.id}/newcomment`, payload)
      .then((res) => {
        window.alert(`Comment added!`);
      });
  };

  // handle function for updating comment
  const updateComment = async (id) => {
    setToggle(!toggle);
    let updateCommentText = prompt("Update the comment:");

    await axios
      .put(`http://localhost:3000/api/comments/${id}`, {
        text: updateCommentText,
      })
      .then((res) => {
        window.alert(`Comment updated!`);
      });
  };

  // handle function for deleting comment
  const deleteComment = (id) => {
    setToggle(!toggle);
    axios.delete(`http://localhost:3000/api/comments/${id}`);
  };

  // useeffect to get the cats data
  useEffect(() => {
    async function getCatData() {
      await axios.get(`http://localhost:3000/api/cats/${id.id}`).then((cat) => {
        setCat(cat.data.data);
      });
    }
    getCatData();
  }, [updateComment]);

  return (
    <>
      <div>
        <h1>{cat?.name}</h1>
        <Img src={cat?.image} alt={cat?.name} width="400px" height="400px" />
        <p>Description: {cat?.description}</p>
        <p>Gender: {cat?.gender}</p>
        <p>Adoptable: {cat?.adoptable}</p>
        <p>Cage: {cat?.cage}</p>
        <button>
          <LinkStyled to={`/cats/list`}> Back </LinkStyled>
        </button>
      </div>
      <div>
        <h3>Comments</h3>
        {cat?.comments?.map((element) => {
          return (
            <>
              <p key={element._id}>
                <p>
                  {element.text}
                  <button onClick={() => updateComment(element._id)}>
                    &#9998;
                  </button>
                  <button onClick={() => deleteComment(element._id)}>
                    &#128465;
                  </button>
                </p>
                <br />
                <p>Posted by: {element.email}</p>
              </p>
            </>
          );
        })}
        <form onSubmit={handleComment}>
          <input type="text" minLength="3" />
          <button>Add comment</button>
        </form>
      </div>
    </>
  );
}

export default AuthCatShow;
