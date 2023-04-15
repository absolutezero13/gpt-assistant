import { useEffect, useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import styles from "../style/inputArea.module.css";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconTypeMap } from "@mui/material";
import { promptIcons } from "../data/prompts";

const TOGGLE_CYCLE = 3500; // animation duration must change accordingly

interface Props {
  assistantIcon: string;
}

const InputAreaSendButtonIcon = ({ assistantIcon }: Props) => {
  const [buttonIcon, setButtonIcon] = useState(false);

  const PromptIcon = promptIcons[assistantIcon as keyof typeof promptIcons];

  useEffect(() => {
    setTimeout(() => {
      setButtonIcon(!buttonIcon);
    }, TOGGLE_CYCLE);
  }, [buttonIcon]);

  return buttonIcon ? (
    <SendIcon className={styles.icon} />
  ) : (
    <PromptIcon className={styles.icon} />
  );
};

export default InputAreaSendButtonIcon;
