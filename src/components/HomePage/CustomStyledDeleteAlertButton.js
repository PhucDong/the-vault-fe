import { Button } from "@mui/material";

function CustomStyledDeleteAlertButton(props) {
  const { onClick, children } = props;

  return (
    <Button
      onClick={onClick}
      sx={{
        border: children === "Cancel" ? "1px solid #A9A9A9" : "none",
        py: { xs: "8px" },
        px: { xs: "20px" },
        width: { xs: "100px", sm: "112px", md: "116px" },
        backgroundColor: () => {
          if (children === "Cancel") {
            return "#F0F0F0";
          } else if (children === "Delete") {
            return "error.main";
          }
        },
        color: children === "Cancel" ? "#A9A9A9" : "#fff",
        fontWeight: 550,
        textTransform: "capitalize",
        borderRadius: "20px",
        lineHeight: "100%",
        fontSize: { xs: "1.1rem", sm: "1.2rem", md: "1.3rem" },
        "&:hover": {
          backgroundColor: () => {
            if (children === "Cancel") {
              return "#F0F0F0";
            } else if (children === "Delete") {
              return "error.main";
            }
          },
        },
      }}
    >
      {children}
    </Button>
  );
}

export default CustomStyledDeleteAlertButton;
