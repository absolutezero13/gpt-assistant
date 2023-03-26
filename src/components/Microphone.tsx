import { Button, Grid } from "@mui/material";
import { useEffect } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import styles from "../style/inputArea.module.css";

const Microphone = ({ setInput }: any) => {
  const { transcript, listening, isMicrophoneAvailable } =
    useSpeechRecognition();

  useEffect(() => {
    if (transcript) {
      setInput(transcript);
    }
  }, [transcript]);

  const handleRecord = () => {
    if (listening) {
      SpeechRecognition.stopListening();
    } else {
      SpeechRecognition.startListening({
        language: "tr-TR",
      });
    }
  };

  return (
    <Button
      className={styles.button}
      sx={{
        width: "7rem",
      }}
      variant="outlined"
      onClick={handleRecord}
    >
      <KeyboardVoiceIcon />
      {listening ? "Stop" : "Record"}
    </Button>
  );
};

export default Microphone;
