import { Box, Typography } from "@mui/material";
import CustomPaddingLayout from "../common/CustomPaddingLayout";
import { Link } from "react-router-dom";
import { useMemo } from "react";

function DetailedItemSummaryStatList(props) {
  const { item, tabValue, setTabValue } = props;

  const getNewStatsObj = useMemo(() => {
    const newStatObj = {};
    if (item.format === "TV") {
      newStatObj["Watching"] = item.stats?.watching;
      newStatObj["Completed"] = item.stats?.completed;
      newStatObj["On-hold"] = item.stats?.onHold;
      newStatObj["Dropped"] = item.stats?.dropped;
      newStatObj["Plan to watch"] = item.stats?.planToWatch;
      newStatObj["Total"] = item.stats?.total;
    } else if (item.format === "Manga") {
      newStatObj["Reading"] = item.stats?.reading;
      newStatObj["Completed"] = item.stats?.completed;
      newStatObj["On-hold"] = item.stats?.onHold;
      newStatObj["Dropped"] = item.stats?.dropped;
      newStatObj["Plan to read"] = item.stats?.planToRead;
      newStatObj["Total"] = item.stats?.total;
    }

    return newStatObj;
  }, [item.format]);

  return (
    <CustomPaddingLayout
      sx={{
        padding: {
          xs: "20px 32px",
          sm: "28px 56px",
          md: "0",
          lg: "0",
        },
        flex: 1,
      }}
    >
      <Box>
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
                fontSize: { xs: "1rem", sm: "1.125rem" },
              },
            }}
          >
            <Typography>Summary Stats</Typography>
            <Link onClick={() => setTabValue(6)}>View All</Link>
          </Box>
        )}

        <Box sx={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          {item.stats && Object.entries(getNewStatsObj).length > 0 ? (
            Object.entries(getNewStatsObj).map((stat, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 600,
                    textAlign: "left",
                    width: { xs: "36%", sm: "28%", md: "24%" },
                    fontSize: { xs: "1rem", md: "1.075rem" },
                  }}
                >{`${stat[0]}:`}</Typography>
                <Typography
                  sx={{
                    width: { xs: "64%", sm: "72%", md: "76%" },
                    fontSize: { xs: "1rem", md: "1.075rem" },
                  }}
                >
                  {stat[1]}
                </Typography>
              </Box>
            ))
          ) : (
            <Typography sx={{ fontSize: { xs: "0.95rem", sm: "1.1rem" } }}>
              No stats found.
            </Typography>
          )}
        </Box>
      </Box>
    </CustomPaddingLayout>
  );
}

export default DetailedItemSummaryStatList;
