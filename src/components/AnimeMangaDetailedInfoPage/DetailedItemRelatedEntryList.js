import React, { useState } from "react";
import CustomPaddingLayout from "../common/CustomPaddingLayout";
import { Box, Typography, Tab, Tabs } from "@mui/material";
import RelatedEntry from "./RelatedEntry";
import { Link, useNavigate } from "react-router-dom";

function a11yProps(index) {
  return {
    id: `simple-entry-tab-${index}`,
    "aria-controls": `simple-entrytab-panel-${index}`,
  };
}

function DetailedItemRelatedEntryList(props) {
  const { item, tabValue, setTabValue } = props;
  const [value, setValue] = useState(0);
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <CustomPaddingLayout
      sx={{
        padding: {
          xs: "20px 32px",
          sm: "28px 56px",
          md: "0",
          lg: "0",
        },
        width: "100%",
        overflow: "hidden",
      }}
    >
      <Box>
        {/* Header: heading & view all */}
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
                fontSize: { xs: "0.95rem", sm: "1.1rem" },
              },
            }}
          >
            <Typography>Related Entries</Typography>
            <Link onClick={() => setTabValue(1)}>View All</Link>
          </Box>
        )}

        {!item.relatedEntries || item.relatedEntries.length === 0 ? (
          <Typography sx={{ fontSize: { xs: "0.95rem", sm: "1.1rem" } }}>
            No related entries found.
          </Typography>
        ) : (
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            variant="scrollable"
            scrollButtons={false}
            sx={{
              "& .MuiTabs-flexContainer": {
                gap: { xs: "8px" },
                flexWrap: { xs: "nowrap", md: tabValue !== 0 && "wrap" },
                alignItems: "stretch",
                // justifyContent: "space-between",
                "& .MuiButtonBase-root": {
                  padding: 0,
                  width: { xs: "280px", md: tabValue !== 0 ? "49%" : "320px" },
                  height: { xs: "112px", sm: "124px" },
                  border: "1px solid #A9A9A9",
                  borderRadius: "8px",
                  textTransform: "capitalize",
                },
              },
              "& .MuiTabs-indicator": {
                display: "none", // Hides the underline of each selected tab
              },
            }}
          >
            {item.relatedEntries.slice(0, 6).map((relatedEntry, index) => (
              <Tab
                key={index}
                label={<RelatedEntry item={relatedEntry} />}
                {...a11yProps(index)}
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" }); // Scrolls to the top of the page
                  if (relatedEntry.format === "TV") {
                    navigate(`/animes/${relatedEntry._id}`);
                  } else if (relatedEntry.format === "Manga") {
                    navigate(`/mangas/${relatedEntry._id}`);
                  }
                }}
              />
            ))}
          </Tabs>
        )}
      </Box>
    </CustomPaddingLayout>
  );
}

export default DetailedItemRelatedEntryList;
