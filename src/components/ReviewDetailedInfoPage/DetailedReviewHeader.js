import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useRef, useState } from "react";
import CustomPaddingLayout from "../../components/common/CustomPaddingLayout";

function DetailedReviewHeader(props) {
  const { item } = props;
  const parentBoxRef = useRef(null); // Reference for the parent Box
  const [parentHeight, setParentHeight] = useState(0); // State to store the height

  useEffect(() => {
    if (parentBoxRef.current) {
      const coverImage = parentBoxRef.current.querySelector(
        ":scope > div:first-of-type"
      );
      const customPaddingLayout = parentBoxRef.current.querySelector(
        ":scope > div:nth-child(2)"
      );

      if (coverImage && customPaddingLayout) {
        const coverImageHeight = coverImage.offsetHeight;

        const paddingLayoutHeight = customPaddingLayout.offsetHeight;
        const paddingLayoutTop = parseInt(
          window.getComputedStyle(customPaddingLayout).top,
          10
        );

        // Calculate the bottom edge of CustomPaddingLayout
        const paddingLayoutBottom = paddingLayoutTop + paddingLayoutHeight;

        // Total height is the maximum of the cover image height and the bottom of CustomPaddingLayout
        setParentHeight(Math.max(coverImageHeight, paddingLayoutBottom));
      }
    }
  }, []);

  return (
    <Box
      ref={parentBoxRef}
      sx={{ position: "relative", height: `${parentHeight}px` }}
    >
      {/* Cover image of anime */}
      <Box
        sx={{
          width: "100%",
          aspectRatio: {
            xs: "16 / 7",
            sm: "14 / 6",
            md: "14 / 5",
            xl: "16 / 5",
          },
        }}
      >
        <img
          src={item.targetId.coverImg}
          alt={item.targetId.title}
          style={{ display: "block", width: "100%", height: "100%" }}
        />
      </Box>

      {/* Profile image, title, descriptio, & buttons */}
      <CustomPaddingLayout
        sx={{
          width: "100%",
          position: "absolute",
          top: {
            xs: "120px",
            sm: "196px",
            md: "260px",
            lg: "368px",
            xl: "424px",
          },
          left: 0,
          display: { xs: "flex" },
          flexDirection: { xs: "column" },
          alignItems: { xs: "center" },
          gap: { xs: "20px", md: "28px" },
        }}
      >
        {/* Avatar */}
        <Box
          sx={{
            width: { xs: "132px", sm: "140px", md: "148px" },
            aspectRatio: { xs: "4/5", xl: "5/6" },
          }}
        >
          <img
            src={item.author.profilePic}
            alt={item.author.username}
            style={{ width: "100%", height: "100%" }}
          />
        </Box>

        {/* Title, author */}
        <Box
          sx={{
            textAlign: { xs: "center" },
            display: "flex",
            flexDirection: { xs: "column" },
            gap: { xs: "8px", lg: "12px" },
          }}
        >
          {/* Title */}
          <Typography
            sx={{
              fontSize: {
                xs: "1.6rem",
                sm: "1.8rem",
                md: "2rem",
                lg: "2.2rem",
                xl: "2.4rem",
              },
              fontWeight: 600,
              color: "primary.main",
            }}
          >
            {item.targetId.title}
          </Typography>

          {/* Author */}
          <Typography
            sx={{
              fontSize: { xs: "1.3rem", sm: "1.4rem", lg: "1.6rem" },
            }}
          >{`Reviewed by ${item.author.username}`}</Typography>
        </Box>
      </CustomPaddingLayout>
    </Box>
  );
}

export default DetailedReviewHeader;
