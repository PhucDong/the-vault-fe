import { Box, Typography } from "@mui/material";

function ProjectFeature(children) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        flexDirection: { xs: "row", md: "column" },
        alignItems: "center",
        gap: { xs: "20px", md: "8px" },
        "& .MuiTypography-root": {
          color: "secondary.main",
          textAlign: { xs: "left", md: "center" },
        },
        "& .MuiSvgIcon-root": {
          fontSize: { xs: "2.8rem", sm: "3.2rem", md: "3.4rem", lg: "3.6rem" },
        },
      }}
    >
      {children.icon}

      <Box
        sx={{
          flex: 1,
          display: { xs: "block", md: "flex" },
          flexDirection: { md: "column" },
        }}
      >
        <Typography
          sx={{
            marginBottom: { xs: "4px", md: "8px" },
            fontSize: { xs: "1.2rem", md: "1.4rem", lg: "1.6rem" },
            lineHeight: { xs: "100%", md: 1.25 },
            fontWeight: 600,
            flex: 1,
          }}
        >
          {children.heading}
        </Typography>
        <Typography
          sx={{ fontSize: { xs: "1rem", lg: "1.2rem" }, lineHeight: "1.5" }}
        >
          {children.body}
        </Typography>
      </Box>
    </Box>
  );
}

export default ProjectFeature;
