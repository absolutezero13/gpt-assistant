import { Message } from "../api/types";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconTypeMap } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import FlagCircleIcon from "@mui/icons-material/FlagCircle";
import SportsBarIcon from "@mui/icons-material/SportsBar";
import WorkIcon from "@mui/icons-material/Work";
import Man3Icon from "@mui/icons-material/Man3";

export type Prompt = {
  key: string;
  text: string;
  explanation: string;
  icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & { muiName: string };
  id: number;
  shouldRememberConversation: boolean;
  adminOnly?: boolean;
};

const prompts: Prompt[] = [
  {
    key: "defaultLabel",
    text: "defaultPrompt",
    explanation: "defaultExplanation",
    icon: SettingsIcon,
    id: 0,
    shouldRememberConversation: true,
  },
  {
    key: "stylistLabel",
    text: "stylistPrompt",
    explanation: "stylistExplanation",
    icon: Man3Icon,
    id: 1,
    shouldRememberConversation: false,
  },
  {
    key: "doctorLabel",
    text: "doctorPrompt",
    explanation: "doctorExplanation",
    icon: MonitorHeartIcon,
    id: 2,
    shouldRememberConversation: true,
  },
  {
    key: "offensivenessLabel",
    text: "offensivenessPrompt",
    explanation: "offensivenessExplanation",
    icon: FlagCircleIcon,
    id: 3,
    shouldRememberConversation: false,
  },
  {
    key: "drunkLabel",
    text: "drunkPrompt",
    explanation: "drunkExplanation",
    icon: SportsBarIcon,
    id: 4,
    shouldRememberConversation: true,
  },
  {
    key: "mentorLabel",
    text: "mentorPrompt",
    explanation: "mentorExplanation",
    icon: WorkIcon,
    id: 5,
    shouldRememberConversation: true,
  },
  {
    key: "akpLabel",
    text: "akpPrompt",
    explanation: "akpExplanation",
    icon: Man3Icon,
    id: 6,
    shouldRememberConversation: true,
    adminOnly: true,
  },
];

export { prompts };
