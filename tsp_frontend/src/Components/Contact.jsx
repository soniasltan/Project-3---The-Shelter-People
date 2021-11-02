import React from "react";
import styled from "styled-components";

const P = styled.p`
  margin: 8px;
`;

function Contact() {
 
  return (
    <>
      <h1>Contact us!</h1>
      <P>We are located at The Animal Lodge @ 59 Sungei Tengah Road, Singapore 699014</P>
      <P>Would you love to volunteer? Check out our instagram <a href = "https://www.instagram.com/theshelterpeople_sg/" target="_blank">@theshelterpeople_sg</a> </P>
    </>
  );
}

export default Contact;