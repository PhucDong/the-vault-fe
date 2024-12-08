import { Box, Typography } from "@mui/material";
import React from "react";

function RelatedEntry({ item }) {
  return (
    <Box
      sx={{
        width: "100%",
        minHeight: { xs: "112px", sm: "124px" },
        display: "flex",
      }}
    >
      {/* Image */}
      <Box
        sx={{
          backgroundColor: "#D9D9D9",
          height: "100%",
          aspectRatio: "5/6",
        }}
      ></Box>

      {/* Title, format, & status */}
      <Box
        sx={{
          width: "100%",
          textAlign: "left",
          padding: { xs: "12px 8px" },
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Typography
            sx={{
              fontWeight: 600,
              marginBottom: "4px",
              fontSize: { xs: "0.9rem", md: "0.975rem" },
              color: "primary.main",
              lineHeight: { xs: 1.25, md: 1.35 },
            }}
          >
            {item.title}
          </Typography>
          <Typography
            sx={{
              color: "primary.light",
              fontSize: { xs: "0.8rem", md: "0.85rem" },
              fontWeight: 550,
            }}
          >
            {item.format}
          </Typography>
        </Box>

        <Typography
          sx={{
            fontSize: { xs: "0.7rem", md: "0.8rem" },
            color: "primary.light",
          }}
        >
          {item.status}
        </Typography>
      </Box>
    </Box>
  );
}

export default RelatedEntry;
