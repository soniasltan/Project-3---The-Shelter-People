import React from "react";
import {Link} from 'react-router-dom';
import styled from "styled-components";
import catimg from "../Components/catimg.jpg";

// const Photo = styled.img`
//   background-position: center;
//   background-repeat: no-repeat;
//   background-size: cover;
//   height: 93vh;
//   width: auto;
//   @media only screen and (max-width:1600px) {
//       height: 85vh;
//   }
// `;

const HeroContainer = styled.div`
background-image: linear-gradient( to top right, rgba(11, 10, 10, 0.38), rgba(11, 10, 10, 0.19)), url(${catimg});
background-position: center;
background-repeat: no-repeat;
background-size: cover;
height: 94vh;
@media only screen and (max-width:1600px) {
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
color: #FFFEFE;
@media only screen and (max-width:375px) {
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
@media only screen and (max-width:600px) {
    width: 80%;
}
@media only screen and (max-width:375px) {
    position: absolute;
    align-items: flex-start;
}
`;

const HeroText = styled.h3`
font-size: clamp(2rem, 2.5vw, 3rem);
font-weight: 400;
@media only screen and (max-width:375px) {
    padding: 1.5rem 0;
}
`;

const HeroBtn = styled(Link)`
text-decoration: none;
outline: none;
border: none;
`;

const Button = styled.button`
border-radius: ${({bigRadius}) => bigRadius ? '30px': '20px'};
background-color: ${({primary}) => primary? '#E38B06': '#000'};
color: ${({primary}) => primary ? '#000': '#fff'};
padding: ${({big}) => big? '18px 30px' : '10px 28px'};
font-size: ${({bigFont}) => bigFont? '20px': '18px'};
outline: none;
cursor: pointer;
border: none;
transition: all .5s ease;

&:hover{
    background-color: ${({primary}) => primary? '#fff': '#EFBE93'};  
    transform: translateY(-.5rem) scale(1.02);
    color: #000;
}
&:active{
    transform: translateY(.5rem);
}

@media only screen and (max-width:1000px) {
    /* width: 100%; */
    padding: ${({big}) => big? '18px 30px' : '10px 20px'};
}
@media only screen and (max-width:375px) {
    padding: ${({big}) => big? '12px 20px' : '10px 20px'};
    font-size: ${({bigFont}) => bigFont? '16px': '18px'};
}


`;

function Home() {
  return (
<div>
           <HeroContainer>
               <HeroContent>
                   <HeroContentText>
                        <HeroText>
                            Get a fresh and tasty recepies that are well balanced and 
                            will improve your wellness, plus add nutrients to your body.
                        </HeroText>
                        <HeroBtn to="/cats/list">
                           <Button primary big bigFont bigRadius>View the cats today!</Button>
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
