import { Button } from "@mui/material";
import React from "react";

function CustomStyledSearchButton({ children, onClick }) {
  return (
    <Button
      onClick={onClick}
      sx={{
        backgroundColor: "info.main",
        color: "secondary.main",
        textTransform: "capitalize",
        fontSize: "1.25rem",
        lineHeight: "100%",
        width: "100%",
        height: "42px",
        borderRadius: "12px",
      }}
    >
      {children}
    </Button>
  );
}

export default CustomStyledSearchButton;
