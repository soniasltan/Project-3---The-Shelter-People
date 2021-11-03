import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Navbar = styled.nav`
  display: flex;
  position: sticky;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 6vh;
  background-color: #faf0e6;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.15);
`;

const Li = styled.li`
  display: flex;
  justify-content: center;
  text-align: center;
  padding: 5px 26px;
  font-size: 16px;
  border-radius: 24px;
  &:hover {
    background-color: #efbe93;
  }
  &:active {
    background-color: #efbe93;
  }
`;

const LinkStyled = styled(Link)`
  text-decoration: none;
  color: black;
  font-weight: bold;
  font-size: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  transition: all 0.2s ease;
`;

// const NavBtn = styled(Link)`
//   text-decoration: none;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   padding: 8px 16px;
//   height: 100%;
//   width: 100%;
//   border: none;
//   outline: none;
// `;

const Button = styled.button`
  border-radius: ${({ bigRadius }) => (bigRadius ? "30px" : "20px")};
  background-color: ${({ primary }) => (primary ? "#EFBE93" : "#000")};
  color: ${({ primary }) => (primary ? "#000" : "#fff")};
  padding: ${({ big }) => (big ? "15px 27px" : "5px 23px")};
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

function NavBar({ role, auth, handleLogOut, userName }) {
  return (
    <>
      <Navbar>
        <LinkStyled to="/" className="home">
          <Li>Home</Li>
        </LinkStyled>
        <LinkStyled to="/cats/list" className="cats">
          <Li>Cats</Li>
        </LinkStyled>
        <LinkStyled to="/about" className="about">
          <Li>About Us</Li>
        </LinkStyled>
        <LinkStyled to="/contact" className="contact">
          <Li>Contact Us</Li>
        </LinkStyled>
        {auth === "NoAuth" ? (
          <>
            <LinkStyled to="/users/new" className="signup">
              <Li>Signup</Li>
            </LinkStyled>
            <LinkStyled to="/login" className="login">
              <Button primary>Login</Button>
            </LinkStyled>
          </>
        ) : (
          <>
            <p>&#128571; Hello {userName}! &#128571;</p>
            <LinkStyled to="/" className="logout">
              <Li onClick={handleLogOut}>Logout</Li>
            </LinkStyled>
          </>
        )}
      </Navbar>
    </>
  );
}

export default NavBar;
