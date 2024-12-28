import { Box, Typography } from "@mui/material";
import CustomPaddingLayout from "../common/CustomPaddingLayout";

function DetailedItemExtraInfo({ item }) {
  return (
    <CustomPaddingLayout
      sx={{
        padding: {
          xs: "24px 32px",
          sm: "40px 56px",
          md: "0",
          lg: "0",
        },
      }}
    >
      <Box
        sx={{
          padding: { md: "16px" },
          borderRadius: { md: "8px" },
          display: "flex",
          flexDirection: { xs: "row", md: "column" },
          border: { md: "1px solid #A9A9A9" },
          flexWrap: { xs: "wrap", md: "nowrap" },
          gap: { xs: "32px", md: "20px" },
          "& .MuiTypography-root": { textAlign: "center" },
          "& .extra-info-container": {
            flex: { xs: 1, md: 0 },
            display: "flex",
            gap: "8px",
            flexDirection: "column",
          },
          "& .extra-info-heading": {
            color: "#ababab",
            fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
            fontWeight: 550,
          },
          "& .extra-info-data": {
            color: "primary.main",
            fontSize: { xs: "1rem", sm: "1.1rem", md: "1.2rem" },
            fontWeight: 600,
            textTransform: "capitalize",
            lineHeight: 1.25,
          },
          "& .episode-duration": {
            textTransform: "lowercase",
          },
        }}
      >
        <Box className="extra-info-container">
          <Typography className="extra-info-heading">Format</Typography>
          <Typography className="extra-info-data">{item.format}</Typography>
        </Box>

        <Box className="extra-info-container">
          <Typography className="extra-info-heading">
            {item.format === "TV" ? "Aired Date" : "Publishing Date"}
          </Typography>
          <Typography className="extra-info-data">
            {item.format === "TV" ? item.airedDate : item.publishingDate}
          </Typography>
        </Box>

        <Box className="extra-info-container">
          <Typography className="extra-info-heading">Status</Typography>
          <Typography className="extra-info-data">{item.status}</Typography>
        </Box>

        <Box className="extra-info-container">
          <Typography className="extra-info-heading">
            {item.format === "TV" ? "Episode Duration" : "Chapters"}
          </Typography>
          <Typography className="extra-info-data episode-duration">
            {item.format === "TV"
              ? `${item.episodeDuration} mins`
              : item.chapters}
          </Typography>
        </Box>

        {/* Studio */}
        <Box className="extra-info-container">
          <Typography className="extra-info-heading">Studio</Typography>
          <Typography className="extra-info-data">{item.studio}</Typography>
        </Box>

        {/* Producers */}
        <Box className="extra-info-container">
          <Typography className="extra-info-heading">Producers</Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            {item.producers.map((producer, index) => (
              <Typography key={index} className="extra-info-data">
                {producer}
              </Typography>
            ))}
          </Box>
        </Box>

        {/* Genres */}
        <Box className="extra-info-container">
          <Typography className="extra-info-heading">Genres</Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            {item.genres.map((genre, index) => (
              <Typography key={index} className="extra-info-data">
                {genre}
              </Typography>
            ))}
          </Box>
        </Box>
      </Box>
    </CustomPaddingLayout>
  );
}

export default DetailedItemExtraInfo;
