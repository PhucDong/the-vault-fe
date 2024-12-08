import { Accordion, AccordionSummary, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useRef, useState } from "react";
import CustomPaddingLayout from "../common/CustomPaddingLayout";
import ReadMoreButton from "../AnimeMangaDetailedInfoPage/ReadMoreButton";

function DetailedCharacterHeader(props) {
  const { item } = props;
  const [expandedAccordion, setExpandedAccordion] = useState(false);
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
  }, [expandedAccordion]);

  return (
    <Box
      ref={parentBoxRef}
      sx={{ position: "relative", height: `${parentHeight}px` }}
    >
      {/* Cover image of anime */}
      <Box
        sx={{
          height: { xs: "180px", sm: "220px", md: "260px", lg: "300px" },
          backgroundColor: "#D9D9D9",
        }}
      ></Box>

      {/* Profile image, title, descriptio, & buttons */}
      <CustomPaddingLayout
        sx={{
          width: "100%",
          position: "absolute",
          top: { xs: "120px", sm: "152px", md: "192px", lg: "232px" },
          left: 0,
          display: { xs: "flex" },
          flexDirection: { xs: "column", sm: "row" },
          alignItems: { xs: "center", sm: "flex-start" },
          gap: { xs: "20px", md: "28px" },
        }}
      >
        {/* Avatar */}
        <Box
          sx={{
            width: { xs: "152px", sm: "24%", xl: "20%" },
            aspectRatio: { xs: "4/5", xl: "5/6" },
            backgroundColor: "#ABABAB",
          }}
        ></Box>

        {/* Name, gender, birthday, description */}
        <Box
          sx={{
            textAlign: { xs: "center", sm: "left" },
            width: { sm: "76%", xl: "80%" },
          }}
        >
          {/* Name, gender, birthday */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column" },
              gap: { xs: "8px", lg: "12px" },
            }}
          >
            {/* Name */}
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
              {item.name}
            </Typography>

            {/* Gender */}
            <Typography
              sx={{
                fontSize: { xs: "1.3rem", sm: "1.4rem", lg: "1.6rem" },
                textTransform: "capitalize",
              }}
            >{`Gender: ${item.gender ? item.gender : "N/A"}`}</Typography>

            {/* Birthday */}
            <Typography
              sx={{ fontSize: { xs: "1.3rem", sm: "1.4rem", lg: "1.6rem" } }}
            >{`Birthday: ${item.birthday ? item.birthday : "N/A"}`}</Typography>
          </Box>

          {/* Description */}
          <Accordion
            expanded={expandedAccordion}
            onChange={() => setExpandedAccordion(!expandedAccordion)}
            sx={{
              marginTop: "20px",
              boxShadow: "none",
              "&::before": {
                backgroundColor: "#fff",
              },
              "&:last-of-type": {
                borderRadius: 0,
              },
            }}
          >
            <AccordionSummary
              expandIcon={<ReadMoreButton />}
              sx={{
                padding: 0,
                flexDirection: "column",
                gap: { xs: "4px", sm: "4px", md: "8px" },
                "& .MuiAccordionSummary-content": {
                  margin: 0,
                  flexDirection: "column",
                  gap: "8px",
                  "& .MuiTypography-root": {
                    lineHeight: { xs: 1.25, sm: 1.35 },
                    fontSize: {
                      xs: "1.2rem",
                      lg: "1.3rem",
                    },
                    color: "#ababab",
                  },
                },
                "& .MuiAccordionSummary-expandIconWrapper": {
                  width: "100%",
                  justifyContent: "center",
                  "&.Mui-expanded": { transform: "rotate(0)" },
                  "& .MuiSvgIcon-root": {
                    transform: expandedAccordion && "rotate(180deg)",
                  },
                },
              }}
            >
              <Typography>
                {`${item.description.slice(0, 230)}`}{" "}
                {expandedAccordion && `${item.description.slice(230)}`}
              </Typography>
            </AccordionSummary>
          </Accordion>
        </Box>
      </CustomPaddingLayout>
    </Box>
  );
}

export default DetailedCharacterHeader;
