import { useState } from "react";
import { createChatCompletion } from "./api/gpt";
import "./App.css";
import { prompts } from "./data/prompts";
import { Messages } from "./components/Messages";
import { InputArea } from "./components/InputArea";
import { Message } from "./api/types";
import { PromptOptions } from "./components/PromptOptions";
import { SideBar } from "./components/SideBar";
import { Grid } from "@mui/material";
import { messages as mockMessages } from "./data/mocks";

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [selectedPrompt, setSelectedPrompt] = useState<string>(
    Object.keys(prompts)[0]
  );
  const [pending, setPending] = useState(false);

  const sendMessage = async (text: string) => {
    if (!text) return;
    setPending(true);
    setInput("");
    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: text,
      },
    ]);

    const prompt = `${prompts[selectedPrompt]}\n${text}`;

    const res = await createChatCompletion(prompt);

    setMessages((prev) => [
      ...(prev as Message[]),
      res.choices[0].message as Message,
    ]);

    setPending(false);

    console.log("res", res);
  };

  return (
    <div className="App">
      {/* <Microphone sendMessage={sendMessage} /> */}
      <SideBar
        selectedPrompt={selectedPrompt}
        setSelectedPrompt={setSelectedPrompt}
      />
      <Grid
        sx={{
          width: "100%",
          paddingLeft: "2rem",
          paddingRight: "2rem",
          display: "flex",
          flexDirection: "column",
          maxHeight: "100dvh",
        }}
      >
        <Messages messages={messages} pending={pending} />
        <InputArea
          sendMessage={sendMessage}
          input={input}
          setInput={setInput}
        />
      </Grid>
    </div>
  );
}

export default App;
