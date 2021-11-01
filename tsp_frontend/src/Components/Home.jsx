import React from "react";
import styled from "styled-components";

const P = styled.p`
  margin: 8px;
`;

function Home() {
  return (
    <>
      <h1>Hello!</h1>
      <h2>Welcome to TheShelterPeople's website!</h2>
      <P>Do have fun getting to know the cats here!</P>
    </>
  );
}

export default Home;
