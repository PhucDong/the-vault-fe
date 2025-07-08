import { Button } from "@mui/material";

function AddToCollectionFormButton(props) {
  const { children, onClick } = props;

  return (
    <Button
      sx={{
        lineHeight: "100%",
        padding: { xs: "12px 16px" },
        textTransform: "capitalize",
        fontSize: { xs: "1.2rem", sm: "1.3rem" },
        width: { xs: "100%" },
        backgroundColor: children === "Save" ? "info.main" : "error.main",
        color: "#fff",
        borderRadius: "8px",
      }}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}

export default AddToCollectionFormButton;
