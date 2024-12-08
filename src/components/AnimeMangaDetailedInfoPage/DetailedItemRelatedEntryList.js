import React, { useEffect, useMemo, useState } from "react";
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

  const [relatedEntryListData, setRelatedEntryListData] = useState([]);
  const [value, setValue] = useState(0);
  const navigate = useNavigate();

  const getRelatedEntryList = useMemo(() => {
    if (relatedEntryListData.length > 0 && item.relatedEntries) {
      return relatedEntryListData.filter((entry) =>
        item.relatedEntries.includes(entry.id)
      );
    }
    return null;
  }, [item.relatedEntries, relatedEntryListData]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    fetch(`http://localhost:3400/relatedEntryList`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setRelatedEntryListData(data))
      .catch((error) =>
        console.error("Error fetching related entry list: ", error)
      );
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
        width: "100%",
        overflow: "hidden",
      }}
    >
      <Box>
        {/* Header: heading & view all */}
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
          {tabValue === 0 && (
            <Link onClick={() => setTabValue(4)}>View All</Link>
          )}
        </Box>

        {!getRelatedEntryList || getRelatedEntryList.length === 0 ? (
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
                justifyContent: "space-between",
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
            {getRelatedEntryList.slice(0, 6).map((relatedEntry, index) => (
              <Tab
                key={index}
                label={<RelatedEntry item={relatedEntry} />}
                {...a11yProps(index)}
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" }); // Scrolls to the top of the page
                  if (relatedEntry.format === "TV") {
                    navigate(`/animes/${relatedEntry.id}`);
                  } else if (
                    relatedEntry.format === "Light Novel" ||
                    relatedEntry.format === "Manga"
                  ) {
                    navigate(`/mangas/${relatedEntry.id}`);
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
