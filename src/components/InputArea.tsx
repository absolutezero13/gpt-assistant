import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Grid, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import styles from "../style/inputArea.module.css";
import Microphone from "./Microphone";
import { initialPsychicalFeatures } from "../utils/contants";
import { useWindowSize } from "../hooks/useWindowSize";
import { breakPoints } from "../style/breakPoints";
import { withStyles } from "@material-ui/styles";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

export const CssTextField = withStyles({
  root: {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#fff",
      },
    },
  },
})(TextField);

const STYLIST_ID = 1;

const InputArea = ({
  sendMessage,
  input,
  setInput,
  pending,
  selectedPrompt,
}: any) => {
  const { t } = useTranslation();
  const { width } = useWindowSize();

  const [psyhicalFeatures, setPsyhicalFeatures] = useState(
    initialPsychicalFeatures
  );
  const [styleInputsVisible, setStyleInputsVisible] = useState(true);

  const styleInput = useMemo(() => {
    let _input = "";

    psyhicalFeatures.forEach((feature: any) => {
      _input += `${feature.key}: ${feature.value} ${feature.postFix || ""}\n`;
    });

    return _input;
  }, [psyhicalFeatures]);

  return (
    <>
      {selectedPrompt.id === STYLIST_ID ? (
        <Grid
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          flexWrap="wrap"
          pl={2}
          pr={2}
        >
          {styleInputsVisible
            ? psyhicalFeatures.map((feature) => {
                return (
                  <Grid
                    key={feature.key}
                    mt={1}
                    ml={0.5}
                    sx={{
                      maxWidth: width <= breakPoints.sm ? "7rem" : undefined,
                    }}
                  >
                    <CssTextField
                      label={t(feature.key)}
                      value={feature.value}
                      variant="outlined"
                      InputLabelProps={{
                        style: { color: "#fff" },
                      }}
                      inputProps={{
                        style: { color: "#fff" },
                      }}
                      onChange={(e) => {
                        const clone = [...psyhicalFeatures];
                        const index = clone.findIndex(
                          (item) => item.key === feature.key
                        );
                        clone[index].value = e.target.value;

                        setPsyhicalFeatures(clone);
                      }}
                      color="primary"
                    />
                  </Grid>
                );
              })
            : null}
          <Button
            disabled={pending}
            variant="contained"
            color="secondary"
            onClick={() => sendMessage(styleInput)}
            className={styles.button}
            sx={{
              ml: "auto",
              mt: "1rem",
              width: "7rem",
            }}
          >
            <SendIcon />
          </Button>
          <Button
            disabled={pending}
            variant="contained"
            color="secondary"
            onClick={() => setStyleInputsVisible((prev) => !prev)}
            className={styles.button}
            sx={{
              ml: "auto",
              mt: "1rem",
              width: "7rem",
            }}
          >
            {styleInputsVisible ? <VisibilityOffIcon /> : <VisibilityIcon />}
          </Button>
        </Grid>
      ) : (
        <Grid
          display="flex"
          alignSelf="center"
          position="relative"
          className={styles.wrapper}
        >
          <TextField
            value={input}
            rows={1}
            disabled={pending}
            className={styles.input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                if (e.shiftKey) setInput((prev: any) => prev + "\n");
                sendMessage(input);
              }
            }}
            placeholder={t("enterMessage") as string}
          />
          <Button
            className={styles.button}
            disabled={pending}
            variant="contained"
            color="secondary"
            onClick={() => sendMessage(input)}
            sx={{ borderRadius: 0 }}
          >
            <SendIcon />
          </Button>
          <Microphone isSmall={width <= breakPoints.sm} setInput={setInput} />
        </Grid>
      )}
    </>
  );
};

export { InputArea };
