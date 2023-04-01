import { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { Info } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  MenuItem,
  Select,
  Slider,
  Tooltip,
  Typography,
} from "@mui/material";
import { DocumentReference, updateDoc } from "firebase/firestore";
import { useTranslation } from "react-i18next";
import { CustomUser } from "../api/types";
import { CssTextField } from "./InputArea";

interface SettingsProps {
  open: boolean;
  setOpen: any;
  user: CustomUser | null;
  setUser: any;
  setAppLoading: any;
  userDocRef: DocumentReference;
}

const gptModels = [
  {
    value: "gpt-3.5-turbo",
    label: "GPT-3.5 Turbo",
    apiKeyNeeded: false,
  },
  {
    value: "gpt-4",
    label: "GPT-4",
    apiKeyNeeded: false,
  },
];

const SettingsDialog = ({
  open,
  setOpen,
  user,
  setUser,
  setAppLoading,
  userDocRef,
}: SettingsProps) => {
  const { t } = useTranslation();
  const [userInfo, setUserInfo] = useState<any>({
    apiKey: "",
    craziness: 0,
    gptModel: gptModels[0].value,
  });

  useEffect(() => {
    if (user) {
      setUserInfo({
        apiKey: user.apiKey,
        craziness: user.settings?.craziness,
        gptModel: user.settings?.model,
      });
    }
  }, [user]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = async () => {
    try {
      setAppLoading(true);
      setOpen(false);
      const res = await updateDoc(userDocRef, {
        apiKey: userInfo.apiKey,
        settings: {
          craziness: userInfo.craziness,
          model: userInfo.gptModel,
        },
      });

      setUser({
        ...user,
        apiKey: userInfo.apiKey,
        settings: {
          craziness: userInfo.craziness,
          model: userInfo.gptModel,
        },
      });
    } catch (error) {
      console.log(error);
    } finally {
      setAppLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle color="#fff">{t("settings.title")} </DialogTitle>
      <DialogContent>
        <DialogContentText color="#fff" mb={2}>
          {t("settings.apiKey")}
        </DialogContentText>
        <Typography color="#fff">Api Key</Typography>
        <CssTextField
          InputLabelProps={{
            style: { color: "#fff" },
          }}
          inputProps={{
            style: { color: "#fff" },
          }}
          color="primary"
          autoFocus
          margin="dense"
          placeholder="Your Api Key.."
          fullWidth
          variant="outlined"
          value={userInfo?.apiKey || ""}
          type="password"
          prefix="sk-"
          onChange={(e) => setUserInfo({ ...userInfo, apiKey: e.target.value })}
        />
        <Button
          onClick={() => setUserInfo((prev: any) => ({ ...prev, apiKey: "" }))}
        >
          {t("settings.removeKey")}
        </Button>
        <Grid mt={2} mb={1} flexDirection="row" display="flex">
          <Typography color="#fff">{t("settings.model")}</Typography>
        </Grid>
        <Select
          value={userInfo?.gptModel || gptModels[0].value}
          onChange={(e) =>
            setUserInfo({ ...userInfo, gptModel: e.target.value })
          }
          fullWidth
          sx={{
            color: "#fff",
            ".MuiOutlinedInput-notchedOutline": {
              borderColor: "#fff",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#fff",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#fff",
            },
            ".MuiSvgIcon-root ": {
              fill: "white !important",
            },
          }}
          inputProps={{
            MenuProps: {
              MenuListProps: {
                sx: {
                  backgroundColor: "#fff",
                },
              },
            },
          }}
        >
          {gptModels.map((model) => (
            <MenuItem key={model.value} value={model.value}>
              {model.label}
            </MenuItem>
          ))}
        </Select>
        <Grid mt={4} mb={1} flexDirection="row" display="flex">
          <Typography color="#fff">{t("settings.craziness")}</Typography>
          <Tooltip title={t("settings.crazinessTooltip")}>
            <Info color="primary" />
          </Tooltip>
        </Grid>
        <Slider
          valueLabelDisplay="auto"
          step={0.1}
          min={0}
          max={2}
          color="primary"
          value={userInfo.craziness || 0}
          onChange={(_, value) =>
            setUserInfo({ ...userInfo, craziness: value })
          }
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>{t("settings.cancel")}</Button>
        <Button variant="contained" onClick={handleSave}>
          {t("settings.save")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export { SettingsDialog };
