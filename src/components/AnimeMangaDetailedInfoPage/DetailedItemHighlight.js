import { Box, Typography } from "@mui/material";
import CustomPaddingLayout from "../common/CustomPaddingLayout";

function DetailedItemHighlight({ item }) {
  return (
    <CustomPaddingLayout
      sx={{
        backgroundColor: { xs: "info.main", md: "transparent" },
        padding: {
          xs: "20px 32px",
          sm: "28px 56px",
          md: "0",
          lg: "0",
        },
      }}
    >
      <Box
        sx={{
          backgroundColor: { md: "info.main" },
          padding: { md: "16px" },
          borderRadius: { md: "8px" },
          display: "flex",
          flexDirection: { xs: "row", md: "column" },
          justifyContent: { xs: "space-between" },
          gap: { md: "20px" },
          "& .MuiTypography-root": { textAlign: "center" },
          "& .MuiBox-root": {
            display: "flex",
            gap: "8px",
            flexDirection: "column",
          },
          "& .highlight-heading": {
            color: "primary.main",
            fontSize: { xs: "1rem", sm: "1.1rem", md: "1.2rem", lg: "1.3rem" },
            fontWeight: 550,
          },
          "& .highlight-number": {
            color: "#fff",
            fontSize: {
              xs: "1.45rem",
              sm: "1.55rem",
              md: "1.65rem",
              lg: "1.75rem",
            },
            fontWeight: 600,
          },
        }}
      >
        <Box>
          <Typography className="highlight-heading">Score</Typography>
          <Typography className="highlight-number">{item.score}</Typography>
        </Box>

        <Box>
          <Typography className="highlight-heading">Rank</Typography>
          <Typography className="highlight-number">{`#${item.rank}`}</Typography>
        </Box>

        <Box>
          <Typography className="highlight-heading">Popularity</Typography>
          <Typography className="highlight-number">{`#${item.popularity}`}</Typography>
        </Box>

        <Box>
          <Typography className="highlight-heading">Members</Typography>
          <Typography className="highlight-number">{item.members}</Typography>
        </Box>
      </Box>
    </CustomPaddingLayout>
  );
}

export default DetailedItemHighlight;
