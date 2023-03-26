import { Button, Grid, List, Typography } from "@mui/material";
import { useEffect, useRef } from "react";
import { prompts } from "../data/prompts";
import { useWindowSize } from "../hooks/useWindowSize";
import { breakPoints } from "../style/breakPoints";
import styles from "../style/promptOptions.module.css";

const PromptOptions = ({ setSelectedPrompt, selectedPrompt }: any) => {
  const ref = useRef<HTMLDivElement>(null);
  const { width } = useWindowSize();

  const isSmall = width <= breakPoints.sm;

  useEffect(() => {
    if (isSmall) {
      ref.current?.scroll({
        left: selectedPrompt.id * 176, // 10rem width + 1rem margin,
        behavior: "smooth",
      });
    }
  }, [selectedPrompt]);

  return (
    <>
      <Typography color="#fff" variant="h6" ml={2.5}>
        Pick an Assistant
      </Typography>
      <div ref={ref} className={styles.list}>
        {prompts.map((prompt) => {
          const Icon = prompt.icon;

          return (
            <Button
              variant={
                selectedPrompt.id === prompt.id ? "contained" : "outlined"
              }
              key={prompt.id.toString()}
              className={styles.button}
              sx={{
                marginTop: "1rem",
                marginLeft: isSmall ? "1rem" : 0,
                padding: "1rem",
                height: isSmall ? "3rem" : "5rem",
                minWidth: isSmall ? "10rem" : "12rem",
              }}
              onClick={() => setSelectedPrompt(prompt)}
            >
              <Icon
                sx={{
                  marginRight: "1rem",
                }}
              />
              <Typography variant={isSmall ? "subtitle2" : "subtitle1"}>
                {prompt.key}
              </Typography>
            </Button>
          );
        })}
      </div>
    </>
  );
};

export { PromptOptions };
