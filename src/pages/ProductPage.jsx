/* * 👇
 *This is ProductPage
 *Created and styled with Styled Component
 *It will display product images and details
 */

//import react, useState and useEffect hooks
import { React, useState, useEffect } from "react";

//import responsive Settings from responsive.js
import { mobile, tablet } from "../responsive";

// import styled Components
import styled from "styled-components";

// import Navbar
import { Navbar } from "../Components/Navbar";

// import useLocation to get product id
import { useLocation } from "react-router-dom";

// import addProdt redcer from cart Slice
import { addProduct } from "../redux/cartRedux";

// import useDispatch to call reducers
import { useDispatch } from "react-redux";

// import public requests
import { publicRequest } from "../services";

// import unique id uuid
import { v4 as uuidv4 } from "uuid";

// import responsive back button
import ResBackButton from "../Components/ResBackButton";

// all components container
const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  ${mobile({
    display: "flex",
    flexDirection: "column",
    width: "100%",
    marginTop: "0",
    height: "110vh",

  })}

  ${tablet({
    display: "flex",
    flexDirection: "column",
    width: "100%",
  })}
`;

// items wrapper
const Wrapper = styled.div`
  height: 90%;
  margin-left: 7.882vw;
  margin-right: 18.882vw;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  gap: 1vw;
  ${mobile({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginLeft: "7.882vw",
    marginRight: "7.882vw",
    height: "100vh",
    overflowX: "hidden",
  })}
  ${tablet({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginLeft: "7.882vw",
    marginRight: "7.882vw",
    height: "100vh",
    overflowX: "hidden",
  })}
`;

// product lookbook images wrapper
const LookBookWrapper = styled.div`
  display: flex;
  gap: 8vh;
  flex: 1;

  ${mobile({
    marginTop: "20%",
    marginBotton: "0",
    height: "70%",
    gap: "5vh",
  })}
  ${tablet({
    marginTop: "10%",
    marginBotton: "0",
    height: "70%",
    gap: "5vh",
  })}
`;

// lookbook main image
const LookBook = styled.img`
  height: 80vh;
  width: 30vw;
  margin-left: 0;
  object-fit: scale-down;
  ${mobile({
    height: "50vh",
    width: "30vh",
    marginLeft: "5vw",
    marginTop: "10%",
  })}
  ${tablet({
    height: "50vh",
    width: "30vh",
    marginTop: "5%",
  })}
`;

// look book images container
const LookBookContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
  width: 3.941vw;
  gap: 2px;
  ${mobile({
    marginTop: "6vh",
  })}
  ${tablet({
    marginTop: "2vh",
  })}
`;

// lookbook small images
const LookBookImages = styled.img`
  width: 3.9vw;
  height: 10.6vh;
  object-fit: scale-down;
  transition: 0.1s ease-out;
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
  }

  ${mobile({
    marginTop: "20%",
    width: "20vw",
    marginLeft: "10vw",
  })}
  ${tablet({
    marginTop: "20%",
    width: "25vw",
    objectFit: "scale-down",
  })}
`;
// product details
const ProductInfo = styled.div`
  margin-left: 3.941vw;
  height: 80vh;
  width: 25vw;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: start;
  font-family: "Lexend", sans-serif;
  ${mobile({
    marginLeft: "15vw",
    width: "90vw",
    bottom: "10vh",
  })}
  ${tablet({
    marginLeft: "15vw",
    width: "90vw",
    bottom: "10vh",
  })}
`;

// product name
const Title = styled.h2`
  font-weight: 400;
  margin: 0%;
  margin-top: 2%;
  font-family: "Lexend", sans-serif;
  font-size: 2vh;
  ${mobile({
    fontWeight: "200",
    fontSize: "2vh",
    width: "100%",
    marginLeft: "0",
    marginTop: "0",
  })}
  ${tablet({
    fontWeight: "200",
    fontSize: "2vh",
    width: "100%",
    marginLeft: "0",
    marginRight: "90%",
  })}
`;
// product price
const PriceTag = styled.p`
  //font-weight: 500;
  font-size: 2.14vh;
  margin-top: 1vh;
  font-family: "Lexend", sans-serif;
  margin-bottom: 2vh;
`;
// colors
const Color = styled.select`
  height: 3.25vh;
  width: 100%;
  border: 0.1px solid rgba(89, 89, 89, 0.1);
  font-family: "Lexend", sans-serif;
  font-weight: 200;
  font-size: 1.5vh;
  &:focus {
    border-bottom: 2px solid black;
    box-shadow: none;
    border: none;
  }
`;
// add to cart button
const AddToCartBtn = styled.button`
  margin-top: 4vh;
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 1.5vh;
  text-align: center;
  font-family: "Lexend", sans-serif;
  border: 0.1px solid black;
  background-color: #040404;
  color: #ffffff;
  &:hover {
    background-color: grey;
  }
`;

// product details
const ProductDescription = styled.p`
  font-family: "Lexend", sans-serif;
  font-weight: 200;

  ${mobile({
    fontWeight: "200",
    fontSize: "1.5vh",
  })}
  ${tablet({
    fontWeight: "200",
    fontSize: "1.5vh",
  })}
`;

const ProductPage = () => {
  // get location
  const location = useLocation();
  // get product id
  const productId = location.pathname.split("/")[2];
  // set product according to the response
  const [product, setProduct] = useState();
  // set product quantity 0 before adding it to cart
  const [quantity, setQuantity] = useState(0);
  // set product color
  const [color, setColor] = useState();
  // set main image as nothing
  const [mainImage, setMainImage] = useState("");
  // dispatch to call redux reducers
  const dispatch = useDispatch();



  // useEffect hook with getProduct function to get a single product with product id dependency
  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get(
          `/products/allproducts/product?id=${productId}`
        );
        setProduct(res.data);
      } catch (err) {}
    };
    getProduct();
  }, [productId]);

  // handle the main image of product based on imageSrc argument
  const handleMainImage = (imageSrc) => {
    setMainImage(imageSrc);
  };

  /* handleAddProductToCart function is responsible
   for calling addProduct reducer and dispatching product along with quantity, color and a unique id*/
  const handleAddProductToCart = (e) => {
    e.preventDefault();
    dispatch(
      addProduct({
        ...product,
        quantity,
        color,
        uniqueId: uuidv4(),
      })
    );
  };

  return (
    <Container>
      <Navbar></Navbar>
      <Wrapper>
        <LookBookWrapper>
          <LookBookContainer>
            {/* on click set the main image as the image being clicked on */}
            {product?.images.map((image, i) => (
              <LookBookImages
                onClick={() => {
                  handleMainImage(image);
                }}
                key={i}
                src={image}
              />
            ))}
          </LookBookContainer>
          {/*if not main image then show first image*/}
          <LookBook src={!mainImage ? product?.images[1] : mainImage} />
        </LookBookWrapper>

        <ProductInfo>
          {/*product title props */}
          <Title>{product?.productTitle}</Title>
          {/*product price props */}
          <PriceTag>€ {product?.price}</PriceTag>
          {/*product color props */}
          <Color
            defaultValue={"DEFAULT"}
            onChange={(e) => setColor(e.target.value)}
          >
            <option
              value="DEFAULT"
              style={{ fontFamily: "Lexend,sanSerif" }}
              disabled
            >
              SELECT COLOR
            </option>
            {product?.colors.map((color) => (
              <option key={color}>{color.toUpperCase()}</option>
            ))}
          </Color>
          {/*if color is added then call handleAddProductToCart function */}
          <AddToCartBtn onClick={color && handleAddProductToCart}>ADD TO CART</AddToCartBtn>
          {/*product description props */}
          <ProductDescription>{product?.description}</ProductDescription>
        </ProductInfo>
      </Wrapper>{" "}
      <ResBackButton />
    </Container>
  );
};

export default ProductPage;
