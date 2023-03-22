import { Button, Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";
import SendIcon from "@mui/icons-material/Send";

const InputArea = ({ sendMessage, input, setInput }: any) => {
  return (
    <Grid
      sx={{
        position: "relative",
        width: "100%",
        display: "flex",
      }}
    >
      <TextField
        multiline
        value={input}
        rows={2}
        sx={{
          backgroundColor: "#fff",
          borderRadius: "10px",
          flex: 1,
          paddingRight: "5rem",
        }}
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
        sx={{
          width: "5rem",
          position: "absolute",
          right: "0",
          height: "100%",
        }}
      >
        <SendIcon />
      </Button>
    </Grid>
  );
};

export { InputArea };
