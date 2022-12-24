/* * 👇
 *This is Home Page
 *Created and styled with Styled Component
 *It will display Navbar, VideoPlayer, and other components
 */

// import React and useEffect Hook
import { React, useEffect } from "react";

// import styled Components
import styled from "styled-components";

// import useDispatch activate redux reducers and useSelector to get state
import { useDispatch, useSelector } from "react-redux";

// import registerDone reducer from user Slice
import { registerDone } from "../redux/userRedux";

// import Navbar Component
import { Navbar } from "../Components/Navbar";

// import VideoPlayer Component
import VideoPlayer from "../Components/VideoPlayer";

// import Sale Display Component
import Sale from "../Components/Sale";

// import Highlights Display Component
import Highlights from "../Components/Highlights";

// import Footer Component
import Footer from "../Components/Footer";

// import Explore display Component
import Explore from "../Components/Explore";

// import Board display Component
import Board from "../Components/Board";
// import responsive back button
import ResBackButton from "../Components/ResBackButton";

// import responsive Settings from responsive.js
import { mobile } from "../responsive";

// items Container
const Container = styled.div`
  overflow: hidden;
  ${mobile({
    height: "350%"
  })}
`;
// items Werapper
const Wrapper = styled.div`
  overflow: hidden;
`;

const Home = () => {
  // activate dispatch
  const dispatch = useDispatch();
  // check if registeration is done
  const registeration = useSelector((state) => state.user.registerationSuccess);
  // useEffect if new user signedup then dispaatch registerDone reducer
  useEffect(() => {
    if (registeration) {
      dispatch(registerDone());
    }
  }, [registeration, dispatch]);
  return (
    <Container>
      <Navbar></Navbar>

      <Wrapper>
        <ResBackButton />
        <VideoPlayer />
        <Board></Board>
        <Sale></Sale>
        <Highlights></Highlights>
        <Explore></Explore>
        <Footer></Footer>
      </Wrapper>
    </Container>
  );
};

export default Home;
