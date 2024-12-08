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
          justifyContent: { xs: "space-between" },
          gap: { xs: "24px", sm: "32px", md: "20px" },
          "& .MuiTypography-root": { textAlign: "center" },
          "& .MuiBox-root": {
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
          },
          "& .episode-duration": {
            textTransform: "lowercase",
          },
        }}
      >
        <Box>
          <Typography className="extra-info-heading">Format</Typography>
          <Typography className="extra-info-data">{item.format}</Typography>
        </Box>

        <Box>
          <Typography className="extra-info-heading">
            {item.format === "TV" ? "Aired Date" : "Publishing Date"}
          </Typography>
          <Typography className="extra-info-data">
            {item.format === "TV" ? item.airedDate : item.publishingDate}
          </Typography>
        </Box>

        <Box>
          <Typography className="extra-info-heading">Status</Typography>
          <Typography className="extra-info-data">{item.status}</Typography>
        </Box>

        <Box>
          <Typography className="extra-info-heading">
            {item.format === "TV" ? "Episode Duration" : "Chapters"}
          </Typography>
          <Typography className="extra-info-data episode-duration">
            {item.format === "TV"
              ? `${item.episodeDuration} mins`
              : item.chapters}
          </Typography>
        </Box>

        <Box sx={{ "& .MuiBox-root": { gap: "6px" } }}>
          <Typography className="extra-info-heading">Genres</Typography>
          <Box>
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
