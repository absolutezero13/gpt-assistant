import { CircularProgress, Grid, Typography } from "@mui/material";
import { theme } from "../style/theme";
import styles from "../style/Messages.module.css";
import { useEffect, useRef } from "react";
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
    <Grid
      ref={ref}
      mt={3}
      mb={3}
      sx={{
        flex: 0.95,
        overflowY: "scroll",
        paddingRight: "1rem",
        paddingBottom: "1rem",
        marginTop: 0,
        marginBottom: 0,
      }}
    >
      {messages.map((item: Message) => {
        return (
          <div
            key={item.content + item.role}
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              alignItems: item.role === "user" ? "flex-end" : "flex-start",
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
                {item.role === "user" ? <PersonIcon /> : <PsychologyAltIcon />}{" "}
                {item.content}
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
