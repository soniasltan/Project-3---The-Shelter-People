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
      <P>This is a website run by The Shelter People to update about our progress at the shelter.</P>
      <P>In the past 2 years, we have been raising awareness to animal shelters by bringing the volunteering experience to our family and friends so they can have a glimpse of what life is like for cats and dogs at the shelter.</P>
      <P>We have also seen the growth of the cats - from skittish to friendly, wanting pats and cuddles. We have also seen death - which is inevitable, comes with age and their rugged lives when they were strays.</P>
      <P>We hope to create more opportunities to connect and awareness to the public on not abandoning their pets, pets are for life.</P>
      <P>In turn, visits to the shelter can help the shelter cats to become more sociable and gain higher chance at getting adopted.</P>
      <P>So join our journey here. Feel free to reach out to us via our contact page for more information with regards to the shelter, volunteering, adoption or cat related knowledge!</P>
    </>
  );
}

export default Home;
