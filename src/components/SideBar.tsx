import {
  Drawer,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { theme } from "../style/theme";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { PromptOptions } from "./PromptOptions";
import classes from "../style/sideBar.module.css";
import { useWindowSize } from "../hooks/useWindowSize";

const SideBar = ({ selectedPrompt, setSelectedPrompt }: any) => {
  const { width } = useWindowSize();
  const [open, setOpen] = useState(true);
  return (
    <Grid
      bgcolor={theme.palette.background.paper}
      sx={{
        width: width <= 480 ? undefined : "15rem",
        height: width <= 480 ? "20dvh" : "100dvh",
        backgroundColor: theme.palette.background.paper,
      }}
    >
      <PromptOptions
        setSelectedPrompt={setSelectedPrompt}
        selectedPrompt={selectedPrompt}
      />
    </Grid>
  );
};

export { SideBar };
