import { Box, Tab, Tabs, Typography } from "@mui/material";
import CustomPaddingLayout from "../common/CustomPaddingLayout";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Recommendation from "./Recommendation";

function a11yProps(index) {
  return {
    id: `simple-recommendation-tab-${index}`,
    "aria-controls": `simple-recommendationtab-panel-${index}`,
  };
}

function DetailedItemRecommendationList(props) {
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
        // flex: 1,
        overflow: "hidden",
      }}
    >
      <Box>
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
          <Typography>Recommendations</Typography>
          {tabValue === 0 && (
            <Link onClick={() => setTabValue(6)}>View All</Link>
          )}
        </Box>

        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          variant="scrollable"
          scrollButtons={false}
          sx={{
            "& .MuiTabs-flexContainer": {
              gap: { xs: "8px" },
              flexWrap: {
                xs: "nowrap",
                md: tabValue !== 0 ? "wrap" : "nowrap",
              },
              alignItems: "stretch",
              "& .MuiButtonBase-root": {
                padding: 0,
                width: {
                  xs: "132px",
                  sm: "140px",
                  md: tabValue !== 0 ? "24%" : "140px",
                },
                textTransform: "capitalize",
              },
            },
            "& .MuiTabs-indicator": {
              display: "none", // Hides the underline of each selected tab
            },
          }}
        >
          {item.recommendations && item.recommendations.length > 0 ? (
            item.recommendations
              .slice(0, 6)
              .map((recommendation, index) => (
                <Tab
                  key={index}
                  label={<Recommendation item={recommendation} />}
                  {...a11yProps(index)}
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: "smooth" }); // Scrolls to the top of the page
                    if (recommendation.format === "TV") {
                      navigate(`/animes/${recommendation._id}`);
                    } else if (
                      recommendation.format === "Manga"
                    ) {
                      navigate(`/mangas/${recommendation._id}`);
                    }
                  }}
                />
              ))
          ) : (
            <Typography sx={{ fontSize: { xs: "0.95rem", sm: "1.1rem" } }}>
              No recommendations found.
            </Typography>
          )}
        </Tabs>
      </Box>
    </CustomPaddingLayout>
  );
}

export default DetailedItemRecommendationList;
