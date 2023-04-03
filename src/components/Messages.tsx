import { useEffect, useRef } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { Alert, Avatar, Collapse, Fab, Grid, Typography } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import PsychologyAltIcon from "@mui/icons-material/PsychologyAlt";
import { theme } from "../style/theme";
import styles from "../style/messages.module.css";
import { CustomUser, Message } from "../api/types";
import Loader from "./Loader";
import LanguageSelection from "./LanguageSelection";
import { useTranslation } from "react-i18next";
import { Close, Settings } from "@mui/icons-material";
import { useWindowSize } from "../hooks/useWindowSize";
import { Prompt } from "../data/prompts";

const dynamicStyles = {
  user: {
    backgroundColor: "#fff",
    alignItems: "flex-end",
    color: theme.palette.background.default,
  },
  assistant: {
    backgroundColor: theme.palette.background.paper,
    alignItems: "flex-start",
    color: "#fff",
  },
};

interface MessagesProps {
  messages: Message[];
  pending: boolean;
  selectedPrompt: Prompt;
  errorAlert: string | null;
  setErrorAlert: (error: string | null) => void;
  user: CustomUser | null;
}

const Messages = ({
  messages,
  pending,
  selectedPrompt,
  errorAlert,
  setErrorAlert,
  user,
}: MessagesProps) => {
  const { width } = useWindowSize();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTimeout(() => {
      ref.current?.scroll({
        top: ref.current?.scrollHeight,
        behavior: "smooth",
      });
    }, 100);
  }, [messages]);

  const isSmall = width <= 768;

  return (
    <Grid ref={ref} mt={isSmall ? 10 : 0} mb={0} className={styles.container}>
      <LanguageSelection />
      <Grid position="relative">
        {messages.map((item: Message) => {
          return (
            <div
              key={item?.id || item.content + item.role}
              className={styles.messageItem}
              style={{
                alignItems: dynamicStyles[item.role].alignItems,
              }}
            >
              <div
                className={styles.message}
                style={{
                  backgroundColor: dynamicStyles[item.role].backgroundColor,
                }}
              >
                <Typography
                  fontSize={isSmall ? "0.9rem" : "1.1rem"}
                  color={dynamicStyles[item.role].color}
                >
                  <span className={styles.icon}>
                    {item.role === "assistant" ? (
                      <PsychologyAltIcon />
                    ) : (
                      <img
                        style={{
                          width: "1.5rem",
                          height: "1.5rem",
                          borderRadius: "50%",
                        }}
                        src={user?.photoURL}
                      />
                    )}{" "}
                  </span>
                  {item.content.split("\n").map((item, key) => {
                    return (
                      <span key={key}>
                        {item}
                        <br />
                      </span>
                    );
                  })}
                </Typography>
              </div>
            </div>
          );
        })}
      </Grid>
      <Collapse
        in={errorAlert !== null}
        sx={{
          position: "fixed",
          bottom: "8rem",
          width: {
            xs: "80%",
            sm: "80%",
            md: "50%",
            lg: "50%",
            xl: "50%",
          },
        }}
      >
        <Alert
          severity="error"
          variant="filled"
          action={
            <Close
              onClick={() => setErrorAlert(null)}
              sx={{
                color: "#fff",
              }}
            />
          }
        >
          {errorAlert}
        </Alert>
      </Collapse>
      {pending && (
        <Grid className={styles.spinner}>
          <Loader />
        </Grid>
      )}
    </Grid>
  );
};

export { Messages };
