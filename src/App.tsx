import { useEffect, useRef, useState } from "react";
import { createChatCompletion, getTokens, updateTokens } from "./api/gpt";
import "./App.css";
import { Messages } from "./components/Messages";
import { InputArea } from "./components/InputArea";
import { CustomUser, Message } from "./api/types";
import { SideBar } from "./components/SideBar";
import { Grid } from "@mui/material";
import styles from "./style/general.module.css";
import { initializeApp } from "firebase/app";
import usePrompts, { Prompt } from "./hooks/usePrompts";
import { useTranslation } from "react-i18next";
import { getAuth, User } from "firebase/auth";
import {
  arrayUnion,
  doc,
  getDoc,
  getFirestore,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { firebaseConfig } from "./utils/firebaseConfig";

initializeApp(firebaseConfig);
const db = getFirestore();

function App() {
  const { t } = useTranslation();
  const prompts = usePrompts();
  const [input, setInput] = useState("");
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt>(prompts[0]);
  const [messagesHistory, setMessagesHistory] = useState<Message[]>([]);
  const [pending, setPending] = useState(false);
  const [tokens, setTokens] = useState<number | null>(null);
  const [user, setUser] = useState<CustomUser | null>(null);

  useEffect(() => {
    const auth = getAuth();
    auth.onAuthStateChanged(async function (user) {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const _doc = await getDoc(docRef);
        setUser(_doc.data() as CustomUser);
        if (_doc.exists()) {
          setMessagesHistory(_doc.data()?.messageHistory);
        } else {
          const userRef = doc(db, "users", user.uid);
          const userData = {
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            uid: user.uid,
            messageHistory: [],
            role: "user",
          };
          setDoc(userRef, userData);
          setUser(userData as CustomUser);
        }
      } else {
        setUser(null);
      }
    });
    getTokens().then((res) => {
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
      const userRef = doc(db, "users", user?.uid as string);
      const userMessage = {
        content: text,
        promptId: selectedPrompt.id,
        role: "user",
      };
      updateDoc(userRef, {
        messageHistory: arrayUnion(userMessage),
      });
      setPending(true);
      setInput("");
      setMessagesHistory((prev) => [...prev, userMessage as Message]);

      let conversationHistory = "";

      if (selectedPrompt.shouldRememberConversation) {
        conversationHistory += messagesHistory
          .slice(-5)
          .map((message) => `-${message.content}`)
          .join("\n");
      }

      const prompt = `${t(
        selectedPrompt.text
      )}${conversationHistory}\n-${text}`;

      const res = await createChatCompletion(prompt);

      if (res?.status === 402) {
        alert(
          "You have run out of tokens. Please purchase more tokens to continue using the app."
        );
        return;
      }

      const tokenResp = await updateTokens(res.usage.total_tokens);
      setTokens(tokenResp.tokenLimit - tokenResp.tokensUsed);

      const assistantMessage = {
        content: res.choices[0].message.content,
        promptId: selectedPrompt.id,
        role: "assistant",
      };

      updateDoc(userRef, {
        messageHistory: arrayUnion(assistantMessage),
      });
      setMessagesHistory((prev) => [...prev, assistantMessage as Message]);
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
  const getMessagesHistory = (): Message[] => {
    return messagesHistory.filter((el) => el.promptId === selectedPrompt.id);
  };
  return (
    <div className="App">
      <SideBar
        user={user}
        selectedPrompt={selectedPrompt}
        setSelectedPrompt={setSelectedPrompt}
      />
      <Grid
        sx={{
          height: "100dvh",
          paddingLeft: "0.2rem",
          paddingRight: "0.2rem",
          display: "flex",
          flexDirection: "column",
          flex: 1,
        }}
      >
        <Messages
          messages={getMessagesHistory()}
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
