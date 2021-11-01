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
      <P>We have many cute cats here!</P>
      <P>Do have fun getting to know the cats</P>
    </>
  );
}

export default Home;
