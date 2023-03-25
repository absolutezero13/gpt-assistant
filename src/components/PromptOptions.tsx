import { Button, Grid, List, Typography } from "@mui/material";
import { prompts } from "../data/prompts";
import { useWindowSize } from "../hooks/useWindowSize";
import styles from "../style/promptOptions.module.css";

const PromptOptions = ({ setSelectedPrompt, selectedPrompt }: any) => {
  const { width } = useWindowSize();
  return (
    <>
      <Typography color="#fff" variant="h6">
        Available Assistants
      </Typography>
      <List className={styles.list}>
        {prompts.map((prompt) => {
          return (
            <Button
              variant={
                selectedPrompt.id === prompt.id ? "contained" : "outlined"
              }
              key={prompt.id.toString()}
              className={styles.button}
              sx={{
                marginTop: "1rem",
                padding: "1rem",
                marginRight: width <= 480 ? "1rem" : 0,
                minWidth: width <= 480 ? "8rem" : "auto",
              }}
              onClick={() => setSelectedPrompt(prompt)}
            >
              <Typography variant="subtitle1">{prompt.key}</Typography>
            </Button>
          );
        })}
      </List>
    </>
  );
};

export { PromptOptions };
