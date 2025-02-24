import { Box } from "@mui/material";
import { Navigate } from "react-router-dom";
import CustomPaddingLayout from "../components/common/CustomPaddingLayout";
import SearchBar from "../components/common/SearchBar";
import WriteReviewBar from "../components/HomePage/WriteReviewBar";
import ReviewList from "../components/HomePage/ReviewList";
import useUser from "../hooks/useUser";

function HomePage() {
  const { isTokenExpired } = useUser();

  if (isTokenExpired.tokenExpiryStatus === false) {
    return (
      <CustomPaddingLayout>
        <Box
          sx={{
            marginTop: { xs: "24px", sm: "32px", md: "52px", lg: "72px" },
            marginBottom: { xs: "28px", md: "44px", lg: "56px" },
          }}
        >
          <SearchBar />
          <WriteReviewBar />
        </Box>
        <ReviewList />
      </CustomPaddingLayout>
    );
  } else {
    return <Navigate to="/" />;
  }
}

export default HomePage;
