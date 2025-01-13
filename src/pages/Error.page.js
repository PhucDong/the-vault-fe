import { Box, Button, Typography } from "@mui/material";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import { useNavigate } from "react-router-dom";

function ErrorPage() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: "8px",
          alignItems: "center",
          color: "error.main",
        }}
      >
        <Typography sx={{ fontWeight: 600, fontSize: "2rem" }}>
          Error 404
        </Typography>
        <SentimentVeryDissatisfiedIcon sx={{ fontSize: "2.4rem" }} />
      </Box>
      <Typography
        sx={{ fontSize: "1.4rem", fontWeight: 550, marginTop: "8px" }}
      >
        Page can't be found
      </Typography>
      <Button
        onClick={() => navigate("/")}
        sx={{
          backgroundColor: "info.main",
          borderRadius: "8px",
          lineHeight: "100%",
          padding: "12px 20px",
          color: "#fff",
          marginTop: "32px",
          fontSize: "1.1rem",
        }}
      >
        Back to home page
      </Button>
    </Box>
  );
}

export default ErrorPage;
