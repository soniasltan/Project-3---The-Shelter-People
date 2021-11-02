import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Navbar = styled.nav`
  display: flex;
  align-items: center;
  width: 100%;
  height: 6vh;
  padding: 0 20px;
  background-color: beige;
`;

const Li = styled.li`
  display: flex;
  justify-content: center;
  text-align: center;
  padding: 5px 26px;
  font-size: 16px;
  border-radius: 24px;
`;

const LinkStyled = styled(Link)`
  text-decoration: none;
  color: black;
`;

function NavBar() {
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
        <LinkStyled to="/login" className="login">
          <Li>Login</Li>
        </LinkStyled>
      </Navbar>
    </>
  );
}

export default NavBar;
