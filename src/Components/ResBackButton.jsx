import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
// import responsive Settings from responsive.js
import { mobile } from "../responsive";
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
    <Container onClick={() => navigate(-1)}>
      <ArrowBackIosNewRoundedIcon />
    </Container>
  );
};

export default ResBackButton;
