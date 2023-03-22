import { CircularProgress, Grid, Typography } from "@mui/material";
import { theme } from "../style/theme";
import styles from "../style/Messages.module.css";
import { useEffect, useRef } from "react";

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
    <Grid
      ref={ref}
      mt={3}
      mb={3}
      sx={{
        height: "60vh",
        overflowY: "scroll",
        borderRadius: "1rem",
        backgroundColor: theme.palette.background.paper,
        padding: "1.5rem",
      }}
    >
      {messages.map((item) => {
        return (
          <div
            key={item.content + item.role}
            style={{
              color: "#fff",
              fontSize: "16px",
              display: "flex",
              alignItems: "center",
              backgroundColor:
                item.role === "user" ? "#fff" : theme.palette.secondary.main,
              padding: "10px",
              borderRadius: "10px",
              marginTop: "1rem",
            }}
          >
            <Typography
              sx={{
                color:
                  item.role === "assistant"
                    ? "#fff"
                    : theme.palette.background.default,
              }}
              variant="h6"
            >
              {item.role}: {item.content}
            </Typography>
          </div>
        );
      })}
      {pending && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress color="secondary" />
        </div>
      )}
    </Grid>
  );
};

export { Messages };
