import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function AnimeCharacter({ animeCharacter }) {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        width: { xs: "100%", md: "49%" },
        height: { xs: "116px", md: "120px" },
        border: "1px solid #A9A9A9",
        borderRadius: "8px",
        display: "flex",
        "&:hover": {
          cursor: "pointer",
        },
      }}
      onClick={() => navigate(`/characters/${animeCharacter.id}`)}
    >
      {/* Image */}
      <Box
        sx={{
          borderRadius: "8px 0 0 8px",
          backgroundColor: "#D9D9D9",
          height: { xs: "116px", md: "120px" }, // Fills the parent height
          aspectRatio: "4/5", // Maintain 3:4 ratio relative to width
        }}
      ></Box>

      {/* Title, format, & status */}
      <Box
        sx={{
          width: "100%",
          height: { xs: "116px", md: "120px" },
          textAlign: "left",
          padding: { xs: "12px" },
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Typography
            sx={{
              fontWeight: 600,
              marginBottom: "6px",
              fontSize: { xs: "1rem", md: "0.9rem", lg: "1rem" },
              color: "primary.main",
              lineHeight: 1.25,
            }}
          >
            {animeCharacter.name}
          </Typography>
          <Typography
            sx={{
              color: "primary.light",
              fontSize: { xs: "0.885rem", md: "0.785rem", lg: "0.885rem" },
              fontWeight: 550,
              textTransform: "capitalize",
            }}
          >
            {animeCharacter.type}
          </Typography>
        </Box>

        <Typography
          sx={{
            fontSize: { xs: "0.7rem", md: "0.8rem" },
            color: "primary.light",
            fontWeight: 520,
          }}
        >
          {`VA: ${animeCharacter.va}`}
        </Typography>
      </Box>
    </Box>
  );
}

export default AnimeCharacter;