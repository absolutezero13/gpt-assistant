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
  isConversationPrivate?: boolean;
};

const prompts: Prompt[] = [
  {
    key: "defaultLabel",
    text: "defaultPrompt",
    explanation: "defaultExplanation",
    icon: SettingsIcon,
    id: 0,
    shouldRememberConversation: true,
    isConversationPrivate: false,
  },
  {
    key: "stylistLabel",
    text: "stylistPrompt",
    explanation: "stylistExplanation",
    icon: Man3Icon,
    id: 1,
    shouldRememberConversation: false,
    isConversationPrivate: false,
  },
  {
    key: "doctorLabel",
    text: "doctorPrompt",
    explanation: "doctorExplanation",
    icon: MonitorHeartIcon,
    id: 2,
    shouldRememberConversation: true,
    isConversationPrivate: false,
  },
  {
    key: "offensivenessLabel",
    text: "offensivenessPrompt",
    explanation: "offensivenessExplanation",
    icon: FlagCircleIcon,
    id: 3,
    shouldRememberConversation: false,
    isConversationPrivate: false,
  },
  {
    key: "drunkLabel",
    text: "drunkPrompt",
    explanation: "drunkExplanation",
    icon: SportsBarIcon,
    id: 4,
    shouldRememberConversation: true,
    isConversationPrivate: false,
  },
  {
    key: "mentorLabel",
    text: "mentorPrompt",
    explanation: "mentorExplanation",
    icon: WorkIcon,
    id: 5,
    shouldRememberConversation: true,
    isConversationPrivate: false,
  },
  {
    key: "akpLabel",
    text: "akpPrompt",
    explanation: "akpExplanation",
    icon: Man3Icon,
    id: 6,
    shouldRememberConversation: false,
    adminOnly: true,
    isConversationPrivate: false,
  },
  {
    key: "angryLabel",
    text: "angryPrompt",
    explanation: "angryExplanation",
    icon: Man3Icon,
    id: 7,
    shouldRememberConversation: true,
    isConversationPrivate: false,
  },
];

export { prompts };
