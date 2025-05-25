import { Box, Typography } from "@mui/material";

function Recommendation({ item }) {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        // height: { xs: "232px", md: "252px" },
        // aspectRatio: "6 / 4",
        // flex: 1,
        // display: "flex",
        // flexDirection: "column",
      }}
    >
      {/* Image */}
      <Box
        sx={{
          backgroundColor: "#D9D9D9",
          width: "100%",
          height: "75%",
          // aspectRatio: "6 / 4", // Adjust height relative to width with 3/4 ratio
          marginBottom: "6px",
          borderRadius: "8px",
        }}
      >
        <img
          src={item.cardImg}
          alt={item.title}
          style={{
            display: "block",
            width: "100%",
            height: "100%",
            borderRadius: "8px",
          }}
        />
      </Box>

      {/* Title */}
      <Typography
        sx={{
          display: "-webkit-box",
          WebkitBoxOrient: "vertical",
          WebkitLineClamp: { xs: 2 },
          overflow: "hidden",
          textOverflow: "ellipsis",
          textAlign: "left",
          color: "primary.dark",
          // height: "25%",
          fontWeight: 550,
          lineHeight: { xs: 1.25, md: 1.35 },
          fontSize: { xs: "1rem" },
        }}
      >
        {item.title}
      </Typography>
    </Box>
  );
}

export default Recommendation;
