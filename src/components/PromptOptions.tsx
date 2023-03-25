import { Button, Grid, List, Typography } from "@mui/material";
import { prompts } from "../data/prompts";
import styles from "../style/promptOptions.module.css";

const PromptOptions = ({ setSelectedPrompt, selectedPrompt }: any) => {
  return (
    <List className={styles.list}>
      <Typography color="#fff" variant="h6">
        Available Assistants
      </Typography>
      {prompts.map((prompt) => {
        return (
          <Button
            variant={selectedPrompt.id === prompt.id ? "contained" : "outlined"}
            key={prompt.id.toString()}
            className={styles.button}
            sx={{
              marginTop: "1rem",
              padding: "1rem",
            }}
            onClick={() => setSelectedPrompt(prompt)}
          >
            <Typography variant="body1">{prompt.key}</Typography>
          </Button>
        );
      })}
    </List>
  );
};

export { PromptOptions };
