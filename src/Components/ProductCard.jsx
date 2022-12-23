/* * 👇
 *This is a Product Component
 *It will contain all the product image and info like price, size, and color
 *It will be desplayed in Hightlights Component and also in ProductsPage
 */

// import React
import React from "react";

// import Styled Components
import styled from "styled-components";

// import useNavigate to redirect to pages
import { useNavigate } from "react-router-dom";

// import Favorite Icon from material UI
import FavoriteIcon from "@mui/icons-material/Favorite";

// addAndRemoveFavorite reudcer from favorite slice
import { addAndRemoveFavorite } from "../redux/favoriteRedux";

// import Cart Badge from material UI
import Badge from "@mui/material/Badge";

// import responsive Settings from responsive.js
import { mobile, tablet } from "../responsive";

import { useDispatch, useSelector } from "react-redux";

// all Components Container
const Container = styled.div`
  border: 0.1 solid black;
  justify-content: center;
  align-items: center;
`;

// the template that will contain the Product images and info
const ProductCardTemplate = styled.div`
  max-width: 50vw;
  height: 100%;
  flex: 1;
  ${mobile({
    width: "25vw",
  })}
  ${tablet({
    width: "25vw",
  })}
`;

// Product main image
const ProductImage = styled.img`
  max-height: 60vh;
  cursor: pointer;
  ${mobile({
    width: "30vw",
  })}
  ${tablet({
    maxHeight: "50vh",
    maxWidth: "40vw",
  })}
`;
const ImageContainer = styled.div`
  max-height: 60vh;
  position: relative;
  ${mobile({
    width: "inherit",
  })}
  ${tablet({
    maxHeight: "50vh",
    maxWidth: "40vw",
  })}
`;

// Container for all product information
const ProductInfoContainer = styled.div`
  max-width: 50vw;
  height: 10.67vh;
  display: flex;
  margin-bottom: 1vh;
  font-family: "Lexend", sans-serif;
  justify-content: center;
  align-items: start;
  text-align: start;
  flex-direction: column;
  color: black;
  font-size: 0.631vw;
  ${mobile({
    width: "100%",
  })}
`;

// Text for product information
const ProductInfo = styled.p`
  flex: 1;
  font-size: 0.7vw;
  color: #272727f5;
  font-family: "Lexend", sans-serif;
  letter-spacing: 2px;
  font-weight: 300;
  ${mobile({
    fontSize: "2vw",
    marginTop: "2vh",
    width: "100%",
  })}
`;

// product price
const ProductPrice = styled.p`
  flex: 1;
  font-weight: 400;
  font-size: 0.8vw;
  color: #272727f5;
  font-family: "Lexend", sans-serif;
  letter-spacing: 2px;
  margin-top: 0;
  ${mobile({
    fontSize: "2vw",
  })}
`;

// Product Colors Container
const ColorContainer = styled.div`
  display: flex;
  gap: 2px;
  flex: 1;
`;

// Color selection with color props based on the product
const ColorSelections = styled.div`
  width: 10px;
  height: 10px;
  border: 0.1px solid lightgrey;
  // color is color prop based on the product
  background-color: ${({ color }) => color};
  ${mobile({
    width: "2vw",
    height: "2vw",
  })}
`;

// Heart icon to add product to favorites
const ProductHeart = styled.div`
  width: 2vw;
  height: 2vw;
  position: absolute;
  top: 90%;
  left: 85%;
  transform-origin: center;
  transform: translate(-50%, -50%);
  transition: 1s;

  cursor: pointer;
  :hover {
    transition: 1s;
    //transform: scale(1.3);
  }
  ${mobile({
    width: "1vw",
    height: "1vw",
    top: "50%",
    left: "50%",
    position: "absolute",
    transform: "translate(-50%, -50%)",
  })}
  ${tablet({
    width: "3vw",
    height: "3vw",
    top: "50%",
    left: "50%",
    position: "absolute",
    transform: "translate(-50%, -50%)",
  })}
`;
// passing product and category in productCard component to change its props in other pages
const ProductCard = ({ product, category }) => {
  //useNavigate to switch pages
  const navigate = useNavigate();
  // activate dispatch
  const dispatch = useDispatch();
  /* *
   *handleFavorite function responsible for adding or removing products into favorites
   *It activates the function using dispatch and the product intended to be added */
  const handleFavorite = (e) => {
    e.preventDefault();
    dispatch(addAndRemoveFavorite(newFAvoriteProduct));
  };
  // favorite state from favorite slice
  const favorites = useSelector((state) => state.favorite.favorites);
  // spread operator to get product into newFavoriteProduct
  let newFAvoriteProduct = { ...product };

  //openProduct function to switch to Product page once pressed on product
  const openProduct = (productId) => {
    navigate(`/products/${productId}`);
  };

  // check if product exists in favorites
  const doesFavoritExist =
    favorites?.findIndex((favorite) => favorite?._id === product?._id) !== -1;

  return (
    <Container>
      <ProductCardTemplate>
        {/* show the heart sign only if the display in a category */}
        {/* handleFavorite function to add product into favorite list*/}
        {/*product image props*/}
        <ImageContainer>
          {category && (
            <ProductHeart onClick={handleFavorite}>
              <Badge badgeContent={0} color="error">
                {/*if the product does not exist in favorites turn the heart into red 
            , else turn it grey*/}
                <FavoriteIcon
                  sx={
                    doesFavoritExist
                      ? { color: "#ce1d1df5" }
                      : { color: "darkgrey" }
                  }
                />
              </Badge>
            </ProductHeart>
          )}
          <ProductImage
            src={product?.images[0]}
            // on mouse hover the product main image will change to another image
            onMouseEnter={(e) => (e.target.src = product?.images[1])}
            onMouseLeave={(e) => (e.target.src = product?.images[0])}
            onClick={() => openProduct(product?._id)}
          ></ProductImage>
        </ImageContainer>
        <ProductInfoContainer>
          {/*product title props*/}
          <ProductInfo>{product?.productTitle.toUpperCase()}</ProductInfo>
          {/*product price props*/}
          <ProductPrice>€ {product?.price}</ProductPrice>
          {/*product color props*/}
          <ColorContainer>
            {product?.colors.map((availableColor) => (
              <ColorSelections key={availableColor} color={availableColor} />
            ))}
          </ColorContainer>
        </ProductInfoContainer>
      </ProductCardTemplate>
    </Container>
  );
};

export default ProductCard;
