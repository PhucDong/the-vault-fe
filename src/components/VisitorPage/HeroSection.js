import { Box, Button, Typography } from "@mui/material";
import ProjectFeature from "./ProjectFeature";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ReviewsIcon from "@mui/icons-material/Reviews";
import PeopleIcon from "@mui/icons-material/People";
import { useNavigate } from "react-router-dom";

function HeroSection() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{ padding: "60px 28px 28px 28px", backgroundColor: "primary.main" }}
    >
      <Box
        sx={{
          color: "secondary.main",
          display: "flex",
          flexDirection: "column",
          gap: "32px",
        }}
      >
        <Box
          sx={{
            "& .MuiTypography-root": {
              textAlign: "center",
            },
          }}
        >
          <Typography
            sx={{
              fontSize: "2rem",
              fontWeight: 600,
              marginBottom: "6px",
            }}
          >
            The Vault
          </Typography>
          <Typography sx={{ lineHeight: "1.25", fontSize: "1.2rem" }}>
            Find your favorite animes and connect with like-minded people
          </Typography>
        </Box>
        
        {/* Project features */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: "28px" }}>
          <ProjectFeature
            icon={<VisibilityIcon />}
            heading="Discover your passion"
            body="Search for a variety of animes and mangas"
          />
          <ProjectFeature
            icon={<ReviewsIcon />}
            heading="Know what others think"
            body="Read reviews of other users from the community"
          />
          <ProjectFeature
            icon={<PeopleIcon />}
            heading="Connect with others"
            body="Discuss your favorite topics with other hobbyists"
          />
        </Box>

        <Box sx={{ margin: "0 auto" }}>
          <Button
            onClick={() => navigate("users")}
            sx={{
              backgroundColor: "info.main",
              borderRadius: "12px",
              border: "none",
              textTransform: "capitalize",
              fontSize: "1.1rem",
              padding: "12px 20px",
              lineHeight: "100%",
              color: "secondary.main",
            }}
          >
            Register Now
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default HeroSection;
