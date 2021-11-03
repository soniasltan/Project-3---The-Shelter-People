import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Navbar = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 6vh;
  padding: 0 20px;
  background-color: beige;
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
    background-color: #EFBE93;
  }
  &:active {
    background-color: #EFBE93;
  }
`;

const LinkStyled = styled(Link)`
  text-decoration: none;
  color: black;
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
        <LinkStyled to="/contact" className="contact">
          <Li>Contact us</Li>
        </LinkStyled>
        <LinkStyled to="/about" className="about">
          <Li>About</Li>
        </LinkStyled>
        {auth === "NoAuth" ? (
          <>
            <LinkStyled to="/users/new" className="signup">
              <Li>Signup</Li>
            </LinkStyled>
            <LinkStyled to="/login" className="login">
              <Li>Login</Li>
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
