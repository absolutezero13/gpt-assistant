import { Button, Grid, Skeleton } from "@mui/material";
import { useEffect } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import styles from "../style/inputArea.module.css";

const Microphone = ({ setInput, isSmall }: any) => {
  const { transcript, listening, isMicrophoneAvailable, resetTranscript } =
    useSpeechRecognition();

  useEffect(() => {
    if (transcript) {
      setInput(transcript);
    }
  }, [transcript]);

  const handleRecord = () => {
    if (listening) {
      SpeechRecognition.stopListening();
      resetTranscript();
    } else {
      SpeechRecognition.startListening({
        language: "tr-TR",
        continuous: true,
      });
    }
  };

  return (
    <Button
      sx={{
        width: isSmall ? "2rem" : "7rem",
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
      }}
      variant="outlined"
      onClick={handleRecord}
    >
      {listening ? (
        <Skeleton
          sx={{ bgcolor: "red", borderRadius: 99, mr: isSmall ? 0 : 1 }}
          variant="rectangular"
          width={20}
          height={20}
        />
      ) : (
        <KeyboardVoiceIcon />
      )}
      {isSmall ? null : listening ? "Stop" : "Record"}
    </Button>
  );
};

export default Microphone;
