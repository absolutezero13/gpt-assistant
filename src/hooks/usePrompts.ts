import { Message } from "../api/types";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconTypeMap } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import FlagCircleIcon from "@mui/icons-material/FlagCircle";
import SportsBarIcon from "@mui/icons-material/SportsBar";
import WorkIcon from "@mui/icons-material/Work";
import Man3Icon from "@mui/icons-material/Man3";
import { useTranslation } from "react-i18next";

export type Prompt = {
  key: string;
  text: string;
  explanation: string;
  icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & { muiName: string };
  id: number;
  shouldRememberConversation: boolean;
  messages: Message[];
};

export const usePrompts = () => {
  const { t } = useTranslation();

  const prompts: Prompt[] = [
    {
      key: t("defaultLabel"),
      text: t("defaultPrompt"),
      explanation: t("defaultExplanation"),
      icon: SettingsIcon,
      id: 0,
      shouldRememberConversation: true,
      messages: [],
    },
    {
      key: t("stylistLabel"),
      text: t("stylistPrompt"),
      explanation: t("stylistExplanation"),
      icon: Man3Icon,
      id: 1,
      shouldRememberConversation: false,
      messages: [],
    },
    {
      key: t("doctorLabel"),
      text: t("doctorPrompt"),
      explanation: t("doctorExplanation"),
      icon: MonitorHeartIcon,
      id: 2,
      shouldRememberConversation: true,
      messages: [],
    },
    {
      key: t("offensivenessLabel"),
      text: t("offensivenessPrompt"),
      explanation: t("offensivenessExplanation"),
      icon: FlagCircleIcon,
      id: 3,
      shouldRememberConversation: false,
      messages: [],
    },
    {
      key: t("drunkLabel"),
      text: t("drunkPrompt"),
      explanation: t("drunkExplanation"),
      icon: SportsBarIcon,
      id: 4,
      shouldRememberConversation: true,
      messages: [],
    },
    {
      key: t("mentorLabel"),
      text: t("mentorPrompt"),
      explanation: t("mentorExplanation"),
      icon: WorkIcon,
      id: 5,
      shouldRememberConversation: true,
      messages: [],
    },
    {
      key: t("akpLabel"),
      text: t("akpPrompt"),
      explanation: t("akpExplanation"),
      icon: Man3Icon,
      id: 6,
      shouldRememberConversation: true,
      messages: [],
    },
  ];
  return prompts;
};

export default usePrompts;
