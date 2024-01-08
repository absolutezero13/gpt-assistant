import { FC } from "react";
import { User } from "firebase/auth";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import PsychologyAltIcon from "@mui/icons-material/PsychologyAlt";
import ContentCopy from "@mui/icons-material/ContentCopy";
import { CustomUser, IMessage } from "../api/types";
import { Prompt } from "../data/prompts";
import styles from "../style/messages.module.css";
import { theme } from "../style/theme";
import { Snackbar, Typography } from "@mui/material";

interface Props {
  item: IMessage;
  selectedPrompt: Prompt;
  isSmall: boolean;
  user: CustomUser | null;
  openSnackbar: () => void;
}

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

const Message: FC<Props> = ({
  item,
  selectedPrompt,
  isSmall,
  user,
  openSnackbar,
}) => {
  if (item.role === "assistant" && selectedPrompt.syntaxHighlighting) {
    return (
      <div
        key={item?.id || item.content + item.role}
        className={styles.messageItem}
        style={{
          alignItems: dynamicStyles[item.role].alignItems,
        }}
      >
        <div className={styles.message}>
          <ContentCopy
            color="secondary"
            onClick={() => {
              navigator.clipboard.writeText(item.content);
              openSnackbar();
            }}
            style={{
              position: "absolute",
              right: "1rem",
              top: "2rem",
              cursor: "pointer",
            }}
          />
          <SyntaxHighlighter
            language={selectedPrompt.syntaxHighlighting}
            wrapLongLines={true}
            showInlineLineNumbers
            customStyle={{
              fontSize: isSmall ? "0.8rem" : "1rem",
              borderRadius: "0.5rem",
              maxWidth: "100%",
            }}
          >
            {item.content}
          </SyntaxHighlighter>
        </div>
      </div>
    );
  }
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
                src={user?.photoURL || undefined}
              />
            )}
          </span>

          {item.content.split("\n").map((msg, key) => {
            return (
              <span key={key}>
                {msg}
                <br />
              </span>
            );
          })}
        </Typography>
      </div>
    </div>
  );
};

export default Message;
