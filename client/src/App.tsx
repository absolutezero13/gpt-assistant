import { useState } from "react";
import { createChatCompletion } from "./api/gpt";
import "./App.css";
import { Prompt, prompts } from "./data/prompts";
import { Messages } from "./components/Messages";
import { InputArea } from "./components/InputArea";
import { Message } from "./api/types";
import { PromptOptions } from "./components/PromptOptions";
import { SideBar } from "./components/SideBar";
import { Grid } from "@mui/material";
import { messages as mockMessages } from "./data/mocks";

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt>(prompts.default);
  const [pending, setPending] = useState(false);

  const sendMessage = async (text: string) => {
    if (!text) return;
    try {
      setPending(true);
      setInput("");
      setMessages((prev) => [
        ...prev,
        {
          role: "user",
          content: text,
        },
      ]);
      let conversationHistory = "";
      if (selectedPrompt.shouldRememberConversation) {
        conversationHistory = messages
          .map((message) => message.content)
          .join("\n");
      }

      const prompt = `${selectedPrompt.text}${conversationHistory}\n${text}`;

      const res = await createChatCompletion(prompt);
      console.log("res", res);

      setMessages((prev) => [
        ...(prev as Message[]),
        res.choices[0].message as Message,
      ]);
    } catch (error) {
      console.log(error);
    } finally {
      setPending(false);
    }
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
        <Messages
          messages={messages}
          pending={pending}
          selectedPrompt={selectedPrompt}
        />
        <InputArea
          sendMessage={sendMessage}
          input={input}
          setInput={setInput}
          pending={pending}
        />
      </Grid>
    </div>
  );
}

export default App;
