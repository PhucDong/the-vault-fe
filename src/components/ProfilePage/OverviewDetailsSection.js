import { Box, Link, Typography } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import FavoriteIcon from "@mui/icons-material/Favorite";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

function OverviewDetailsSection(props) {
  const { user } = props;

  return (
    <Box>
      <Typography
        sx={{ fontSize: "1rem", fontWeight: 600, marginBottom: { xs: "6px" } }}
      >
        Details
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: { xs: "8px" },
          "& .MuiBox-root": {
            display: "flex",
            alignItems: "center",
            gap: { xs: "4px" },
          },
        }}
      >
        {user?.hometown && user?.hometown.length > 0 && (
          <Box>
            <HomeIcon />
            <Typography>
              Lives in{" "}
              <Typography component="span" sx={{ fontWeight: 600 }}>
                {user?.hometown}
              </Typography>
            </Typography>
          </Box>
        )}

        {user?.relationshipStatus && user?.relationshipStatus.length > 0 && (
          <Box>
            <FavoriteIcon />
            <Typography>{user?.relationshipStatus}</Typography>
          </Box>
        )}

        {user?.instagramLink && user?.instagramLink.length > 0 && (
          <Box>
            <InstagramIcon />
            <Link
              href={`https://www.instagram.com/${user?.instagramLink}`}
              underline="none"
              rel="noopener"
              target="_blank"
            >
              {user?.instagramLink}
            </Link>
          </Box>
        )}

        {user?.linkedinLink && user?.linkedinLink.length > 0 && (
          <Box>
            <LinkedInIcon />
            <Link
              href={`https://www.linkedin.com/in/${user?.linkedinLink}`}
              underline="none"
              rel="noopener"
              target="_blank"
            >
              {user?.linkedinLink}
            </Link>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default OverviewDetailsSection;
