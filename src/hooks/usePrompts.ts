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

type Prompt = {
  key: string;
  text: string;
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
      icon: SettingsIcon,
      id: 0,
      shouldRememberConversation: true,
      messages: [],
    },
    {
      key: t("stylistLabel"),
      text: t("stylistPrompt"),
      icon: Man3Icon,
      id: 1,
      shouldRememberConversation: false,
      messages: [],
    },
    {
      key: t("doctorLabel"),
      text: t("doctorPrompt"),
      icon: MonitorHeartIcon,
      id: 2,
      shouldRememberConversation: true,
      messages: [],
    },
    {
      key: t("offensivenessLabel"),
      text: t("offensivenessPrompt"),
      icon: FlagCircleIcon,
      id: 3,
      shouldRememberConversation: false,
      messages: [],
    },
    {
      key: t("drunkLabel"),
      text: t("drunkPrompt"),
      icon: SportsBarIcon,
      id: 4,
      shouldRememberConversation: true,
      messages: [],
    },
    {
      key: t("mentorLabel"),
      text: t("mentorPrompt"),
      icon: WorkIcon,
      id: 5,
      shouldRememberConversation: true,
      messages: [],
    },
    {
      key: t("akpLabel"),
      text: t("akpPrompt"),
      icon: Man3Icon,
      id: 6,
      shouldRememberConversation: true,
      messages: [],
    },
  ];
  return prompts;
};

export default usePrompts;
