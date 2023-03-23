import { useEffect, useRef } from "react";
import { CircularProgress, Grid, Typography } from "@mui/material";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { theme } from "../style/theme";
import styles from "../style/messages.module.css";
import PersonIcon from "@mui/icons-material/Person";
import { Message } from "../api/types";
import PsychologyAltIcon from "@mui/icons-material/PsychologyAlt";

const Messages = ({ messages, pending }: any) => {
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
      {messages.map((item: Message) => {
        return (
          <div
            key={item.content + item.role}
            className={styles.messageItem}
            style={{
              alignItems: item.role === "user" ? "flex-end" : "flex-start",
            }}
          >
            <div
              className={styles.message}
              style={{
                backgroundColor:
                  item.role === "user"
                    ? "#fff"
                    : theme.palette.background.paper,
              }}
            >
              <Typography
                sx={{
                  color:
                    item.role === "assistant"
                      ? "#fff"
                      : theme.palette.background.default,
                }}
                variant="body1"
              >
                {item.role === "user" ? <PersonIcon /> : <PsychologyAltIcon />}{" "}
                {item.content}
              </Typography>
            </div>
          </div>
        );
      })}
      {pending && (
        <div className={styles.spinner}>
          <CircularProgress color="secondary" />
        </div>
      )}
    </Grid>
  );
};

export { Messages };
