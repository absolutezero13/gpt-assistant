import { useEffect, useState } from "react";
import { createChatCompletion, getTokens, updateTokens } from "./api/gpt";
import "./App.css";
import { Prompt, prompts, rememberPrompt } from "./data/prompts";
import { Messages } from "./components/Messages";
import { InputArea } from "./components/InputArea";
import { Message } from "./api/types";
import { PromptOptions } from "./components/PromptOptions";
import { SideBar } from "./components/SideBar";
import { Grid } from "@mui/material";
import { messages as mockMessages } from "./data/mocks";
import styles from "./style/general.module.css";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { useWindowSize } from "./hooks/useWindowSize";
import { breakPoints } from "./style/breakPoints";
import Microphone from "./components/Microphone";

const firebaseConfig = {
  apiKey: "AIzaSyDVFWzJrFXvzu7962RLpGso5zpUeldNWrU",
  authDomain: "gpt-assistant-19b00.firebaseapp.com",
  projectId: "gpt-assistant-19b00",
  storageBucket: "gpt-assistant-19b00.appspot.com",
  messagingSenderId: "295539962308",
  appId: "1:295539962308:web:687bfd659df2ea8a42b491",
  measurementId: "G-EC4RWL1DT9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

function App() {
  const { width } = useWindowSize();
  const [input, setInput] = useState("");
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt>(prompts[0]);
  const [messages, setMessages] = useState<Message[]>(selectedPrompt.messages);
  const [pending, setPending] = useState(false);
  const [tokens, setTokens] = useState<number | null>(null);

  useEffect(() => {
    getTokens().then((res) => {
      console.log("res", res);
      setTokens(res.tokenLimit - res.tokensUsed);
    });
  }, []);

  const sendMessage = async (text: string) => {
    if (!text) return;
    try {
      if (tokens! <= 0) {
        alert(
          "You have run out of tokens. Please purchase more tokens to continue using the app."
        );
        return;
      }
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
        conversationHistory += rememberPrompt;
        conversationHistory += messages
          .slice(-5)
          .map((message) => `-${message.content}`)
          .join("\n");
      }

      const prompt = `${selectedPrompt.text}${conversationHistory}\n-${text}`;

      const res = await createChatCompletion(prompt);
      console.log("createChatCompletion res", res);
      if (res?.status === 402) {
        alert(
          "You have run out of tokens. Please purchase more tokens to continue using the app."
        );
        return;
      }

      const tokenResp = await updateTokens(res.usage.total_tokens);
      console.log("tokenResp", tokenResp);
      setTokens(tokenResp.tokenLimit - tokenResp.tokensUsed);

      setMessages((prev) => [
        ...(prev as Message[]),
        res.choices[0].message as Message,
      ]);
    } catch (error: any) {
      console.log("error", error);
      if (error.response.status === 402) {
        alert(
          "You have run out of tokens. Please purchase more tokens to continue using the app."
        );
      }

      console.log(error);
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="App">
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
          maxHeight: width <= breakPoints.sm ? "85dvh" : "100vh",
          flex: 1,
        }}
      >
        <Messages
          messages={messages}
          pending={pending}
          selectedPrompt={selectedPrompt}
        />
        <InputArea
          sendMessage={sendMessage}
          selectedPrompt={selectedPrompt}
          input={input}
          setInput={setInput}
          pending={pending}
        />
      </Grid>
      {tokens && (
        <Grid className={styles.tokens}>
          <p>TOKENS LEFT : {tokens} </p>
        </Grid>
      )}
    </div>
  );
}

export default App;
