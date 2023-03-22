import { Button, Grid, TextField, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import styles from "../style/inputArea.module.css";

const InputArea = ({ sendMessage, input, setInput }: any) => {
  return (
    <Grid className={styles.wrapper}>
      <TextField
        multiline
        value={input}
        rows={2}
        className={styles.input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            sendMessage(input);
          }
        }}
        placeholder="Enter your message"
      />
      <Button
        variant="contained"
        color="secondary"
        onClick={() => sendMessage(input)}
        className={styles.button}
      >
        <SendIcon />
      </Button>
    </Grid>
  );
};

export { InputArea };
