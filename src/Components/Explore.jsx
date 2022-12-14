/* * 👇
 *This is Explore display Component
 *Created and styled with Styled Components,
 *It will redirect customer to other pages with products
 */

// import React
import React from "react";

// import Styled Components
import styled from "styled-components";

//import responsive Settings from responsive.js
import { mobile } from "../responsive";

// import Navigate to redirect to pages
import { useNavigate } from "react-router-dom";

// all Components Container
const Container = styled.div`
  width: 100%;
  height: 25vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  ${mobile({
    height: "15vh",
  })}
`;

// Components Wrapper
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  flex: 1;
  align-items: center;
  text-align: center;
  max-height: 80%;
  overflow: hidden;
`;

// Explore Component Title
const Title = styled.h1`
  margin-bottom: 5.255vw;
  font-family: "Lexend", sans-serif;
  margin-top: 10px;
  margin-bottom: 0px;
  font-size: 35px;
  font-weight: 300;
  color: #272727f5;
`;

// Button container
const ButtonsContainer = styled.div`
  max-width: 50%;
  display: flex;
  justify-content: center;
  align-items: top;
  flex: 1;
  gap: 10px;
  ${mobile({
    width: '100%',
    gap: "20px",
    marginRight:"7.8125vw",
    marginLeft:"7.8125vw"
  })}
`;

//Button to redirect to products page
const Button = styled.button`
  width: 20vw;
  height: 4vh;
  font-family: "Lexend", sans-serif;
  font-weight: 200;
  margin-top: 1.051vw;
  border: 0.1px solid lightgrey;
  font-size: 14px;
  color: #272727f5;
  background-color: transparent;
  cursor: pointer;
  ${mobile({
    fontSize: "10px",
  })}
`;

const Explore = () => {
  //useNavigate to switch pages
  const navigate = useNavigate();

  /* * NavigateDir function that changed 
  page based on custome directory as an argument*/
  const NavigateDir = (directory) => {
    navigate(directory);
  };

  return (
    <Container>
      <Wrapper>
        <Title>EXPLORE MORE</Title>
        {/*Women's products*/}
        <ButtonsContainer>
          <Button
            onClick={() => {
              NavigateDir("/products/women");
            }}
          >
            WOMEN
          </Button>
          {/*Men's products*/}
          <Button
            onClick={() => {
              NavigateDir("/products/men");
            }}
          >
            MEN
          </Button>
          {/*All products*/}
          <Button
            onClick={() => {
              NavigateDir("/products");
            }}
          >
            NEW
          </Button>
        </ButtonsContainer>
      </Wrapper>
    </Container>
  );
};

export default Explore;
