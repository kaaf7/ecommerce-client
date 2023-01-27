/* * 👇
 *This is Favorite Card
 *Created and styled with Styled Components,
 *It will contain wish list products in Favorites Page
 */

// import React
import React from "react";
// import Styled Components
import styled from "styled-components";
// import Navigate to redirect to pages
import { useNavigate } from "react-router-dom";
// import useDispatch activate redux reducers and useSelector to get state
import { useDispatch, useSelector } from "react-redux";
// import addAndRemoveFavorite reducer rom Favorite Slice to add & remove from favorites
import { addAndRemoveFavorite } from "../redux/favoriteRedux";
// favorite icon imported from mui
import FavoriteIcon from "@mui/icons-material/Favorite";
// favorite badge imported from mui
import Badge from "@mui/material/Badge";
// import responsive Settings from responsive.js
import { mobile, tablet } from "../responsive";

// all Items Container
const Container = styled.div`
  position: relative;
`;

// image and and heart button container
const ImageContainer = styled.div``;

// Main Card Container
const Card = styled.img`
  width: 10rem;
  height: 15rem;
  border-radius: 1.576vw;
  border: none;
  cursor: pointer;
  ${mobile({
    width: "20vw",
    height: "30vw",
    borderRadius: "1.5vw",
  })}
  ${tablet({
    width: "20vw",
    height: "30vw",
    borderRadius: "1.5vw",
  })}
`;

// Heart Sign Container
const ProductHeart = styled.div`
  width: 2vw;
  height: 2vw;
  position: absolute;
  top: 50%;
  left: 50%;
  transform-origin: center;
  transform: translate(-50%, -50%);
  transition: 1s;
  cursor: pointer;
  :hover {
    transition: 1s;
  }

  ${mobile({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  })}
  ${tablet({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  })}
`;

// passing product in FavoriteCard component to change its props in Favorite Page
const FavoriteCard = ({ product }) => {
  // get favorites array from Favorite Slice using useSelector
  const favorites = useSelector((state) => state.favorite.favorites);

  // activate dispatch to activate reducers
  const dispatch = useDispatch();

  // using spread operator to avoid mutating product's original data
  let favoriteProduct = { ...product };

  // activate navigate to navigate through pages
  const navigate = useNavigate();

  /* handleFavorite function is responsible 
   for dispatching addAndRemoveFavorite reducer with favoriteProduct */
  const handleFavorite = (e) => {
    e.preventDefault();
    dispatch(addAndRemoveFavorite(favoriteProduct));
  };

  /* checking if the product pressed exists in state 
  favorite array included in favorite slice */
  const doesNotExist =
    favorites?.findIndex((favorite) => favorite?._id === product?._id) !== -1;

  /* OpenProduct function that navigates to product when
   clicked page based on product id as an argument */
  const openProduct = (productId) => {
    navigate(`/products/${productId}`);
  };
  return (
    <Container>
      <ImageContainer>
        <ProductHeart onClick={handleFavorite}>
          {" "}
          <Badge badgeContent={0} color="error">
            {/* if the product does not exist  the heart wil turn red,
           but if it does it will turn grey*/}
            <FavoriteIcon
              sx={doesNotExist ? { color: "#ce1d1df5" } : { color: "darkgrey" }}
            />
          </Badge>
        </ProductHeart>
        {/* onClick open product page*/}
        <Card
          onClick={() => openProduct(product?._id)}
          /* on mouse hover set 2nd image as main*/
          onMouseEnter={(e) => (e.target.src = product?.images[1])}
          /* on normal state set 1st image as main*/
          onMouseLeave={(e) => (e.target.src = product?.images[0])}
          src={product?.images[0]}
        ></Card>
      </ImageContainer>
    </Container>
  );
};

export default FavoriteCard;
