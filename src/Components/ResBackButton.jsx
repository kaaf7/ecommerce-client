/* *👇
 *This is a Mobile Back Button
 *Styled with Styled Components
 *It will be displayed on mobile phones to go back to previous page
 */
// import React
import React from "react";

// import Styled Components
import styled from "styled-components";

// impot useNavigate from reat router dom
import { useNavigate } from "react-router-dom";

// import back attow from material ui
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";

// import responsive Settings from responsive.js
import { mobile } from "../responsive";

// all items container
const Container = styled.div`
  display: none;
  position: fixed;
  height: 2rem;
  width: 2rem;
  z-index: 10000;
  justify-content: center;
  align-items: center;
  top: 92%;
  left: 3%;
  border-radius: 20%;
  background-color: #9d9d9d5d;
  ${mobile({
    display: "flex",
  })};
`;

const ResBackButton = () => {
  const navigate = useNavigate();
  return (
    /* onClick it will navigate back to previous page*/
    <Container onClick={() => navigate(-1)}>
      <ArrowBackIosNewRoundedIcon />
    </Container>
  );
};

export default ResBackButton;
