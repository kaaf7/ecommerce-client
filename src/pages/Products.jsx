/* * 👇
 *This is Products  page
 *Created and styled with Styled Component
 *It will display all the products based on category,filters, and sort
 */

//import react and useState
import React, { useState } from "react";
// uselocation to get page lcoation
import { useLocation } from "react-router-dom";

// import styled Components
import styled from "styled-components";

// import Navbar
import { Navbar } from "../Components/Navbar";

// import footer
import Footer from "../Components/Footer";

// import Explore display
import Explore from "../Components/Explore";

// import Board display
import Board from "../Components/Board";

// import responsive Settings from responsive.js
import { mobile } from "../responsive";

// import productList that will contain all products
import ProductList from "../Components/ProductList";

// all components container
const Container = styled.div`
  background-color: #ffffff;
  overflow: hidden;
`;
// filter wrapper
const FilterWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 5vw;
  margin-left: 7.882vw;
  margin-right: 7.882vw;
  margin-top: 9vh;
  position: relative;
  height: 10vh;
`;

// select filter
const Filter = styled.select`
  border: none;
  font-size: 1.5vh;
  font-family: bolder;
  color: grey;
  font-weight: 200;
  font-family: "Lexend", sans-serif;
  &:focus {
    outline: none;
    margin-top: 0;
  }
  ${mobile({
    width: "100%",
    fontSize: "1vh",
  })}
`;

const Products = () => {
  // set filter object
  const [filters, setFilters] = useState({});
  // set sort as ascending
  const [sort, setSort] = useState("ascending");
  // get location to determine category
  const location = useLocation();
  // get cateogory using location
  const category = location.pathname.split("/")[2];

  /* handleFilters funtion that will use filters name as value to 
  setFilters and then add old filters to new ones using spread ope */
  const handleFilters = (e) => {
    const value = e.target.value;
    setFilters({
      ...filters,
      [e.target.name]: value,
    });
  };
  // handleSort function will set sort according to input value
  const handleSort = (e) => {
    setSort(e.target.value);
  };

  return (
    <Container>
      <Navbar></Navbar>
      <FilterWrapper>
        <Filter name="colors" id="colors" onChange={handleFilters}>
          <option selected disabled>
            COLOR
          </option>
          <option>GREEN</option>
          <option>BLACK</option>
          <option>BLUE</option>
          <option>YELLOW</option>
          <option>WHITE</option>
          <option>GREY</option>
        </Filter>
        <Filter
          defaultValue={"DEFAULT"}
          name="category"
          id="style"
          onChange={handleFilters}
        >
          <option value="DEFAULT" disabled>
            STYLE
          </option>
          <option>JACKETS</option>
          <option>SHIRTS</option>
          <option>T-SHIRTS</option>
          <option>TROUSERS</option>
        </Filter>
        <Filter name="category">
          <option selected disabled>
            CATEGORY
          </option>
          {category ? (
            <option>{category.toUpperCase()}</option>
          ) : (
            <option>no category</option>
          )}
        </Filter>
        <Filter onChange={handleSort}>
          <option selected disabled>
            PRICE
          </option>
          <option value="ascending">ASCENDING</option>
          <option value="descending">DESCENDING</option>
        </Filter>
      </FilterWrapper>
      <ProductList cat={category} filters={filters} sort={sort} />
      <Board></Board>
      <Explore></Explore>
      <Footer></Footer>
    </Container>
  );
};

export default Products;
