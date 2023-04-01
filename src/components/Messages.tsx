import { useEffect, useRef } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  Alert,
  CircularProgress,
  Collapse,
  Grid,
  Typography,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import PsychologyAltIcon from "@mui/icons-material/PsychologyAlt";
import { theme } from "../style/theme";
import styles from "../style/messages.module.css";
import { Message } from "../api/types";
import Loader from "./Loader";
import LanguageSelection from "./LanguageSelection";
import { useTranslation } from "react-i18next";
import { Close, Settings } from "@mui/icons-material";
import { useWindowSize } from "../hooks/useWindowSize";

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

const Messages = ({
  messages,
  pending,
  selectedPrompt,
  errorAlert,
  setErrorAlert,
}: any) => {
  const { width } = useWindowSize();
  const { t } = useTranslation();
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
      {messages.map((item: Message) => {
        return (
          <div
            key={item.content + item.role}
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
                sx={{
                  color: dynamicStyles[item.role].color,
                  fontSize: isSmall ? "0.9rem" : "1.1rem",
                }}
              >
                <span className={styles.icon}>
                  {item.role === "user" ? (
                    <PersonIcon />
                  ) : (
                    <PsychologyAltIcon />
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
        <div className={styles.spinner}>
          <Loader />
        </div>
      )}
    </Grid>
  );
};

export { Messages };
