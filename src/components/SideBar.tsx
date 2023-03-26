import { Grid } from "@mui/material";
import { useState } from "react";
import { theme } from "../style/theme";
import { PromptOptions } from "./PromptOptions";
import { useWindowSize } from "../hooks/useWindowSize";
import { breakPoints } from "../style/breakPoints";
import styled from "@emotion/styled";

const StyledGrid = styled(Grid)(({ isSmall }: any) => ({
  width: isSmall ? undefined : "15rem",
  height: isSmall ? "10rem" : "100dvh",
  backgroundColor: theme.palette.background.paper,
}));

const SideBar = ({ selectedPrompt, setSelectedPrompt }: any) => {
  const { width } = useWindowSize();

  const isSmall = width <= breakPoints.sm;

  return (
    <StyledGrid
      isSmall={isSmall}
      boxShadow={5}
      bgcolor={theme.palette.background.paper}
    >
      <PromptOptions
        setSelectedPrompt={setSelectedPrompt}
        selectedPrompt={selectedPrompt}
      />
    </StyledGrid>
  );
};

export { SideBar };
