import { Button } from "@mui/material";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const Microphone = ({ sendMessage }: any) => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  return (
    <div
      style={{
        color: "#fff",
      }}
    >
      <p>Microphone: {listening ? "on" : "off"}</p>
      <Button
        variant="outlined"
        onClick={() =>
          SpeechRecognition.startListening({
            continuous: true,
            language: "tr-TR",
          })
        }
      >
        Start
      </Button>
      <Button
        variant="outlined"
        onClick={() => {
          SpeechRecognition.stopListening();
          sendMessage(transcript);
        }}
      >
        Stop
      </Button>
      <Button variant="outlined" onClick={resetTranscript}>
        Reset
      </Button>
      <p>{transcript}</p>
    </div>
  );
};

export default Microphone;
