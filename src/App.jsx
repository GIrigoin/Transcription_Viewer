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
import Paper from "@mui/material/Paper";
// import { palette } from "@mui/system";
import {
  blueGrey,
  purple,
  grey,
  yellow,
  lightBlue,
  teal,
} from "@mui/material/colors";
// import ReactAudioPlayer from "react-audio-player";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { AudioVisualizer } from "react-audio-visualize";
import AudioVisual from "react-audio-visual";
import axios from "axios";

function App() {
  const [transcription, setTranscription] = useState([]);
  const [currentSegment, setCurrentSegment] = useState(-1);
  const myRef = useRef(null);

  useEffect(() => {
    const getTranscription = async () => {
      const { data } = await axios(
        "https://res.cloudinary.com/dyt4p8agq/raw/upload/v1720479186/xol1azvhus4oznorce7l.json"
      );
      setTranscription(data);
    };

    getTranscription();
  }, []);

  const mapTranscription = () => {
    return transcription.map((element, index) => (
      <Paper
        key={index}
        elevation={index === currentSegment ? 5 : 2}
        sx={{
          my: 1,
          p: 1,
          maxWidth: "60%",
          bgcolor:
            index === currentSegment
              ? teal[300]
              : element.role === "agent"
              ? lightBlue[100]
              : yellow[100],
          transform: index === currentSegment ? "scale(1.04)" : "none",
          transition: "all 0.3s ease-out",
          alignSelf: element.role === "agent" ? "flex-start" : "flex-end",
        }}
        onClick={() => handleButtonClick(index)}
      >
        <Typography
          variant="body2"
          sx={{
            fontWeight: index === currentSegment ? "bold" : "normal",
            color: grey[900],
          }}
        >
          {element.content}
        </Typography>
      </Paper>
    ));
  };

  const handleButtonClick = async (index) => {
    setCurrentSegment((prev) => index);
    myRef.current.audio.current.currentTime = transcription[index].start;
    myRef.current.audio.current.play();
  };

  const updateSegment = () => {
    const { currentTime } = myRef.current.audio.current;
    let newSegment = -1;
    for (let i = 0; i < transcription.length && newSegment === -1; i++) {
      if (
        currentTime >= transcription[i].start &&
        currentTime <= transcription[i].end
      )
        newSegment = i;

      if (newSegment !== -1 && newSegment !== currentSegment)
        setCurrentSegment((prev) => newSegment);
    }
  };

  const handleJumpClick = (way) => {
    if (
      currentSegment + way < transcription.length &&
      currentSegment + way > -1
    ) {
      myRef.current.audio.current.currentTime =
        transcription[currentSegment + way].start;
      myRef.current.audio.current.play();
      setCurrentSegment((prev) => prev + way);
    }
  };

  return (
    <>
      <Container maxWidth="md">
        <Box bgcolor={purple[200]} padding={3} borderRadius={4}>
          <Typography
            variant="h3"
            color={blueGrey[900]}
            fontWeight={"bold"}
            my={4}
          >
            Transcription Viewer V1
          </Typography>

          <Paper elevation={4} sx={{ my: 2, mx: 4, borderRadius: 3 }}>
            <Box height={200} bgcolor={blueGrey[800]}>
              {myRef?.current?.audio && (
                <AudioVisual audio={myRef?.current?.audio} />
              )}
            </Box>
            <AudioPlayer
              src="https://res.cloudinary.com/dyt4p8agq/video/upload/v1720479201/epn2vs0g0wxnowelcjef.wav"
              showSkipControls
              showJumpControls={false}
              ref={myRef}
              crossOrigin="*"
              listenInterval={100}
              onEnded={() => setCurrentSegment(-1)}
              onClickNext={() => handleJumpClick(1)}
              onClickPrevious={() => handleJumpClick(-1)}
              onListen={updateSegment}
            />
          </Paper>

          <Box m={4}>
            <Paper
              elevation={4}
              sx={{
                p: 3,
                display: "flex",
                flexDirection: "column",
              }}
            >
              {mapTranscription()}
            </Paper>
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default App;
