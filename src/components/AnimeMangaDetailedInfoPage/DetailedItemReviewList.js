import { Box, Typography } from "@mui/material";
import CustomPaddingLayout from "../common/CustomPaddingLayout";
import { Link } from "react-router-dom";
import Review from "./Review";

function DetailedItemReviewList(props) {
  const { item, tabValue, setTabValue } = props;

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
        {tabValue === 0 && (
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
            <Link onClick={() => setTabValue(5)}>View All</Link>
          </Box>
        )}

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            flexWrap: { xs: "nowrap", md: "wrap" },
            // justifyContent: "space-between",
            gap: "8px",
          }}
        >
          {item.reviews && item.reviews.length > 0 ? (
            item.reviews
              .slice(0, 6)
              .map((review, index) => (
                <Review key={index} item={item} review={review} />
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
