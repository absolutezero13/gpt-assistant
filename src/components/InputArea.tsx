import { Button, TextField } from "@mui/material";
import { useState } from "react";

const InputArea = ({ sendMessage, input, setInput }: any) => {
  return (
    <>
      <TextField
        id="outlined-multiline-static"
        label=""
        multiline
        rows={4}
        value={input}
        sx={{
          backgroundColor: "#fff",
          borderRadius: "10px",
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
        variant="outlined"
        onClick={() => sendMessage(input)}
        sx={{
          marginTop: "1rem",
        }}
      >
        Send Message
      </Button>
    </>
  );
};

export { InputArea };
