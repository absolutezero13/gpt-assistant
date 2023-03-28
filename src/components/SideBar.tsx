import {
  AppBar,
  Drawer,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { PromptOptions } from "./PromptOptions";
import { useWindowSize } from "../hooks/useWindowSize";
import { breakPoints } from "../style/breakPoints";
import styled from "@emotion/styled";

const StyledGrid = styled(Stack)(({ isSmall }: any) => ({
  width: isSmall ? undefined : 240,
}));

const DRAWER_HEIGHT = 250;
const APPBAR_HEIGHT = 80;

const SideBar = ({ selectedPrompt, setSelectedPrompt }: any) => {
  const { width } = useWindowSize();
  const isSmall = width <= breakPoints.sm;
  const [showDrawer, setShowDrawer] = useState(false);

  const handleDrawerToggle = () => setShowDrawer(!showDrawer);

  return (
    <StyledGrid>
      <AppBar
        color={isSmall ? "transparent" : "inherit"}
        position="fixed"
        sx={{
          left: 0,
          width: isSmall ? DRAWER_HEIGHT + "1rem" : DRAWER_HEIGHT,
          height: APPBAR_HEIGHT,
          zIndex: 100,
          boxShadow: 0,
        }}
      >
        <Toolbar>
          <IconButton
            color="primary"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, mt: 2.5, display: isSmall ? "block" : "none" }}
          >
            <MenuIcon />
          </IconButton>
          <Typography color="#fff" variant="h6" mt={2} ml={isSmall ? 0 : 3}>
            Pick an Assistant
          </Typography>
        </Toolbar>
      </AppBar>
      {isSmall ? (
        <Drawer
          variant="temporary"
          open={showDrawer}
          onClose={handleDrawerToggle}
          sx={{
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: DRAWER_HEIGHT,
              mt: `${APPBAR_HEIGHT}px`,
            },
          }}
        >
          <PromptOptions
            setSelectedPrompt={setSelectedPrompt}
            selectedPrompt={selectedPrompt}
          />
        </Drawer>
      ) : (
        <Drawer
          variant="permanent"
          sx={{
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: DRAWER_HEIGHT,
              mt: { sm: `${APPBAR_HEIGHT}px` },
            },
          }}
        >
          <PromptOptions
            setSelectedPrompt={setSelectedPrompt}
            selectedPrompt={selectedPrompt}
          />
        </Drawer>
      )}
    </StyledGrid>
  );
};

export { SideBar };
