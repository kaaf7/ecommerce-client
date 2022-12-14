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
import { mobile, tablet } from "../responsive";

import Video1 from "../videos/Video_1.mp4";
import Video2 from "../videos/Video_2.mp4";
import Video3 from "../videos/Video_3.mp4";


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
    height: "28vh",
    marginTop: "13vh",
  })}
`;

const Wrapper = styled.div`
  height: 100%;

  cursor: pointer;
`;
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

// video array
const VideosArray = [Video1, Video2, Video3];
// get random number between 0 and 3 to shoow video
const randomVideo = Math.floor(Math.random() * 5);

// audio controller container
const AudioController = styled.div`
  width: 1.051vw;
  height: 1.051vw;
  position: absolute;
  left: 7vw;
  top: 12vh;
  background-color: none;
  opacity: 1;
  display: flex;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  z-index: 1;
  cursor: pointer;
  ${mobile({
    left: "10%",
    top: "15%",
    width: ".5vw",
    height: ".5vw",
  })}
  ${tablet({
    left: "5%",
    top: "13%",
    width: "1.051vw",
    height: "1.051vw",
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
          src={VideosArray[randomVideo]}
          autoPlay
          muted={muted}
          loop={true}
          playsinline
        />
      </Wrapper>
    </Container>
  );
};

export default VideoPlayer;
