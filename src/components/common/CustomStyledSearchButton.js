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
        fontSize: { xs: "1.25rem", md: "1.5rem" },
        lineHeight: "100%",
        width: { xs: "100%", sm: "30%" },
        height: { xs: "42px", sm: "46px", md: "50px" },
        borderRadius: "12px",
      }}
    >
      {children}
    </Button>
  );
}

export default CustomStyledSearchButton;
