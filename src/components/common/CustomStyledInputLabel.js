import styled from "@emotion/styled";
import { InputLabel } from "@mui/material";

const CustomStyledInputLabel = styled(InputLabel)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontWeight: 550,
  fontSize: "0.9rem",
  lineHeight: "100%",
  marginBottom: "6px",
}));

export default CustomStyledInputLabel;
