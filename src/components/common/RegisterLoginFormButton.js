import { Button } from "@mui/material";

function RegisterLoginFormButton({ children, onClick }) {
  return (
    <Button
      onClick={onClick}
      sx={{
        marginTop: "24px",
        border: "none",
        width: "100%",
        backgroundColor: "info.main",
        color: "#fff",
        borderRadius: "12px",
        textTransform: "capitalize",
        fontSize: "1.25rem",
        lineHeight: "100%",
        padding: "12px 20px",
      }}
    >
      {children}
    </Button>
  );
}

export default RegisterLoginFormButton;
