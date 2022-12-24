/* *👇
 *This is Video Player Component
 *cretaed and styled with Styled Component
 *It will show random fashion videos
 *it also directs user to all products when clicked
 */

// import React
import React from "react";

// impor useState Hook
import { useState } from "react";

// import Styled Components
import styled from "styled-components";

// import useNavigate to redirect to pages
import { useNavigate } from "react-router-dom";

//import responsive Settings from responsive.js
import { mobile, tablet, mcBook } from "../responsive";

import Video1 from "../videos/Video_1.mp4";

// import audio on icon
import VolumeUpRoundedIcon from "@mui/icons-material/VolumeUpRounded";

// import audio off icon
import VolumeOffRoundedIcon from "@mui/icons-material/VolumeOffRounded";

// all Components Container
const Container = styled.div`
  margin-top: 9vh;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 110vh;
  border-bottom: 1px solid lightgray;
  ${mobile({
    width: "100%",
    height: "35vh",
    marginTop: "13vh",
  })}
  ${tablet({
    width: "100%",
    height: "45vh",
    marginTop: "13vh",
  })}
`;

const Wrapper = styled.div`
  height: 100%;
  position: relative;
  cursor: pointer;
`;

// video display
const Video = styled.video`
  height: 90%;

  cursor: pointer;
  ${mobile({
    width: "100%",
  })}
  ${tablet({
    height: "100%",
  })}
`;

// audio controller container
const AudioController = styled.div`
  width: 1.051vw;
  height: 1.051vw;
  position: absolute;
  left: 11%;
  top: 15%;
  background-color: none;
  opacity: 1;
  display: flex;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  z-index: 1;
  cursor: pointer;
  top: 5%;
  left: 5%;
  transform: translate(-50%, -50%);
  ${mobile({
    display: "none",
  })}
  ${tablet({
    left: "10%",
    top: "5%",

    width: "1vw",
    height: "1vw",
  })}
  ${mcBook({
    left: "10%",
    top: "5%",

    width: "1vw",
    height: "1vw",
  })}
`;

const VideoPlayer = () => {
  //useNavigate to navigate pages
  const navigate = useNavigate();
  // video mute state
  const [muted, setMuted] = useState(true);
  // handleMuted function changes mute state if muted to unmuted and vice versa
  const handleMuted = () => {
    muted ? setMuted(false) : setMuted(true);
  };
  return (
    <Container>
      <Wrapper>
        {/* if muted turn icon it into unmuted else turn it into muted*/}
        <AudioController onClick={handleMuted}>
          {muted ? (
            <VolumeOffRoundedIcon sx={{ color: "white" }} />
          ) : (
            <VolumeUpRoundedIcon sx={{ color: "white" }} />
          )}
        </AudioController>
        <Video
          onClick={() => {
            navigate("/products");
          }}
          src={Video1}
          autoPlay
          muted={muted}
          loop={true}
          playsinline
        ></Video>
      </Wrapper>
    </Container>
  );
};

export default VideoPlayer;
