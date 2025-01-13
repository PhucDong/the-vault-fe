import DetailedItemDescription from "./DetailedItemDescription";
import DetailedItemRelatedEntryList from "./DetailedItemRelatedEntryList";
import DetailedItemCharacterList from "./DetailedItemCharacterList";
import DetailedItemStaffList from "./DetailedItemEmployeeList";
import DetailedItemSummaryStatList from "./DetailedItemSummaryStatList";
import DetailedItemReviewList from "./DetailedItemReviewList";
import DetailedItemRecommendationList from "./DetailedItemRecommendationList";
import { useMediaQuery } from "@mui/material";
import { Box } from "@mui/system";

function OverviewList({ tabValue, setTabValue, item }) {
  const isSmallScreenWidthAndAbove = useMediaQuery((theme) =>
    theme.breakpoints.up("sm")
  );

  return (
    <>
      {!isSmallScreenWidthAndAbove && <DetailedItemDescription item={item} />}
      <Box
        sx={{
          display: { md: "flex" },
          flexDirection: { md: "column" },
          gap: { md: "40px", lg: "60px" },
          flex: "1", // Allow flex shrink and grow
          overflow: "hidden", // Prevent overflow of content
          maxWidth: "100%", // Enforce child stays within bounds
        }}
      >
        <DetailedItemRelatedEntryList
          item={item}
          tabValue={tabValue}
          setTabValue={setTabValue}
        />
        <DetailedItemCharacterList
          item={item}
          tabValue={tabValue}
          setTabValue={setTabValue}
        />
        <DetailedItemStaffList
          item={item}
          tabValue={tabValue}
          setTabValue={setTabValue}
        />
        <DetailedItemSummaryStatList
          item={item}
          tabValue={tabValue}
          setTabValue={setTabValue}
        />
        <DetailedItemReviewList
          item={item}
          tabValue={tabValue}
          setTabValue={setTabValue}
        />
        <DetailedItemRecommendationList
          item={item}
          tabValue={tabValue}
          setTabValue={setTabValue}
        />
      </Box>
    </>
  );
}

export default OverviewList;
