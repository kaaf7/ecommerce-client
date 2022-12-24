/* *👇
 *This is Highlight section,
 *it is created and styled with Styled
 *Components will showcase products in HomePage
 */

// import React
import React from "react";

// import useState and useEffct
import { useState, useEffect } from "react";

// import Styled Components
import styled from "styled-components";

// import product Card that will contain all products info and image
import ProductCard from "./ProductCard";

// import responsive Settings from responsive.js
import { mobile, tablet, mcBook } from "../responsive";

// import public request from axios services
import { publicRequest } from "../services";

// all Components Container
const Container = styled.div`
  width: 100%;
  height: 95vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  ${mobile({
    display: "none",
  })}
  ${tablet({
    display: "none",
  })}
  ${mcBook({
    display: "none",
  })}
`;

// Components Wrapper
const Wrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: space-evenly;
  gap: 25px;
  align-items: center;
  margin-left: 7.82vw;
  margin-right: 7.82vw;
`;

const Highlights = () => {
  // useState to set products and display them  in the highlight section
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
      {/*show first 4 products */}
      <Wrapper>
        {products
          .sort(() => 0.5 - Math.random())
          .slice(0, 4)
          .map((product) => (
            <ProductCard key={product._id} product={product} category="" />
          ))}
      </Wrapper>
    </Container>
  );
};

export default Highlights;
