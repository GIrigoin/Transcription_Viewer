import { useEffect, useState } from "react";
import "./App.css";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { readFile } from "node:fs";

function App() {
  const [transcription, setTranscription] = useState([]);

  useEffect(() => {
    const getTranscription = async () => {
      const data = await readFile("./assets/transcription.json");
      console.log(data);
    };
  }, []);

  return (
    <>
      <Container maxWidth="xs">
        <Typography variant="h2" color="initial">
          Transcription Viewer V1
        </Typography>
      </Container>
    </>
  );
}

export default App;
