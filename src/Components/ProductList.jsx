/* *👇
 *This is a Product List  Component
 *Styled with Styled Components
 *It will show a grid of all products that are displyed Inside of Product Cards
 *It will be displayed in products page based on categories like women's cloths or men's
 */

// import React
import React from "react";

// import Styled Components
import styled from "styled-components";

// import useState and useEffect Hook from React
import { useState, useEffect } from "react";



// import product Card for product image and infos
import ProductCard from "./ProductCard";

// import responsive Settings from responsive.js
import { mobile, tablet } from "../responsive";

// import axios request services
import { publicRequest } from "../services";

// container of all components
const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  margin-bottom: 10vh;
  margin-left: 7.882vw;
  margin-right: 7.882vw;
  justify-content: center;
  align-items: center;
  gap: 25px;
  position: relative;
  ${mobile({
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr);",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "15vw",
  })}
  ${tablet({
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr);",
    justifyContent: "center",
    alignItems: "center",
  })}
`;

const ProductList = ({ filters, cat, sort }) => {
  /* useState hook to set products*/
  const [products, setProducts] = useState([]);

  // filtered products
  const [filteredProducts, setFilteredProducts] = useState([]);

  /* useEffect hook calling getProducts function to 
  get product through a public request from DB if there is no category then show all products */

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await publicRequest.get(
          cat
            ? `/products/allproducts?category=${cat}`
            : `/products/allproducts`
        );
        // sort product by newest product created
        const ProductArray = res.data.sort((a, b) => a.createdAt > b.createdAt ? -1 : 1)
        setProducts(ProductArray);
      } catch (err) {}
    };

    getProducts();
  }, [cat]);

  // useEffect to filter products according to products, catrgory, filters
  useEffect(() => {
    if (filters) {
      setFilteredProducts(
        products.filter((item) =>
          Object.entries(filters).every(([key, value]) =>
            item[key].includes(value.toLowerCase())
          )
        )
      );
    }
  }, [products, filters]);

  // useEffect to sort Products according Ascending and Descending price
  useEffect(() => {
    if (sort === "descending") {
      setFilteredProducts((products) =>
        [...products].sort((a, b) => b.price - a.price)
      );
    } else {
      setFilteredProducts((products) =>
        [...products].sort((a, b) => a.price - b.price)
      );
    }
  }, [sort]);

  return (
    <Container>
      {/* if products are filtered show only filtered Products else show all Products*/}
      {filters &&
        filteredProducts.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            category="products"
          />
        ))}
    </Container>
  );
};

export default ProductList;
