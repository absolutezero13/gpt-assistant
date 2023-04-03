import { Select, SelectProps } from "@mui/material";

const StyledSelect = (props: SelectProps) => {
  return (
    <Select
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
      {...props}
    >
      {props.children}
    </Select>
  );
};

export { StyledSelect };
