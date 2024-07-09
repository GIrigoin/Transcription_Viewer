import { useEffect, useState, useRef } from "react";
import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
// import ReactAudioPlayer from "react-audio-player";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { AudioVisualizer } from "react-audio-visualize";
import AudioVisual from "react-audio-visual";
import axios from "axios";

function App() {
  const [transcription, setTranscription] = useState([]);
  const myRef = useRef(null);

  useEffect(() => {
    const getTranscription = async () => {
      const { data } = await axios(
        "https://res.cloudinary.com/dyt4p8agq/raw/upload/v1720479186/xol1azvhus4oznorce7l.json"
      );
      console.log(data);
      setTranscription(data);
    };

    getTranscription();
  }, []);

  const handleButtonClick = async () => {
    // const player = new Audio(
    //   "https://res.cloudinary.com/dyt4p8agq/video/upload/v1720479201/epn2vs0g0wxnowelcjef.wav"
    // );
    // await player.play();
    myRef.current.audio.current.currentTime = 30;
    myRef.current.audio.current.play();
  };

  return (
    <>
      <Container maxWidth="md">
        <Typography variant="h2" color="initial">
          Transcription Viewer V1
        </Typography>

        {/* {myRef?.current?.audio && (
          <AudioVisualizer
            // ref={visualizerRef}
            blob={new Blob(myRef.current.audio.current.audioTracks)}
            width={500}
            height={75}
            barWidth={1}
            gap={0}
            barColor={"#f76565"}
          />
        )} */}
        {/* <div
          style={{
            width: "100%",
            maxWidth: 600,
            height: "200px",
            margin: "0 auto",
          }}
        > */}
        <Box height={200} maxHeight={480} bgcolor={"secondary.light"}>
          {myRef?.current?.audio && (
            <AudioVisual audio={myRef?.current?.audio} />
          )}
        </Box>
        {/* </div> */}

        <AudioPlayer
          src="https://res.cloudinary.com/dyt4p8agq/video/upload/v1720479201/epn2vs0g0wxnowelcjef.wav"
          showSkipControls
          showJumpControls={false}
          ref={myRef}
          crossOrigin="*"
        />
        {/* <ReactAudioPlayer
          src="https://res.cloudinary.com/dyt4p8agq/video/upload/v1720479201/epn2vs0g0wxnowelcjef.wav"
          controls
          ref={(element) => {
            this.rap = element;
          }}
        ></ReactAudioPlayer> */}
        <Button variant="contained" onClick={handleButtonClick}>
          Sonidete
        </Button>
      </Container>
    </>
  );
}

export default App;
