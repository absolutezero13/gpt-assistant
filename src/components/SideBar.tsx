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

const SideBar = ({ selectedPrompt, setSelectedPrompt }: any) => {
  const { width } = useWindowSize();
  const isSmall = width <= breakPoints.sm;
  const drawerWidth = 250;
  const appBarHeight = 80;
  const [showDrawer, setShowDrawer] = useState(false);

  const handleDrawerToggle = () => setShowDrawer(!showDrawer);

  return (
    <StyledGrid>
      <AppBar
        color="inherit"
        position="fixed"
        sx={{
          height: appBarHeight,
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
              width: drawerWidth,
              mt: `${appBarHeight}px`,
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
              width: drawerWidth,
              mt: { sm: `${appBarHeight}px` },
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
