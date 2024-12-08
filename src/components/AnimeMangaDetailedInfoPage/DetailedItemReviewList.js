import { Box, Typography } from "@mui/material";
import CustomPaddingLayout from "../common/CustomPaddingLayout";
import { Link } from "react-router-dom";
import AnimeReview from "./AnimeReview";
import { useEffect, useMemo, useState } from "react";

function DetailedItemReviewList(props) {
  const { item, tabValue, setTabValue } = props;
  const [reviewList, setReviewList] = useState(null);

  const getFilteredReviewList = useMemo(() => {
    if (item.reviews && item.reviews.length > 0 && reviewList) {
      return reviewList.filter((review) => item.reviews.includes(review.id));
    }
  }, [item.reviews, reviewList]);

  useEffect(() => {
    fetch("http://localhost:3800/reviewList")
      .then((response) => response.json())
      .then((data) => setReviewList(data));
  }, []);

  return (
    <CustomPaddingLayout
      sx={{
        padding: {
          xs: "20px 32px",
          sm: "28px 56px",
          md: "0",
          lg: "0",
        },
        flex: 1,
      }}
    >
      <Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: { xs: "8px", sm: "12px", lg: "16px" },
            "& .MuiTypography-root": {
              fontSize: { xs: "1.1rem", sm: "1.2rem" },
              fontWeight: 600,
              color: "primary.main",
            },
            "& a": {
              textDecoration: "none",
              color: "info.main",
              fontWeight: 550,
              lineHeight: "100%",
              fontSize: { xs: "1rem", sm: "1.125rem" },
            },
          }}
        >
          <Typography>Reviews</Typography>
          {tabValue === 0 && (
            <Link onClick={() => setTabValue(3)}>View All</Link>
          )}
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            flexWrap: { xs: "nowrap", md: "wrap" },
            justifyContent: "space-between",
            gap: "8px",
          }}
        >
          {getFilteredReviewList && getFilteredReviewList.length > 0 ? (
            getFilteredReviewList
              .slice(0, 6)
              .map((animeReview, index) => (
                <AnimeReview
                  key={index}
                  item={item}
                  animeReview={animeReview}
                />
              ))
          ) : (
            <Typography sx={{ fontSize: { xs: "0.95rem", sm: "1.1rem" } }}>
              No reviews found.
            </Typography>
          )}
        </Box>
      </Box>
    </CustomPaddingLayout>
  );
}

export default DetailedItemReviewList;
