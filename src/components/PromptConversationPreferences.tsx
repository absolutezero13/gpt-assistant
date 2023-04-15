import {
  Divider,
  FormControlLabel,
  FormGroup,
  Grid,
  Switch,
  Typography,
} from "@mui/material";
import { Prompt } from "../data/prompts";
import styles from "../style/promptOptions.module.css";
import { useTranslation } from "react-i18next";
import usePromptStore from "../zustand/prompts";

export interface Props {
  isSmall: boolean;
  selectedPrompt: Prompt;
}

const PromptConversationPreferences = ({ isSmall, selectedPrompt }: Props) => {
  const { prompts, setPrompts } = usePromptStore();
  const { t } = useTranslation();

  const handlePreferencesChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, checked } = event.target;
    const updatedPrompt = {
      ...selectedPrompt,
      [name]: checked,
    };

    console.log("updatedPrompt", updatedPrompt);
    const updatedPrompts = prompts.map((p) => {
      if (p.id === updatedPrompt.id) {
        return updatedPrompt;
      }
      return p;
    });
    setPrompts(updatedPrompts);
  };

  return (
    <Grid className={isSmall ? styles.switchGroup : ""}>
      <Divider sx={{ bgcolor: "white" }} />
      <Typography color="#fff" variant="h6" mt={1} ml={2} fontSize="1.1rem">
        {t("preferences")}
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
          label={t("remember")}
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
          label={t("private")}
          labelPlacement="start"
        />
      </FormGroup>
    </Grid>
  );
};

export default PromptConversationPreferences;
