import { Typography } from "@mui/material";

function CollectionItemAction(props) {
  const { label, action } = props;
  return (
    <Typography
      sx={{
        fontSize: "0.95rem",
        color: label === "Edit" ? "info.main" : "error.main",
        fontWeight: 600,
        "&:hover": {
          cursor: "pointer",
        },
      }}
      onClick={action}
    >
      {label}
    </Typography>
  );
}

export default CollectionItemAction;
