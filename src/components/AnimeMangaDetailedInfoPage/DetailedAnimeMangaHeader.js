import {
  Accordion,
  AccordionSummary,
  Box,
  Typography,
  useMediaQuery,
} from "@mui/material";
import CustomPaddingLayout from "../common/CustomPaddingLayout";
import CustomDetailedItemButton from "./CustomDetailedItemButton";
import ReadMoreButton from "./ReadMoreButton";
import { useState } from "react";
import LogInAlertModal from "./LogInAlertModal";
import { useSelector } from "react-redux";
import AddToListForm from "./AddToListForm/AddToListForm";
import { useNavigate } from "react-router-dom";
import { selectIsUserLoggedIn } from "../../store/slices/authentication/authenticationSlice";

function DetailedAnimeMangaHeader({ item }) {
  const isSmallScreenWidthAndAbove = useMediaQuery((theme) =>
    theme.breakpoints.up("sm")
  );
  const [expandedAccordion, setExpandedAccordion] = useState(false);
  const isUserLoggedIn = useSelector(selectIsUserLoggedIn);
  const [openLogInAlert, setOpenLogInAlert] = useState(false);
  const [openAddToList, setOpenAddToList] = useState(false);
  const navigate = useNavigate();

  const handleOpenAddToList = () => {
    if (!isUserLoggedIn) {
      setOpenLogInAlert(true);
    } else {
      setOpenAddToList(true);
    }
  };

  const handleOpenReview = () => {
    if (!isUserLoggedIn) {
      setOpenLogInAlert(true);
    } else {
      navigate("/reviews/editor");
    }
  };

  return (
    <Box sx={{ position: "relative" }}>
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
          display: { xs: "block", sm: "flex" },
          gap: { sm: "20px" },
        }}
      >
        {/* xs: image, title & buttons
        sm & above: image & buttons */}
        <Box
          sx={{
            display: "flex",
            alignItems: "stretch",
            flexDirection: { xs: "row", sm: "column" },
            gap: "12px",
          }}
        >
          {/* Item image */}
          <Box
            sx={{
              height: { xs: "144px", sm: "184px", md: "216px", lg: "232px" },
              width: { xs: "112px", sm: "144px", md: "172px", lg: "180px" },
              backgroundColor: "#ABABAB",
            }}
          ></Box>

          {/* Item title & buttons */}
          <Box
            sx={{
              display: { xs: "flex", sm: "block" },
              flexDirection: "column",
              justifyContent: "flex-end",
              gap: { xs: "12px", sm: 0 },
            }}
          >
            {/* Title */}
            {isSmallScreenWidthAndAbove ? null : (
              <Typography
                sx={{
                  fontSize: { xs: "1.125rem" },
                  fontWeight: 600,
                  color: "primary.main",
                }}
              >
                {item.title}
              </Typography>
            )}

            <Box
              sx={{
                display: "flex",
                gap: "4px",
                flexDirection: { xs: "row", sm: "column" },
              }}
            >
              <CustomDetailedItemButton onClick={handleOpenAddToList}>
                Add to list
              </CustomDetailedItemButton>
              <CustomDetailedItemButton onClick={handleOpenReview}>
                Write review
              </CustomDetailedItemButton>

              <LogInAlertModal
                openLogInAlert={openLogInAlert}
                setOpenLogInAlert={setOpenLogInAlert}
              />
              <AddToListForm
                itemTitle={item.title}
                openAddToList={openAddToList}
                setOpenAddToList={setOpenAddToList}
              />
            </Box>
          </Box>
        </Box>

        {/* Display title and its description when screen's width is 600px & above */}
        {isSmallScreenWidthAndAbove ? (
          <Box sx={{ paddingTop: "96px" }}>
            <Typography
              sx={{
                fontSize: { sm: "1.325rem", md: "1.425rem", lg: "1.525rem" },
                fontWeight: 600,
                color: "primary.main",
                marginBottom: "8px",
              }}
            >
              {item.title}
            </Typography>
            <Accordion
              expanded={expandedAccordion}
              onChange={() => setExpandedAccordion(!expandedAccordion)}
              sx={{
                boxShadow: "none",
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
                      lineHeight: { sm: 1.3, lg: 1.5 },
                      fontSize: {
                        sm: "0.935rem",
                        md: "0.975rem",
                        lg: "1.015rem",
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
        ) : null}
      </CustomPaddingLayout>
    </Box>
  );
}

export default DetailedAnimeMangaHeader;
