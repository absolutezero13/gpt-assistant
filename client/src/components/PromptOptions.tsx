import { Button, Grid, List, Typography } from "@mui/material";
import { prompts } from "../data/prompts";

const PromptOptions = ({ setSelectedPrompt, selectedPrompt }: any) => {
  return (
    <List
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography color="#fff" variant="h6">
        Available Assistants
      </Typography>
      {Object.keys(prompts).map((key) => {
        return (
          <Button
            variant={selectedPrompt === key ? "contained" : "outlined"}
            key={key}
            sx={{
              display: "flex",
              alignItems: "center",
              padding: "10px",
              cursor: "pointer",
              width: "10rem",
              marginTop: "1rem",
            }}
            onClick={() => setSelectedPrompt(key)}
          >
            <Typography variant="body1">{key}</Typography>
          </Button>
        );
      })}
    </List>
  );
};

export { PromptOptions };
