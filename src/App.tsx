import { useEffect, useMemo, useState } from "react";
import { createChatCompletion, getTokens } from "./api/gpt";
import "./App.css";
import { Messages } from "./components/Messages";
import { InputArea } from "./components/InputArea";
import { CustomUser, IMessage } from "./api/types";
import { SideBar } from "./components/SideBar";
import { Backdrop, CircularProgress, Grid } from "@mui/material";
import { initializeApp } from "firebase/app";
import { useTranslation } from "react-i18next";
import { getAuth, signInAnonymously } from "firebase/auth";
import {
  arrayUnion,
  doc,
  getDoc,
  getFirestore,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { firebaseConfig } from "./utils/firebaseConfig";
import { AlertDialog } from "./components/AlertDialog";
import { signOut } from "./providers/googleAuth";
import { SettingsDialog } from "./components/SettingsDialog";
import { v4 as uuid } from "uuid";
//@ts-ignore
import { useSpeechSynthesis } from "react-speech-kit";
import usePromptStore from "./zustand/prompts";

initializeApp(firebaseConfig);
const db = getFirestore();

function App() {
  const { t } = useTranslation();
  const { prompts } = usePromptStore();
  const { speak, cancel } = useSpeechSynthesis();
  const [input, setInput] = useState("");
  const [messagesHistory, setMessagesHistory] = useState<IMessage[]>([]);
  const [pending, setPending] = useState(false);
  const [tokens, setTokens] = useState<number | null>(null);
  const [user, setUser] = useState<CustomUser | null>(null);
  const [errorAlert, setErrorAlert] = useState<string | null>(null);
  const [logoutAlert, setLogoutAlert] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [appLoading, setAppLoading] = useState(true);
  const [userDocRef, setUserDocRef] = useState<any>(null);

  const selectedPrompt = useMemo(
    () => prompts.find((p) => p.selected)!,
    [prompts]
  );

  useEffect(() => {
    const auth = getAuth();
    getTokens().then((res) => {
      console.log(res);
      setTokens(res.tokenLimit - res.tokensUsed);
      setAppLoading(false);
    });

    auth.onAuthStateChanged(async function (user) {
      setAppLoading(true);
      if (user) {
        const docRef = doc(db, "users", user.uid);
        setUserDocRef(docRef);
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
            type: user.email ? "google" : "anonymous",
          };
          setDoc(userRef, userData);
          setUser(userData as CustomUser);
        }
      } else {
        // anonymous user
        console.log("HANDLING ANONYMOUS USER");
        signInAnonymously(auth).then((userCredential) => {
          console.log("signed in anonymously", userCredential);
          const userRef = doc(db, "users", userCredential.user.uid);
          const userData = {
            email: userCredential.user.email,
            displayName: "Anonymous Stranger",
            photoURL: userCredential.user.photoURL,
            uid: userCredential.user.uid,
            messageHistory: [],
            role: "user",
            type: userCredential.user.email ? "google" : "anonymous",
          };
          setDoc(userRef, userData);
          setUser(userData as CustomUser);
        });
      }
      setAppLoading(false);
    });
  }, []);

  const sendMessage = async (text: string) => {
    if (!text) return;

    if (!user) {
      setErrorAlert(t("alerts.login"));
      return;
    }

    try {
      if (tokens! <= 0 && !user?.apiKey) {
        setErrorAlert(t("alerts.noToken"));
        return;
      }
      const userRef = doc(db, "users", user?.uid as string);
      const userMessage = {
        id: uuid(),
        content: text,
        promptId: selectedPrompt.id,
        role: "user",
      } as IMessage;

      if (!selectedPrompt.isConversationPrivate) {
        await updateDoc(userRef, {
          messageHistory: arrayUnion(userMessage),
        });
      }

      setPending(true);
      setInput("");
      setMessagesHistory((prev) => [...prev, userMessage as IMessage]);

      let conversationHistory = "";

      if (selectedPrompt.shouldRememberConversation) {
        conversationHistory += filteredMessages
          .slice(-5)
          .map((message) => `-${message.content}`)
          .join("\n");
      }

      const prePrompt = `Call me ${user?.displayName} in your responses.`;

      const prompt = `${prePrompt}\n${t(
        selectedPrompt.text
      )}${conversationHistory}\n-${text}`;

      const res = await createChatCompletion(prompt, user);

      if (res?.error?.code === "invalid_api_key") {
        setErrorAlert(t("alerts.invalidApiKey"));
        return;
      }
      if (res?.status === 402) {
        setErrorAlert(t("alerts.noToken"));
        return;
      }

      const tokenResp = await getTokens();
      console.log(tokenResp);
      setTokens(tokenResp.tokenLimit - tokenResp.tokensUsed);

      const assistantMessage = {
        id: uuid(),
        content: res.choices[0].message.content,
        promptId: selectedPrompt.id,
        role: "assistant",
      } as IMessage;

      if (!selectedPrompt.isConversationPrivate) {
        await updateDoc(userRef, {
          messageHistory: arrayUnion(assistantMessage),
        });
      }

      setMessagesHistory((prev) => [...prev, assistantMessage as IMessage]);

      if (user?.settings?.voiceAnswer) {
        const voiceOptions = window.speechSynthesis.getVoices();
        cancel();
        speak({
          text: assistantMessage.content,
          voice: voiceOptions.find(
            (voice) => voice.name === user?.settings?.voiceChoice
          ),
        });
      }
    } catch (error: any) {
      console.log(error);
      setErrorAlert(t("alerts.generic"));
    } finally {
      setPending(false);
    }
  };

  const filteredMessages = useMemo(
    () => messagesHistory.filter((el) => el.promptId === selectedPrompt.id),
    [selectedPrompt, messagesHistory]
  );

  return (
    <div className="App">
      <SideBar
        user={user}
        selectedPrompt={selectedPrompt}
        setLogoutAlert={setLogoutAlert}
        setSettingsOpen={setSettingsOpen}
      />
      <Grid
        pl={0.2}
        pr={0.2}
        display="flex"
        flexDirection="column"
        flex={1}
        height="100dvh"
      >
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={appLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <Messages
          messages={filteredMessages}
          pending={pending}
          selectedPrompt={selectedPrompt}
          errorAlert={errorAlert}
          setErrorAlert={setErrorAlert}
          user={user}
        />
        <InputArea
          sendMessage={sendMessage}
          selectedPrompt={selectedPrompt}
          input={input}
          setInput={setInput}
          pending={pending}
        />
      </Grid>
      <AlertDialog
        open={logoutAlert}
        setOpen={setLogoutAlert}
        title={t("logoutTitle")}
        onConfirm={signOut}
      />
      <SettingsDialog
        user={user}
        open={settingsOpen}
        setOpen={setSettingsOpen}
        setUser={setUser}
        setAppLoading={setAppLoading}
        userDocRef={userDocRef}
      />
    </div>
  );
}

export default App;
