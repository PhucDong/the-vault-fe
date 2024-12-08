import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Box, Typography } from "@mui/material";

function ReadMoreButton() {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Typography
        sx={{
          color: "#70787a",
          fontWeight: 550,
          fontSize: { xs: "1.2rem", md: "1.3rem" },
        }}
      >
        Read More
      </Typography>
      <KeyboardArrowDownIcon
        sx={{
          fontSize: { xs: "2rem", md: "2.6rem" },
        }}
      />
    </Box>
  );
}

export default ReadMoreButton;
