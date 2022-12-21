/* * 👇
 *This is Navbar Component
 *Created and styled with Styled Component
 *Includes Shop Categories, Search Bar, Cart, Favorites, Login, Register, and profile
 */

// import React
import React from "react";

// import register Icon from material UI
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";

// import login Icon from material UI
import LockOpenIcon from "@mui/icons-material/LockOpen";

// import logout Icon from material UI
import LogoutIcon from "@mui/icons-material/Logout";

// import profile Icon from material UI
import Person3OutlinedIcon from "@mui/icons-material/Person3Outlined";

// import cart Icon from material UI
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";

// import search Icon from material UI
import SearchIcon from "@mui/icons-material/Search";

// import Favorite Icon from material UI
import Favorite from "@mui/icons-material/FavoriteBorderOutlined";

// import Cart Badge from material UI
import Badge from "@mui/material/Badge";

// import useState and useEffect from favorite slice
import { useState, useEffect } from "react";

// import Styled Components
import styled from "styled-components";

// import useNavigate to redirect to pages
import { useNavigate } from "react-router-dom";

// import currentUser and public axios request from services
import { publicRequest } from "../services";

// import responsive Settings from responsive.js
import { mobile, tablet } from "../responsive";

// import useDispatch activate redux reducers and useSelector to get state
import { useDispatch, useSelector } from "react-redux";

// import updateCart reduce from cart slice
import { updateCart } from "../redux/cartRedux";

// import updateFavorite reduce from favorite slice
import { updateFavorite } from "../redux/favoriteRedux";
// import hamburger menu button
import HamburgerMenu from "./HamburgerMenu";

// import useLocation to get product id
import { useLocation } from "react-router-dom";

// all Components Container
const Container = styled.div`
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  position: fixed;
  z-index: 9999;
  overflow: hidden;
  background-color: white;
  top: 0;
`;

// Announcement section for purchase over 50 euros*/
const Announcement = styled.div`
  height: 2vh;
  font-family: "Lexend", sans-serif;
  background-color: #fffffff5;
  color: #c40a0af5;
  display: flex;
  justify-content: center;
  align-items: center;
  // border-bottom: 0.5px solid lightgrey;
  font-size: 0.631vw;
  ${mobile({
    height: "2vh",
    fontSize: "1vh",
  })}
  ${tablet({
    height: "1vh",
    fontSize: "1vh",
  })}
`;

// Components Wrapper div
const Wrapper = styled.div`
  width: 100%;
  height: 9vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({
    display: "flex",
    width: "wrap-content",
    justifyContent: "center",
    height: "10vh",
  })}
  ${tablet({
    marginTop: "1%",
  })}
`;

// Shop Logo Text
const Logo = styled.h3`
  font-size: 1.576vw;
  flex: 2.5;
  font-family: "Lexend", sans-serif;
  color: #c40a0af5;
  cursor: pointer;
  ${mobile({ fontSize: "20 px", marginLeft: "1vw" })}
`;

// Navbar left Items together*/
const LeftItems = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 7.882vw;
  flex: 0.75;
  height: 100%;
  ${mobile({
    display: "none",
  })}
  ${tablet({
    marginLeft: "5%",
  })}
`;

// Navbar Center Items together
const CenterItems = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex: 2;
  ${mobile({ display: "none" })}
`;

// Navbar Right Items together*/
const RightItems = styled.div`
  display: flex;
  flex: 0.75;
  flex-direction: row;
  margin-right: 7.8125vw;
  height: 100%;
  width: 100%;
  justify-content: flex-end;

  ${mobile({
    marginTop: "10%",
    marginBottom: "5%",
    display: "flex",
    width: "10vw",
    justifyContent: "center",
    gap: "4vw",
    alignItems: "center",
    textAlign: "center",
    marginLeft: "3vw",
    marginRight: "3vw",
    flex: "2",
  })}
  ${tablet({
    marginRight: "5%",
  })}
`;

// Container for each separate item in Navbar
const MenuItem = styled.div`
  margin-right: 0.525vw;
  position: relative;
  color: grey;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  font-family: "Lexend", sans-serif;
  text-align: center;
  font-weight: 350;
  font-size: 0.683vw;
  transition: 0.2s;
  cursor: pointer;
  flex: 1;
  ${mobile({ fontSize: "1vh" })}
  ${tablet({ fontSize: "1vh" })}

  :hover {
    color: #000000;
  }
`;
// Container for each separate item in Navbar
const IconItem = styled.div`
  margin-right: 0px;
  position: relative;
  color: grey;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  font-family: "Lexend", sans-serif;
  text-align: center;
  font-weight: 350;
  font-size: 0.683vw;
  cursor: pointer;
  flex: 1;

  :hover {
    color: #000000;
  }

  ${mobile({ fontSize: "2vw", width: "2vw" })}
`;

// Container for each separate item in Navbar
const IconItemMobile = styled.div`
  margin-right: 0px;
  position: relative;
  font-family: "Lexend", sans-serif;
  display: none;

  ${mobile({
    display: "block",
    color: "#c40a0af5",
    fontWeight: "500",
    fontSize: "3vw",
  })}
`;

// Container for each separate item in Navbar
const IconsContainer = styled.div`
  color: grey;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 0.683vw;
  cursor: pointer;
  flex: 1;
  ${tablet({
    fontSize: "1vw",
    height: "1vh",
    width: "1vw",
  })}
`;

// Search bar Container
const SearchContainer = styled.div`
  width: 100%;
  height: 100%;
  flex-direction: flex-start;
`;

// Searchbar Component
const SearchInput = styled.input`
  border-bottom: 0.1px solid lightgrey;
  border-top: none;
  border-right: none;
  border-left: none;
  font-weight: 300;
  font-size: 14px;
  color: #434343;
  padding-left: 1vw;
  margin-right: 1vw;
  border-radius: 5px;
  width: 98%;
  font-family: "Lexend", sans-serif;
  ${mobile({ display: "none" })}
  &:focus {
    outline: 0.1px solid lightgrey;
    border-radius: 5px;
  }
`;

// Search results container
const SearchResultContainer = styled.li`
  width: 47%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: start;
  margin-left: 20;
  position: fixed;
  font-family: "Lexend", sans-serif;
  font-weight: 300;
  margin-top: 20px;
  border-radius: 10px;
  outline: 0.1px solid lightgrey;
  background-color: white;
`;

// Search results images
const SearchResultImage = styled.img`
  height: 40px;
  width: 30px;
  margin-right: 10px;
`;

// Search bar input text
const SearchText = styled.p`
  max-width: 100%;
  height: 15px;
  transition: 0.1s ease-in;
  margin: 0px;
  font-size: 14px;
  font-size: 14px;
  font-family: "Lexend", sans-serif;
  cursor: pointer;
  color: #6b6b6b;
  padding: 5px;
  flex: 1;
  :hover {
    border-radius: 10px;
    background-color: #f3f3f3;
  }
`;

export const Navbar = () => {
  // get location
  const location = useLocation();
  // get product category
  const category = location.pathname.split("/")[2];
  // get product category
  const explore = location.pathname.split("/")[1];

  //useNavigate to switch pages
  const navigate = useNavigate();
  // activate dispatch
  const dispatch = useDispatch();
  // useState hook to set products
  const [products, setProducts] = useState([]);
  // set the state of searchedProduct input from
  const [searchedProduct, setSearchedProducts] = useState("");

  // cart state from cart slice
  const cart = useSelector((state) => state.cart);
  // productAdded state to check if product is added to cart
  const productAdded = useSelector((state) => state.cart?.productAdded);
  // productAdded state to check if product is added to cart
  const productRemoved = useSelector((state) => state.cart?.productRemoved);
  // cart quantity state from reducer by measureing cart array length
  const cartQuantity = useSelector((state) => state.cart.products?.length);

  // favorites state from favorite slice
  const favorites = useSelector((state) => state.favorite);
  // favoriteAdded state to check if favorite is added to favorite
  const favoriteAdded = useSelector((state) => state.favorite.favoriteAdded);
  // favoriteRemoved state to check if favorite is removed from favorite
  const favoriteRemoved = useSelector(
    (state) => state.favorite.favoriteRemoved
  );
  // favorites quanitity from reducer by measureing favorites array length
  const favoritesQuantity = useSelector(
    (state) => state.favorite.favorites?.length
  );

  // current User from user reducer
  const user = useSelector((state) => state.user.currentUser);
  // get current User id
  const userId = user?._id;
  // logged in state from user reducer
  const loggedIn = useSelector((state) => state.user?.loggedIn);

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

  /* useEffect Hook to fetch update cart and favorites with dependencies */
  useEffect(() => {
    if ((user && productAdded) || (user && productRemoved)) {
      dispatch(updateCart(cart));
    } else if ((user && favoriteAdded) || (user && favoriteRemoved)) {
      dispatch(updateFavorite(favorites));
    }
  }, []);

  // NavigateDir depends on custome directory*/
  const NavigateDir = (directory) => {
    navigate(directory);
  };

  // openProduct function to navigate to Product page once pressed on product
  const openProduct = (productId) => {
    navigate(`/products/${productId}`);
    setSearchedProducts("");
  };

  // search filter based on prodict title name if it includes any of the input letters
  const searchFilter = products
    .filter((product) => {
      return product.productTitle.toLowerCase().includes(searchedProduct);
    })
    .slice(0, 5);

  return (
    <Container>
      <Wrapper>
        <LeftItems>
          <Logo
            onClick={() => {
              NavigateDir("/");
            }}
          >
            BANKAI.
          </Logo>
          <MenuItem
            onClick={() => {
              NavigateDir("/products");
            }}
            style={
              !category && explore === "products"
                ? { background: "lightgrey" }
                : { background: "none" }
            }
          >
            EXPLORE{" "}
          </MenuItem>
          <MenuItem
            onClick={() => {
              NavigateDir("/products/women");
            }}
            style={
              category && category === "women"
                ? { background: "lightgrey" }
                : { background: "none" }
            }
          >
            WOMEN
          </MenuItem>{" "}
          <MenuItem
            onClick={() => {
              NavigateDir("/products/men");
            }}
            style={
              category && category === "men"
                ? { background: "lightgrey" }
                : { background: "none" }
            }
          >
            MEN
          </MenuItem>
        </LeftItems>
        <CenterItems>
          {" "}
          <IconsContainer>
            <SearchIcon />
            <SearchContainer>
              <SearchInput
                onChange={(e) => {
                  setSearchedProducts(e.target.value);
                }}
                type="text"
                input={searchedProduct}
                placeholder="Search.."
              ></SearchInput>

              {/* if product search was initiated than show the result using array map mathod*/}
              {searchedProduct && (
                <SearchResultContainer>
                  {searchFilter.map((product, i) => (
                    <SearchText
                      key={i}
                      onClick={() => openProduct(product._id)}
                    >
                      {" "}
                      {/* show first image next to product title*/}
                      <SearchResultImage src={product.images[0]} />
                      {/* product title prop*/}
                      {product.productTitle}
                    </SearchText>
                  ))}
                </SearchResultContainer>
              )}
            </SearchContainer>
          </IconsContainer>
        </CenterItems>

        <RightItems>
          <HamburgerMenu />
          {/* if user is not logged in show login sign, else don't show it*/}
          {!loggedIn && (
            <IconItem
              onClick={() => {
                NavigateDir("/login");
              }}
            >
              {" "}
              <LockOpenIcon />
              SIGN IN
            </IconItem>
          )}

          {/* if user is not logged in show register sign, else don't show it*/}
          {!loggedIn && (
            <IconItem
              onClick={() => {
                NavigateDir("/register");
              }}
            >
              {" "}
              <PersonAddAltIcon />
              REGISTER
            </IconItem>
          )}

          <IconItem>
            {" "}
            {/* *cart icon that navigates to Cart using user id which is Cart also same as cart id in DB
             *badgeContent show the number of products in cart based On CartQuantity state from cart slice
             */}
            <Badge
              sx={{ transform: "scale(.9)", size: "0.631vw" }}
              onClick={() => {
                user
                  ? NavigateDir(`/cart/:${userId}`)
                  : NavigateDir(`/cart/:guest`);
              }}
              badgeContent={cartQuantity}
              color="error"
            >
              <LocalMallOutlinedIcon />
            </Badge>
            CART
          </IconItem>
          {/* *cart item sign that navigate to carte ending we user id
           *badgeContent show the number of products in cart based On CartQuantity state from cart slice
           */}
          <IconItem>
            <Badge
              sx={{ transform: "scale(.9)" }}
              onClick={() => {
                NavigateDir(`/products/favorite`);
              }}
              badgeContent={favoritesQuantity}
              color="error"
            >
              <Favorite color="black" />
            </Badge>{" "}
            FAVORITES{" "}
          </IconItem>
          {/* if user is not logged in show logout sign, else don't show it
           * after pressed clear local storage and then refresh page */}
          {loggedIn && (
            <IconItem
              style={{ color: "grey" }}
              onClick={(e) => {
                e.preventDefault();
                localStorage.clear();
                //localStorage.removeItem("persist:root");
                window.location.reload();
              }}
            >
              <LogoutIcon />
              LOGOUT
            </IconItem>
          )}
          <IconItemMobile
            onClick={() => {
              NavigateDir("/");
            }}
          >
            BANKAI.
          </IconItemMobile>
        </RightItems>
      </Wrapper>
      <Announcement>FREE SHIPPING OVER € 50 ORDERS</Announcement>
    </Container>
  );
};
