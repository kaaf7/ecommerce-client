/* * 👇 This is Board display it will display random products Component  
created and styled with Styled Component it will display 
3 random product photos and a fashion quote	
cretaed and styled with Styled Component 
*/

// import react
import React from "react";

// import Styled Components
import styled from "styled-components";

// import useState and useEffect Hook from React
import { useState, useEffect } from "react";

// import Navigate to redirect to pages
import { useNavigate } from "react-router-dom";

//import responsive Settings from responsive.js
import { mobile, tablet, mcBook } from "../responsive";

// import public axios request from services
import { publicRequest } from "../services";

// Array of random quotes
const Quotes = [
  "YOU CAN HAVE ANYTHING YOU WANT IN LIFE IF YOU DRESS FOR IT",
  "The joy of dressing is an art ",
  "When in doubt, wear red.",
  "We must never confuse elegance with snobbery.",
  "Fashion is like eating, you shouldn't stick to the same menu.",
  "Elegance is good taste, plus a dash of daring",
];

// Components Container
const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;

  //border-bottom: 1px solid lightgray;
  //border-top: 1px solid lightgray;
  ${mobile({
    height: "250vh",
    width: "100%",
  })}
  ${tablet({
    height: "350vh",
    width: "100%",
    marginTop: "0",
  })}
 
`;

// All Components Container
const Wrapper = styled.div`
  height: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  font-family: "Lexend", sans-serif;
  margin-left: 7.8125vw;
  margin-right: 7.8125vw;
  ${mobile({
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginRight: "0%",
    marginLeft: "0%",
  })}
  ${tablet({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginRight: "0%",
    marginLeft: "0%",
    height: "100%",
    width: "100%",
  })}
  
`;

// Image Component to display product images
const Image = styled.img`
  height: 90%;
  flex: 1;
  object-fit: cover;
  transition: 0.1s ease-out;
  z-index: 0;
  cursor: pointer;
  &:hover {
    filter: none;
    opacity: 0.9;
    transition: 0.1s ease-in;
  }
  ${mobile({
    width: "100%",
  })}
  ${tablet({
    width: "100%",
  })}

${mcBook({
    height: "90%",
    width: "100%",
  })}
`;

// Quote Component to display random quotes
const Quote = styled.p`
  margin-top: 0%;
  margin-left: 0%;
  position: absolute;
  font-size: 2.102vw;
  font-weight: 600;
  color: #8e2008;
  z-index: 1;
  ${mobile({
    fontSize: "3",
    marginLeft: "2vw",
    marginRight: "2vw",
  })}
  ${tablet({
    fontSize: "2.5vw",
  })}
`;

const Board = () => {
  // useNavigate to navigate pages
  const navigate = useNavigate();

  // OpenProduct function that uses navigate to open products depends on product id
  const openProduct = (productId) => {
    navigate(`/products/${productId}`);
  };

  // useState hook to setProducts
  const [products, setProducts] = useState([]);

  /* useEffect Hook to fetch Products from API using axios's public request 
  without any dependencies */
  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await publicRequest.get("/products/allproducts");
        setProducts(res.data);
      } catch (err) {}
    };
    getProducts();
  }, []);

  return (
    <Container>
      <Wrapper>
        {/* *using sort, slice, and map method to generate 
        random single quotes from Quotes Array*/}
        {Quotes.sort(() => 0.5 - Math.random())
          .slice(0, 1)
          .map((quote) => (
            <Quote key={quote}>{quote.toUpperCase()}</Quote>
          ))}
        {/* *using map, slice, and map to generate randomm 3 products images from 
        poroducts array, when clicked navigates to the specific product displayed*/}
        {products
          .sort(() => 0.5 - Math.random())
          .slice(0, 3)
          .map((product) => (
            <Image
              key={product._id}
              onClick={() => openProduct(product._id)}
              src={product.images[1]}
            ></Image>
          ))}
      </Wrapper>
    </Container>
  );
};

export default Board;
