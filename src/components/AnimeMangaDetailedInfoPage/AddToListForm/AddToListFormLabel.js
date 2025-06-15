import { InputLabel } from "@mui/material";
import React from "react";

function AddToListFormLabel(props) {
  const { children, htmlFor } = props;

  return (
    <InputLabel
      htmlFor={htmlFor}
      sx={{
        color: "#70787a",
        fontWeight: 600,
        fontSize: { xs: "0.875rem", md: "0.975rem", lg: "1rem" },
        marginBottom: "4px",
      }}
    >
      {children}
    </InputLabel>
  );
}

export default AddToListFormLabel;
