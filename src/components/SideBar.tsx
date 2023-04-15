import { useState } from "react";
import {
  AppBar,
  Button,
  Drawer,
  Grid,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { PromptOptions } from "./PromptOptions";
import { useWindowSize } from "../hooks/useWindowSize";
import { breakPoints } from "../style/breakPoints";
import styled from "@emotion/styled";
import { Google, Logout, Settings } from "@mui/icons-material";
import { signInWithgoogle, signOut } from "../providers/googleAuth";
import { Prompt } from "../data/prompts";
import { CustomUser } from "../api/types";
import { useTranslation } from "react-i18next";

const StyledGrid = styled(Stack)(({ isSmall }: any) => ({
  width: isSmall ? undefined : 240,
}));

const DRAWER_HEIGHT = 250;
const APPBAR_HEIGHT = 80;

interface SideBarProps {
  selectedPrompt: Prompt;
  setLogoutAlert: any;
  user: CustomUser | null;
  setSettingsOpen: any;
}

const SideBar = ({
  selectedPrompt,
  user,
  setLogoutAlert,
  setSettingsOpen,
}: SideBarProps) => {
  const { t } = useTranslation();
  const { width } = useWindowSize();
  const [showDrawer, setShowDrawer] = useState(false);

  const handleDrawerToggle = () => setShowDrawer(!showDrawer);
  const isSmall = width <= breakPoints.sm;

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
          {isSmall &&
            (user ? (
              <Grid mt={1} display="flex" alignItems="center">
                <img
                  src={user.photoURL as string}
                  alt="user"
                  style={{
                    width: "1.5rem",
                    marginRight: "0.5rem",
                    borderRadius: 99,
                  }}
                />
                <Button onClick={signOut} variant="contained">
                  <Logout />
                </Button>
                <Button
                  sx={{ ml: 1 }}
                  onClick={() => setSettingsOpen(true)}
                  variant="contained"
                  color="primary"
                >
                  <Settings />
                </Button>
              </Grid>
            ) : (
              <Button
                onClick={signInWithgoogle}
                variant="contained"
                color="primary"
              >
                <Google />
              </Button>
            ))}
          {!isSmall && (
            <Grid>
              <Typography color="#fff" variant="h6" mt={1} ml={isSmall ? 0 : 3}>
                Pick an Assistant
              </Typography>
            </Grid>
          )}
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
          <PromptOptions selectedPrompt={selectedPrompt} user={user} />
        </Drawer>
      ) : (
        <Drawer
          variant="permanent"
          sx={{
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: DRAWER_HEIGHT,
              mt: { sm: `${APPBAR_HEIGHT}px` },
              height: `calc(100vh - ${APPBAR_HEIGHT}px)`,
            },
          }}
        >
          {user ? (
            <>
              <Grid
                container
                direction="row"
                alignItems="center"
                justifyContent="center"
              >
                <img
                  src={user.photoURL as string}
                  alt="user"
                  style={{
                    width: "1.5rem",
                    marginRight: "0.5rem",
                    borderRadius: 99,
                  }}
                />
                <Typography color="#fff" variant="h6">
                  {user.displayName}
                </Typography>
              </Grid>
              <Button
                onClick={() => setSettingsOpen(true)}
                variant="contained"
                color="primary"
              >
                <Settings />
                <Typography ml={1}>{t("settings.title")}</Typography>
              </Button>
              <Button
                sx={{ mt: 1 }}
                onClick={() => setLogoutAlert(true)}
                variant="contained"
                color="primary"
              >
                <Logout />
                <Typography ml={1}>{t("logout")}</Typography>
              </Button>
            </>
          ) : (
            <Button
              onClick={signInWithgoogle}
              variant="contained"
              color="primary"
            >
              <Google />
              <Typography ml={1}>{t("signin")}</Typography>
            </Button>
          )}
          <PromptOptions selectedPrompt={selectedPrompt} user={user} />
        </Drawer>
      )}
    </StyledGrid>
  );
};

export { SideBar };
