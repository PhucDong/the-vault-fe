import { Button } from "@mui/material";
import React from "react";

function CustomStyledFastGenreButton(props) {
  const {value, children, onClick} = props;

  return (
    <Button
      value={value}
      onClick={onClick}
      sx={{
        padding: 0,
        textTransform: "capitalize",
        lineHeight: "100%",
        minWidth: 0,
        fontSize: { xs: "1rem", lg: "1.1rem" },
        fontWeight: 520,
        color: "primary.main",
        border: "none",
        
        "&:hover": {
          color: "info.main",
          backgroundColor: "transparent",
        },
      }}
    >
      {children}
    </Button>
  );
}

export default CustomStyledFastGenreButton;
