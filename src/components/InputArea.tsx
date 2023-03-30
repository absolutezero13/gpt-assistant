import { Button, Grid, TextField, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import styles from "../style/inputArea.module.css";
import Microphone from "./Microphone";
import { useMemo, useState } from "react";
import { initialPsychicalFeatures } from "../utils/contants";
import { useWindowSize } from "../hooks/useWindowSize";
import { breakPoints } from "../style/breakPoints";
import { withStyles } from "@material-ui/styles";
import { useTranslation } from "react-i18next";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const CssTextField = withStyles({
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
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          {styleInputsVisible
            ? psyhicalFeatures.map((feature) => {
                return (
                  <Grid
                    key={feature.key}
                    sx={{
                      marginTop: "1rem",
                      marginLeft: "0.5rem",
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
              marginLeft: "auto",
              marginTop: "1rem",
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
              marginLeft: "1rem",
              marginTop: "1rem",
              width: "7rem",
            }}
          >
            {styleInputsVisible ? <VisibilityOffIcon /> : <VisibilityIcon />}
          </Button>
        </Grid>
      ) : (
        <Grid className={styles.wrapper}>
          <TextField
            multiline
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
            disabled={pending}
            variant="contained"
            color="secondary"
            onClick={() => sendMessage(input)}
            className={styles.button}
          >
            <SendIcon />
          </Button>
        </Grid>
      )}
      {/* <Microphone setInput={setInput} /> */}
    </>
  );
};

export { InputArea };
