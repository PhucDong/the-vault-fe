import { Button } from "@mui/material";

function CustomDetailedItemButton({ children, onClick }) {
  return (
    <Button
      sx={{
        minHeight: { sm: "34px", md: "36px", lg: "38px" },
        borderRadius: "8px",
        padding: { xs: "8px 16px" },
        textTransform: "capitalize",
        lineHeight: 1.25,
        fontSize: { xs: "0.875rem", sm: "1rem", md: "1.1rem" },
        fontWeight: 550,
        border: children === "Add to collection" && "1px solid #ababab",
        color: children === "Add to collection" ? "primary.main" : "#fff",
        backgroundColor:
          children === "Add to collection" ? "#fff" : "info.main",
        "&:hover": {
          backgroundColor:
            children === "Add to collection" ? "#fff" : "info.main",
        },
      }}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}

export default CustomDetailedItemButton;
