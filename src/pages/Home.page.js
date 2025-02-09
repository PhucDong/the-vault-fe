import { Box, Typography } from "@mui/material";
import { useAppSelector } from "../services/hooks";
import { selectIsUserLoggedIn } from "../store/slices/authentication/authenticationSlice";
import { selectIsUserRegistered } from "../store/slices/user/userSlice";
import { Navigate } from "react-router-dom";
import CustomPaddingLayout from "../components/common/CustomPaddingLayout";
import SearchBar from "../components/common/SearchBar";
import WriteReviewBar from "../components/HomePage/WriteReviewBar";
import ReviewList from "../components/HomePage/ReviewList";

function HomePage() {
  const isUserLoggedIn = useAppSelector(selectIsUserLoggedIn);
  const isUserRegistered = useAppSelector(selectIsUserRegistered);

  if (isUserLoggedIn || isUserRegistered) {
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
