import { Button, Grid, TextField, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import styles from "../style/inputArea.module.css";
import Microphone from "./Microphone";
import { useMemo, useState } from "react";
import { initialPsychicalFeatures } from "../utils/contants";
import { useWindowSize } from "../hooks/useWindowSize";
import { breakPoints } from "../style/breakPoints";
import { withStyles } from "@material-ui/styles";

const CssTextField = withStyles({
  root: {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#fff",
      },
    },
  },
})(TextField);

const InputArea = ({
  sendMessage,
  input,
  setInput,
  pending,
  selectedPrompt,
}: any) => {
  const { width } = useWindowSize();

  const [psyhicalFeatures, setPsyhicalFeatures] = useState<any>(
    initialPsychicalFeatures
  );

  const styleInput = useMemo(() => {
    let _input = "";

    psyhicalFeatures.forEach((feature: any) => {
      _input += `${feature.key}: ${feature.value} ${feature.postFix || ""}\n`;
    });

    return _input;
  }, [psyhicalFeatures]);

  return (
    <>
      {selectedPrompt.key === "Stylist" ? (
        <Grid
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
          }}
        >
          {psyhicalFeatures.map((feature) => {
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
                  label={feature.key}
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
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      sendMessage(input);
                    }
                  }}
                  color="primary"
                />
              </Grid>
            );
          })}
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
        </Grid>
      ) : (
        <Grid className={styles.wrapper}>
          <TextField
            multiline
            value={input}
            rows={2}
            disabled={pending}
            className={styles.input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                sendMessage(input);
              }
            }}
            placeholder="Enter your message"
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
