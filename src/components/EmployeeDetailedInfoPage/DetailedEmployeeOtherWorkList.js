import { useState } from "react";
import CustomPaddingLayout from "../common/CustomPaddingLayout";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import RelatedEntry from "../AnimeMangaDetailedInfoPage/RelatedEntry";

function a11yProps(index) {
  return {
    id: `simple-entry-tab-${index}`,
    "aria-controls": `simple-entrytab-panel-${index}`,
  };
}

function DetailedEmployeeOtherWorkList(props) {
  const { item } = props;
  const [value, setValue] = useState(0);
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
          <Typography>Other Works</Typography>
        </Box>

        {!item.otherWorks || item.otherWorks.length === 0 ? (
          <Typography sx={{ fontSize: { xs: "0.95rem", sm: "1.1rem" } }}>
            No other works found.
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
            {item.otherWorks.map((otherWork, index) => (
              <Tab
                key={index}
                label={<RelatedEntry item={otherWork} />}
                {...a11yProps(index)}
                onClick={() => {
                  if (otherWork.format === "TV") {
                    navigate(`/animes/${otherWork._id}`);
                  } else if (otherWork.format === "Manga") {
                    navigate(`/mangas/${otherWork._id}`);
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

export default DetailedEmployeeOtherWorkList;
