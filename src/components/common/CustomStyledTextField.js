import styled from "@emotion/styled";
import { TextField } from "@mui/material";

const CustomStyledTextField = styled(TextField)(() => ({
  width: "100%",
  "& .MuiOutlinedInput-root": {
    height: "40px",
    borderRadius: "12px",
    fontSize: "0.9rem",
    fontWeight: 550,
    color: "primary.light",
    "& .MuiOutlinedInput-input": {
      padding: "0 16px",
      height: "40px",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      height: "100%",
      border: "1px solid, #A9A9A9",
      top: 0,
      bottom: 0,
      padding: "10px 16px",
      "& legend": {
        display: "none",
      },
    },
  },
  "& .MuiFormHelperText-root": {
    margin: "4px 0 0 0",
    lineHeight: "100%",
    fontWeight: 550,
  },
}));

export default CustomStyledTextField;
