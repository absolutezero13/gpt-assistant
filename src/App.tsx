import { useEffect, useState } from "react";
import { createChatCompletion, getTokens, updateTokens } from "./api/gpt";
import "./App.css";
import { Prompt, prompts, rememberPrompt } from "./data/prompts";
import { Messages } from "./components/Messages";
import { InputArea } from "./components/InputArea";
import { Message } from "./api/types";
import { SideBar } from "./components/SideBar";
import { Box, Grid, MenuItem, Select } from "@mui/material";
import styles from "./style/general.module.css";
import { initializeApp } from "firebase/app";
import { useWindowSize } from "./hooks/useWindowSize";
import { breakPoints } from "./style/breakPoints";
import Microphone from "./components/Microphone";
import { availabeLanguages } from "./utils/contants";
import { useTranslation } from "react-i18next";
import { makeStyles, withStyles } from "@material-ui/styles";
import { CheckCircleOutline } from "@mui/icons-material";

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

const useStyles = makeStyles({
  select: {
    "&:before": {
      borderColor: "white",
    },
    "&:after": {
      borderColor: "white",
    },
    "&:not(.Mui-disabled):hover::before": {
      borderColor: "white",
    },
  },
  icon: {
    fill: "white",
  },
  root: {
    color: "white",
  },
});

function App() {
  const { width } = useWindowSize();
  const { t, i18n } = useTranslation();
  const [input, setInput] = useState("");
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt>(prompts[0]);
  const [messages, setMessages] = useState<Message[]>(selectedPrompt.messages);
  const [pending, setPending] = useState(false);
  const [tokens, setTokens] = useState<number | null>(null);
  const classes = useStyles();

  useEffect(() => {
    getTokens().then((res) => {
      console.log("res", res);
      setTokens(res.tokenLimit - res.tokensUsed);
    });
  }, []);

  const onLanguageChange = (e: any) => {
    i18n.changeLanguage(e.target.value);
  };

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
        <Select
          displayEmpty
          className={styles.select}
          value={i18n.language.toUpperCase()}
          sx={{
            width: "7rem",
            color: "#fff",
            marginTop: "1.5rem",
            ".MuiOutlinedInput-notchedOutline": {
              borderColor: "#fff",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#fff",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#fff",
            },
            ".MuiSvgIcon-root ": {
              fill: "white !important",
            },
          }}
          inputProps={{
            MenuProps: {
              MenuListProps: {
                sx: {
                  backgroundColor: "#fff",
                },
              },
            },
          }}
          onChange={onLanguageChange}
          renderValue={(value: string) => {
            return (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <img
                  src={
                    availabeLanguages.find(
                      (lang) => lang.code === i18n.language
                    )!.image
                  }
                  alt="flag"
                  style={{ width: "1.5rem", marginRight: "0.5rem" }}
                />
                {value}
              </Box>
            );
          }}
        >
          {availabeLanguages.map((lang) => (
            <MenuItem
              key={lang.code}
              value={lang.code}
              onClick={onLanguageChange}
            >
              {lang.name}
              {lang.code === i18n.language && (
                <CheckCircleOutline sx={{ color: "green", ml: 2 }} />
              )}
            </MenuItem>
          ))}
        </Select>
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
