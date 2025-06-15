import { Button } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const collectionBtnLabelList = [
  "Reading",
  "Watching",
  "Completed",
  "On Hold",
  "Dropped",
  "Plan To Read",
  "Plan To Watch",
  "Add to collection",
];

function CustomDetailedItemButton({ children, onClick }) {
  return (
    <Button
      sx={{
        minHeight: { sm: "34px", md: "36px", lg: "38px" },
        borderRadius: "8px",
        padding: { xs: "8px 16px" },
        textTransform: "capitalize",
        lineHeight: 1.25,
        fontSize: collectionBtnLabelList.includes(children)
          ? {
              xs: "0.875rem",
              sm: "1rem",
              md: "0.8rem",
              lg: "0.875rem",
              xl: "0.88rem",
            }
          : { xs: "0.875rem", sm: "1rem", md: "1.1rem" },
        fontWeight: 550,
        border:
          collectionBtnLabelList.includes(children) && "1px solid #ababab",
        color: collectionBtnLabelList.includes(children)
          ? "primary.main"
          : "#fff",
        backgroundColor: collectionBtnLabelList.includes(children)
          ? "#fff"
          : "info.main",
        "&:hover": {
          backgroundColor: collectionBtnLabelList.includes(children)
            ? "#fff"
            : "info.main",
        },
        display: "flex",
        alignItems: "center",
        gap: { md: "2px", lg: 0 },
        "& svg": {
          fontSize: { xs: "1.6rem", lg: "1.8rem" },
        },
      }}
      onClick={onClick}
    >
      {children}

      {collectionBtnLabelList.includes(children) && <KeyboardArrowDownIcon />}
    </Button>
  );
}

export default CustomDetailedItemButton;
