import {
  Divider,
  FormControlLabel,
  FormGroup,
  Switch,
  Typography,
} from "@mui/material";
import { Prompt } from "../data/prompts";
import styles from "../style/promptOptions.module.css";

export interface Props {
  isSmall: boolean;
  selectedPrompt: Prompt;
  setSelectedPrompt: React.Dispatch<React.SetStateAction<Prompt>>;
}

const PromptConversationPreferences = ({
  isSmall,
  selectedPrompt,
  setSelectedPrompt,
}: Props) => {
  const handlePreferencesChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSelectedPrompt((prev) => {
      return {
        ...prev,
        [event.target.name]: event.target.checked,
      };
    });
  };

  return (
    <div className={isSmall ? styles.switchGroup : ""}>
      <Divider sx={{ bgcolor: "white", mt: 2 }} />
      <Typography color="#fff" variant="h6" mt={1} ml={2} fontSize="1.1rem">
        Conversation Preferences
      </Typography>
      <FormGroup
        sx={{
          m: "10px 0",
          display: "flex",
          alignItems: "center",
          color: "white",
        }}
      >
        <FormControlLabel
          sx={{
            m: 0,
            display: "flex",
            justifyContent: "space-between",
            width: "70%",
          }}
          control={
            <Switch
              checked={selectedPrompt.shouldRememberConversation}
              onChange={handlePreferencesChange}
              name="shouldRememberConversation"
            />
          }
          label="Remember"
          labelPlacement="start"
        />
        <FormControlLabel
          sx={{
            m: 0,
            display: "flex",
            justifyContent: "space-between",
            width: "70%",
          }}
          control={
            <Switch
              checked={selectedPrompt.isConversationPrivate}
              onChange={handlePreferencesChange}
              name="isConversationPrivate"
            />
          }
          label="Private"
          labelPlacement="start"
        />
      </FormGroup>
    </div>
  );
};

export default PromptConversationPreferences;
