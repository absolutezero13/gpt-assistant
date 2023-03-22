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

const SideBar = ({ selectedPrompt, setSelectedPrompt }) => {
  const [open, setOpen] = useState(true);
  return (
    <Grid
      sx={{
        width: 300,
        flexShrink: 0,
        backgroundColor: theme.palette.background.paper,
        height: "100dvh",
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
