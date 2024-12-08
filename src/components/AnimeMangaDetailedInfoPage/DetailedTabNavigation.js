import { Tab, Tabs } from "@mui/material";
import { useState } from "react";
import CustomTabPanel from "./CustomTabPanel";
import CustomPaddingLayout from "../common/CustomPaddingLayout";
import DetailedItemCharacterList from "./DetailedItemCharacterList";
import DetailedItemStaffList from "./DetailedItemStaffList";
import DetailedItemReviewList from "./DetailedItemReviewList";
import DetailedItemRelatedEntryList from "./DetailedItemRelatedEntryList";
import DetailedItemSummaryStatList from "./DetailedItemSummaryStatList";
import DetailedItemRecommendationList from "./DetailedItemRecommendationList";
import OverviewList from "./OverviewList";

function a11yProps(index) {
  return {
    id: `simple-nav-tab-${index}`,
    "aria-controls": `simple-navtab-panel-${index}`,
  };
}

function DetailedTabNavigation({ item }) {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <CustomPaddingLayout
        sx={{
          marginTop: { xs: "108px", sm: "224px", md: "264px", lg: "286px" },
          marginBottom: { md: "12px" },
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          variant="scrollable"
          scrollButtons={false}
          sx={{
            "& .MuiTabs-flexContainer": {
              gap: { xs: "20px", sm: "24px", md: "28px", lg: "32px" },
              "& .MuiButtonBase-root": {
                padding: 0,
                minWidth: "auto",
                textTransform: "capitalize",
                color: "primary.light",
                fontWeight: 600,
                fontSize: {
                  xs: "1.075rem",
                  sm: "1.1rem",
                  md: "1.175rem",
                  lg: "1.2rem",
                },
                "&.Mui-selected": {
                  color: "primary.main",
                },
              },
            },
            "& .MuiTabs-indicator": {
              display: "none", // Hides the underline of each selected tab
            },
          }}
        >
          <Tab label="Overview" {...a11yProps(0)} />
          <Tab label="Characters" {...a11yProps(1)} />
          <Tab label="Staff" {...a11yProps(2)} />
          <Tab label="Reviews" {...a11yProps(3)} />
          <Tab label="Related Entries" {...a11yProps(4)} />
          <Tab label="Stats" {...a11yProps(5)} />
          <Tab label="Recommendations" {...a11yProps(6)} />
        </Tabs>
      </CustomPaddingLayout>

      <CustomTabPanel value={value} index={0} item={item}>
        <OverviewList item={item} tabValue={value} setTabValue={setValue} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1} item={item}>
        <DetailedItemCharacterList
          item={item}
          tabValue={value}
          setTabValue={setValue}
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2} item={item}>
        <DetailedItemStaffList
          item={item}
          tabValue={value}
          setTabValue={setValue}
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3} item={item}>
        <DetailedItemReviewList
          item={item}
          tabValue={value}
          setTabValue={setValue}
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={4} item={item}>
        <DetailedItemRelatedEntryList item={item} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={5} item={item}>
        <DetailedItemSummaryStatList
          item={item}
          tabValue={value}
          setTabValue={setValue}
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={6} item={item}>
        <DetailedItemRecommendationList
          item={item}
          tabValue={value}
          setTabValue={setValue}
        />
      </CustomTabPanel>
    </>
  );
}

export default DetailedTabNavigation;
