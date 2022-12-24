/* * 👇
 *This is Hamburger Menu,
 *It is created and styled with Styled Components
 *It will contain categories and other information
 */
// import React
import { React, useState } from "react";

// import Styled Components
import styled from "styled-components";

// import responsive Settings from responsive.js
import { mobile } from "../responsive";

// import NavLink for navigation
import { NavLink } from "react-router-dom";

const Container = styled.div`
  display: none;
  height: 90%;
  ${mobile({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  })}
`;

const MenuLabel = styled.label`
  background-color: #f9f9f9;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 6rem;
  right: 6rem;
  border-radius: 20%;
  height: 2rem;
  width: 2rem;
  margin-left: 0;
  cursor: pointer;
  z-index: 1000;
  text-align: center;
  background-color: ${(props) => (props.clicked ? "#c40a0af5" : "#e5e5e5")};
`;

const NavBackground = styled.div`
  position: fixed;
  background: white;
  height: 6rem;
  width: 6rem;
  border-radius: 50%;
  z-index: 600;
  transform: ${(props) => (props.clicked ? "scale(80)" : "scale(0)")};
  transition: transform 0.6s;
`;
const Icon = styled.span`
  position: fixed;
  background-color: ${(props) => (props.clicked ? "transparent" : "black")};
  width: 1rem;
  height: 2px;
  display: inline-block;
  transition: all 0.1s;
  &::before,
  &::after {
    content: "";
    background-color: black;
    width: 1rem;
    height: 2px;
    display: inline-block;
    position: absolute;
    left: 0;
    transition: all 0.1s;
  }
  &::before {
    top: ${(props) => (props.clicked ? "0" : "-0.3rem")};
    transform: ${(props) => (props.clicked ? "rotate(135deg)" : "rotate(0)")};
  }
  &::after {
    top: ${(props) => (props.clicked ? "0" : "0.3rem")};
    transform: ${(props) => (props.clicked ? "rotate(-135deg)" : "rotate(0)")};
  }
  ${MenuLabel}:hover &::before {
    top: ${(props) => (props.clicked ? "0" : "-.6rem")};
  }
  ${MenuLabel}:hover &::after {
    top: ${(props) => (props.clicked ? "0" : ".6rem")};
  }
`;

const Navigation = styled.nav`
  height: 100vh;
  position: fixed;
  top: 0;
  right: 0;
  z-index: 600;
  width: ${(props) => (props.clicked ? "100%" : "0")};
  opacity: ${(props) => (props.clicked ? "1" : "0")};
  transition: width 0.8s, opacity 0.8s;
`;

const List = styled.ul`
  position: absolute;
  list-style: none;
  top: 50%;
  left: 50%;
  transform: translate(-52.5%, -50%);
  text-align: center;
  width: 100%;
`;
const ItemLink = styled(NavLink)`
  display: inline-block;
  font-size: ${(props) => props.size};
  font-weight: ${(props) => props.weight};
  color: ${(props) => props.color};
  text-decoration: none;
  font-family: "Lexend", sans-serif;
  padding: 1rem 2rem;

  //background-size: 240%;
  transition: all 0.4s;
  &:hover,
  &:active {
    background-position: 100%;
    color: black;
    transform: translateX(1rem);
  }
`;
const HamburgerMenu = () => {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);

  return (
    <Container>
      {" "}
      <MenuLabel clicked={click} htmlFor="navi-toggle" onClick={handleClick}>
        <Icon clicked={click}></Icon>
      </MenuLabel>
      <NavBackground clicked={click}></NavBackground>
      <Navigation clicked={click}>
        <List>
          <li>
            <ItemLink
              color={"#c40a0af5"}
              size={"3rem"}
              weight={500}
              onClick={handleClick}
              to="/"
            >
              BANKAI.
            </ItemLink>
          </li>

          <li>
            <ItemLink
              color={"black"}
              size={"2rem"}
              weight={300}
              onClick={handleClick}
              to="/products/women"
            >
              WOMEN
            </ItemLink>
          </li>
          <li>
            <ItemLink
              color={"black"}
              size={"2rem"}
              weight={300}
              onClick={handleClick}
              to="/products/men"
            >
              MEN
            </ItemLink>
          </li>
          <li>
            <ItemLink
              color={"black"}
              size={"2rem"}
              weight={300}
              onClick={handleClick}
              to="/products"
            >
              NEW
            </ItemLink>
          </li>
          <li>
            <ItemLink
              color={"black"}
              size={"2rem"}
              weight={300}
              onClick={handleClick}
            >
              ABOUT
            </ItemLink>
          </li>
        </List>
      </Navigation>
    </Container>
  );
};

export default HamburgerMenu;
