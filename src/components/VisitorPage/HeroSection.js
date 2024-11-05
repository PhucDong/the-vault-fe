import { Box, Button, Typography } from "@mui/material";
import ProjectFeature from "./ProjectFeature";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ReviewsIcon from "@mui/icons-material/Reviews";
import PeopleIcon from "@mui/icons-material/People";
import { useNavigate } from "react-router-dom";

const projectFeatureList = [
  {
    icon: <VisibilityIcon />,
    heading: "Discover your passion",
    body: "Search for a variety of animes and mangas",
  },
  {
    icon: <ReviewsIcon />,
    heading: "Know what others think",
    body: "Read reviews of other users from the community",
  },
  {
    icon: <PeopleIcon />,
    heading: "Connect with others",
    body: "Discuss your favorite topics with other hobbyists",
  },
];

function HeroSection() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        padding: {
          xs: "60px 28px 16px 28px",
          sm: "76px 60px 32px 60px",
          md: "92px 100px 32px 100px",
        },
        backgroundColor: "primary.main",
      }}
    >
      <Box
        sx={{
          color: "secondary.main",
          display: "flex",
          flexDirection: "column",
          gap: { xs: "48px", sm: "56px", md: "64px", lg: "72px" },
        }}
      >
        {/* Project name & description */}
        <Box
          sx={{
            "& .MuiTypography-root": {
              textAlign: "center",
            },
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: "2.4rem", sm: "2.6rem", md: "2.8rem" },
              fontWeight: 600,
              marginBottom: { xs: "8px", md: "12px" },
            }}
          >
            The Vault
          </Typography>
          <Typography
            sx={{
              lineHeight: "1.25",
              fontSize: { xs: "1.2rem", sm: "1.4rem" },
            }}
          >
            Find your favorite animes and connect with like-minded people
          </Typography>
        </Box>

        {/* Project features */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: { md: "space-between" },
            alignItems: { md: "stretch" },
            gap: { xs: "28px", sm: "36px" },
          }}
        >
          {projectFeatureList.map((projectFeature, index) => (
            <ProjectFeature
              key={index}
              icon={projectFeature.icon}
              heading={projectFeature.heading}
              body={projectFeature.body}
            />
          ))}
        </Box>

        {/* Register button */}
        <Box sx={{ margin: "0 auto" }}>
          <Button
            onClick={() => navigate("/register")}
            sx={{
              backgroundColor: "info.main",
              borderRadius: "12px",
              border: "none",
              textTransform: "capitalize",
              fontSize: { xs: "1.1rem", sm: "1.2rem" },
              padding: { xs: "12px 20px", sm: "16px 24px" },
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
