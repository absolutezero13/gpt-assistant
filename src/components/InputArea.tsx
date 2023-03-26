import { Button, Grid, TextField, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import styles from "../style/inputArea.module.css";
import Microphone from "./Microphone";

const InputArea = ({ sendMessage, input, setInput, pending }: any) => {
  return (
    <Grid className={styles.wrapper}>
      <TextField
        multiline
        value={input}
        rows={2}
        disabled={pending}
        className={styles.input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            sendMessage(input);
          }
        }}
        placeholder="Enter your message"
      />
      <Button
        disabled={pending}
        variant="contained"
        color="secondary"
        onClick={() => sendMessage(input)}
        className={styles.button}
      >
        <SendIcon />
      </Button>
      {/* <Microphone setInput={setInput} /> */}
    </Grid>
  );
};

export { InputArea };
