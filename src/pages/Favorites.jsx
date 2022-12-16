/* * 👇
 *This is Favorites Page
 *Created and styled with Styled Component
 *It will display all favorite items in FavoriteCard component
 */

// import Styled Components
import styled from "styled-components";
// import navvbar component for navigation
import { Navbar } from "../Components/Navbar";
// import useSelector to get states from redux slices
import { useSelector } from "react-redux";
// import favorite card component that will display favorite items
import FavoriteCard from "../Components/FavoriteCard";
//import responsive Settings from responsive.js
import { mobile, tablet } from "../responsive";

import HeartBrokenOutlinedIcon from "@mui/icons-material/HeartBrokenOutlined";

const Container = styled.div`
  justify-content: center;
`;

// import Wrapper to wrap all components
const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  height: 100%;
  margin-left: 7.882vw;
  margin-right: 7.882vw;
  margin-top: 15vh;
  justify-content: center;
  align-items: center;
  gap: 1.314vw;
  position: relative;
  ${mobile({
    fontSize: "10px",
    gridTemplateColumns: " repeat(4, 1fr);",
  })}
  ${tablet({
    display: "grid",
    gridTemplateColumns: " repeat(4, 1fr)",
    fontSize: "1vh",
    marginLeft: "7.882vw",
    marginRight: "7.882vw",
  })}
`;

const EmptyFavorites = styled.p`
  display: flex;
  font-size: 2.5vw;
  font-family: "Lexend", sans-serif;
  color: #c40a0af5;
  font-weight: 200;
  justify-content: center;
`;

const Favorites = () => {
  // get favorite state from favorite slice
  const favorites = useSelector((state) => state.favorite?.favorites);

  return (
    <Container>
      <Navbar />
      {favorites.length > 0 ? (
        <Wrapper>
          {/*map favorite items into FavoriteCard*/}
          {favorites?.map((favorite) => (
            <FavoriteCard key={favorite._id} product={favorite} />
          ))}
        </Wrapper>
      ) : (
        <EmptyFavorites>
          FAVORITES IS EMPTY <HeartBrokenOutlinedIcon />
        </EmptyFavorites>
      )}
    </Container>
  );
};

export default Favorites;
