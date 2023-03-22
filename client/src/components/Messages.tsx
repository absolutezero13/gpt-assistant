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
        height: "70vh",
        overflowY: "scroll",
        paddingRight: "1rem",
        paddingBottom: "1rem",
        marginTop: 0,
        marginBottom: 0,
      }}
    >
      {messages.map((item) => {
        return (
          <div
            key={item.content + item.role}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: item.role === "user" ? "flex-end" : "flex-start",
              width: "100%",
            }}
          >
            <div
              style={{
                color: "#fff",
                display: "flex",
                backgroundColor:
                  item.role === "user"
                    ? "#fff"
                    : theme.palette.background.paper,
                padding: "10px",
                borderRadius: "10px",
                marginTop: "2rem",
                width: "50%",
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
                {item.role}: {item.content}
              </Typography>
            </div>
          </div>
        );
      })}
      {pending && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "1rem",
          }}
        >
          <CircularProgress color="secondary" />
        </div>
      )}
    </Grid>
  );
};

export { Messages };
