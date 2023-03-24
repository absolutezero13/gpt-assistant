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

function App() {
  const [input, setInput] = useState("");
  const [allPrompts, setAllPrompts] = useState<{ [key: string]: Prompt }>(
    prompts
  );
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt>(prompts.default);
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
      if (tokens <= 0) {
        alert(
          "You have run out of tokens. Please purchase more tokens to continue using the app."
        );
        return;
      }
      setPending(true);
      setInput("");

      setAllPrompts((prev) => ({
        ...prev,
        [selectedPrompt.key]: {
          ...selectedPrompt,
          messages: [
            ...selectedPrompt.messages,
            {
              role: "user",
              content: text,
            },
          ],
        },
      }));

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

      setAllPrompts((prev) => ({
        ...prev,
        [selectedPrompt.key]: {
          ...selectedPrompt,
          messages: [
            ...selectedPrompt.messages,
            res.choices[0].message as Message,
          ],
        },
      }));
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

  console.log("allPrompts", allPrompts);

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
      {tokens && (
        <div
          style={{
            position: "absolute",
            top: "0",
            right: "0",
            backgroundColor: "#fff",
            padding: "0.5rem",
            borderRadius: "0.5rem",
          }}
        >
          <p>TOKENS LEFT : {tokens} </p>
        </div>
      )}
    </div>
  );
}

export default App;
