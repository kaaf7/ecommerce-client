/* * 👇
 *This is Footer Component,
 *It is created and styled with Styled Components
 *It will contain company's information a
 */

// import React
import React from "react";

// import Styled Components
import styled from "styled-components";

//import responsive Settings from responsive.js
import { mobile, mcBook } from "../responsive";

// all Components Container
const Container = styled.div`
  height: 30vh;
  display: flex;
  width: 100%;
  justify-content: space-between;
  overflow: hidden;
  ${mobile({
    display: "flex",
    justifyContent: "space-between",
    height: "45vh",
    marginTop: "5vh",
  })}
  ${mcBook({
    display: "flex",
    justifyContent: "space-between",
    height: "45vh",
  })}
`;
// text items where all the info is displayed
const Item = styled.div`
  font-size: 12px;
  color: grey;
  font-family: "Lexend", sans-serif;
  font-weight: 400;
  cursor: pointer;
  flex: 1;
  ${mobile({
    fontSize: "10px",
  })}
`;

// left itemns container
const LeftItems = styled.div`
  margin-left: 5.255vw;
  height: 150%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  max-width: 30%;
  gap: 10px;
  flex: 1;
  ${mobile({
    height: "100%",
  })}
`;

// all items container
const ItemsContainer = styled.div`
  justify-content: space-between;
  align-items: center;
  gap: 0.525vw;
  height: 60%;
  margin-left: 2.627vw;
  max-width: 30%;
  flex: 1;
  ${mobile({
    marginLeft: "7.882vw",
    marginRight: "7.882vw",
    maxWidth: "50%",
    height: "90%",
    marginBottom: "5vh",
  })}
`;
const Footer = () => {
  return (
    <Container>
      <LeftItems>
        <ItemsContainer>
          <Item>Contact Us</Item>
          <Item>FAQs</Item>
          <Item>Delivery Option</Item>
          <Item>Returns & Refunds</Item>
          <Item>Store Locator</Item>
          <Item>Customer Service</Item>
          <Item>Payment</Item>
          <Item>Size Guide</Item>
          <Item>Privac Policy</Item>
          <Item>Cookie Settings</Item>
        </ItemsContainer>
        <ItemsContainer>
          <Item>Student Discount</Item>
          <Item>Sustainability</Item>
          <Item>Product Care</Item>
          <Item>Career</Item>
          <Item>Press</Item>
          <Item>About Bankai.</Item>
        </ItemsContainer>
        <ItemsContainer>
          <Item>Facebook</Item>
          <Item>Pinterest</Item>
          <Item>Instagram</Item>
          <Item>Spotify</Item>
        </ItemsContainer>
      </LeftItems>
    </Container>
  );
};

export default Footer;
