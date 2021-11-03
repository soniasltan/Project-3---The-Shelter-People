import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import catimg from "../Components/catimg.jpg";

const HeroContainer = styled.div`
  background-image: linear-gradient(
      to top right,
      rgba(11, 10, 10, 0.38),
      rgba(11, 10, 10, 0.19)
    ),
    url(${catimg});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 94vh;
  @media only screen and (max-width: 1600px) {
    height: 85vh;
  }
`;

const HeroContent = styled.section`
  height: 100%;
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: #fffefe;
  @media only screen and (max-width: 375px) {
    text-align: start;
    height: 80%;
  }
`;

const HeroContentText = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media only screen and (max-width: 600px) {
    width: 80%;
  }
  @media only screen and (max-width: 375px) {
    position: absolute;
    align-items: flex-start;
  }
`;

const HeroTitle = styled.h1`
  font-size: 53px;
  font-weight: 900;
`;

const HeroText = styled.h3`
  font-size: 20px;
  font-weight: 400;
  padding: 2.5rem 2rem;
  @media only screen and (max-width: 375px) {
    padding: 1.5rem 0;
  }
`;

const HeroTitleText = styled.span`
  display: block;
`;

const HeroBtn = styled(Link)`
  text-decoration: none;
  outline: none;
  border: none;
`;

const Button = styled.button`
  border-radius: ${({ bigRadius }) => (bigRadius ? "30px" : "20px")};
  background-color: ${({ primary }) => (primary ? "#EFBE93" : "#000")};
  color: ${({ primary }) => (primary ? "#000" : "#fff")};
  padding: ${({ big }) => (big ? "18px 30px" : "10px 28px")};
  font-size: ${({ bigFont }) => (bigFont ? "20px" : "18px")};
  outline: none;
  cursor: pointer;
  border: none;
  transition: all 0.5s ease;

  &:hover {
    background-color: ${({ primary }) => (primary ? "#fff" : "#E38B06")};
    transform: translateY(-0.5rem) scale(1.02);
    color: #000;
  }
  &:active {
    transform: translateY(0.5rem);
  }

  @media only screen and (max-width: 1000px) {
    /* width: 100%; */
    padding: ${({ big }) => (big ? "18px 30px" : "10px 20px")};
  }
  @media only screen and (max-width: 375px) {
    padding: ${({ big }) => (big ? "12px 20px" : "10px 20px")};
    font-size: ${({ bigFont }) => (bigFont ? "16px" : "18px")};
  }
`;

function Home() {
  return (
    <div>
      <HeroContainer>
        <HeroContent>
          <HeroContentText>
            <HeroTitle>
              <HeroTitleText>
                Sharing love and support for animals. Join our journey here.
              </HeroTitleText>
            </HeroTitle>
            <HeroText>
              Feel free to reach out to us via our contact page for more
              information with regards to the shelter, volunteering, adoption or
              cat related knowledge!
            </HeroText>
            <HeroBtn to="/cats/list">
              <Button primary big bigFont bigRadius>
                View the cats today!
              </Button>
            </HeroBtn>
          </HeroContentText>
        </HeroContent>
      </HeroContainer>
    </div>
    // <>
    // <Photo src={catimg} alt="Banner" />
    // </>
  );
}

export default Home;
