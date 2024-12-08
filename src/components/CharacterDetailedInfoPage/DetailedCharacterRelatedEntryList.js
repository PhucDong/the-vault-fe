import { useEffect, useMemo, useState } from "react";
import CustomPaddingLayout from "../common/CustomPaddingLayout";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import RelatedEntry from "../AnimeMangaDetailedInfoPage/RelatedEntry";

function a11yProps(index) {
  return {
    id: `simple-entry-tab-${index}`,
    "aria-controls": `simple-entrytab-panel-${index}`,
  };
}

function DetailedCharacterRelatedEntryList(props) {
  const { item } = props;
  const [relatedEntryListData, setRelatedEntryListData] = useState([]);
  const [value, setValue] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  const getRelatedEntryList = useMemo(() => {
    if (relatedEntryListData.length > 0 && item.relatedEntries) {
      return relatedEntryListData.filter((entry) =>
        item.relatedEntries.includes(entry.id)
      );
    } else if (relatedEntryListData.length > 0 && item.otherWorks) {
      return relatedEntryListData.filter((entry) =>
        item.otherWorks.includes(entry.id)
      );
    }
    return null;
  }, [item.relatedEntries, relatedEntryListData, item.otherWorks]);

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
        overflow: "hidden",
      }}
    >
      <Box>
        {/* Header: heading */}
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
          }}
        >
          <Typography>
            {location.pathname.startsWith("/characters")
              ? "Related Entries"
              : "Other Works"}
          </Typography>
        </Box>

        {!getRelatedEntryList || getRelatedEntryList.length === 0 ? (
          <Typography sx={{ fontSize: { xs: "0.95rem", sm: "1.1rem" } }}>
            {location.pathname.startsWith("/characters")
              ? "No related entries found."
              : "No other works found."}
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
                flexWrap: { xs: "nowrap", md: "wrap" },
                alignItems: "stretch",
                "& .MuiButtonBase-root": {
                  padding: 0,
                  width: { xs: "280px", md: "320px" },
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
            {getRelatedEntryList.map((relatedEntry, index) => (
              <Tab
                key={index}
                label={<RelatedEntry item={relatedEntry} />}
                {...a11yProps(index)}
                onClick={() => {
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

export default DetailedCharacterRelatedEntryList;
