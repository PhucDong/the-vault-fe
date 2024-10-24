import { Box, Typography } from "@mui/material";

function ProjectFeature(children) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        gap: "10px",
        "& .MuiTypography-root": {
          color: "secondary.main",
        },
        "& .MuiSvgIcon-root": { fontSize: "2.85rem" },
      }}
    >
      {children.icon}

      <Box>
        <Typography
          sx={{ marginBottom: "4px", fontSize: "1.2rem", fontWeight: 600 }}
        >
          {children.heading}
        </Typography>
        <Typography sx={{ fontSize: "1rem", lineHeight: "1.25" }}>
          {children.body}
        </Typography>
      </Box>
    </Box>
  );
}

export default ProjectFeature;
