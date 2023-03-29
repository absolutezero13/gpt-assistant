import { useEffect, useRef } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { CircularProgress, Grid, Typography } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import PsychologyAltIcon from "@mui/icons-material/PsychologyAlt";
import { theme } from "../style/theme";
import styles from "../style/messages.module.css";
import { Message } from "../api/types";
import Loader from "./Loader";
import LanguageSelection from "./LanguageSelection";

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

const Messages = ({ messages, pending, selectedPrompt }: any) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTimeout(() => {
      ref.current?.scroll({
        top: ref.current?.scrollHeight,
        behavior: "smooth",
      });
    }, 100);
  }, [messages]);

  return (
    <Grid ref={ref} mt={3} mb={3} className={styles.container}>
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
                }}
                variant="body1"
              >
                {item.role === "user" ? <PersonIcon /> : <PsychologyAltIcon />}{" "}
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
      {pending && (
        <div className={styles.spinner}>
          <Loader />
        </div>
      )}
    </Grid>
  );
};

export { Messages };
