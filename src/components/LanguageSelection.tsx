import { makeStyles } from "@material-ui/styles";
import { CheckCircleOutline } from "@mui/icons-material";
import { Box, MenuItem, Select } from "@mui/material";
import { useTranslation } from "react-i18next";
import { availabeLanguages } from "../utils/contants";

const useStyles = makeStyles({
  select: {
    "&:before": {
      borderColor: "white",
    },
    "&:after": {
      borderColor: "white",
    },
    "&:not(.Mui-disabled):hover::before": {
      borderColor: "white",
    },
  },
  icon: {
    fill: "white",
  },
  root: {
    color: "white",
  },
});

const LanguageSelection = () => {
  const classes = useStyles();
  const { t, i18n } = useTranslation();

  const onLanguageChange = (e: any) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <Select
      displayEmpty
      defaultValue=""
      className={classes.select}
      value={i18n.language.toUpperCase()}
      sx={{
        position: "absolute",
        zIndex: 999,
        marginTop: "0.5rem",
        right: "2rem",
        top: "1rem",
        width: "7rem",
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
      onChange={onLanguageChange}
      renderValue={(value: string) => {
        return (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <img
              src={
                availabeLanguages.find((lang) => lang.code === i18n.language)!
                  .image
              }
              alt="flag"
              style={{ width: "1.5rem", marginRight: "0.5rem" }}
            />
            {value}
          </Box>
        );
      }}
    >
      {availabeLanguages.map((lang) => (
        <MenuItem key={lang.code} value={lang.code} onClick={onLanguageChange}>
          {lang.name}
          {lang.code === i18n.language && (
            <CheckCircleOutline sx={{ color: "green", ml: 2 }} />
          )}
        </MenuItem>
      ))}
    </Select>
  );
};

export default LanguageSelection;
