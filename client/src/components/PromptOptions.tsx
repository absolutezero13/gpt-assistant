import { Button, Grid, List, Typography } from "@mui/material";
import { prompts } from "../data/prompts";
import styles from "../style/promptOptions.module.css";

const PromptOptions = ({ setSelectedPrompt, selectedPrompt }: any) => {
  return (
    <List className={styles.list}>
      <Typography color="#fff" variant="h6">
        Available Assistants
      </Typography>
      {Object.keys(prompts).map((key) => {
        return (
          <Button
            variant={
              selectedPrompt.id === prompts[key].id ? "contained" : "outlined"
            }
            key={key}
            className={styles.button}
            sx={{
              marginTop: "1rem",
              padding: "1rem",
            }}
            onClick={() => setSelectedPrompt(prompts[key])}
          >
            <Typography variant="body1">{key}</Typography>
          </Button>
        );
      })}
    </List>
  );
};

export { PromptOptions };
