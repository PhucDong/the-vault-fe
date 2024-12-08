import { Box, Typography } from "@mui/material";
import CustomPaddingLayout from "../common/CustomPaddingLayout";
import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";

function DetailedItemSummaryStatList(props) {
  const { item, tabValue, setTabValue } = props;
  const [statList, setStatList] = useState(null);

  const getFilteredStatList = useMemo(() => {
    if (item.stats && item.stats.length > 0 && statList) {
      return statList.filter((stat) => item.stats.includes(stat.id));
    }
  }, [item.stats, statList]);

  useEffect(() => {
    fetch("http://localhost:3700/statList")
      .then((response) => response.json())
      .then((data) => setStatList(data));
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
        flex: 1,
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
          <Typography>Summary Stats</Typography>
          {tabValue === 0 && (
            <Link onClick={() => setTabValue(5)}>View All</Link>
          )}
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          {getFilteredStatList && getFilteredStatList.length > 0 ? (
            getFilteredStatList[0].data.map((stat, index) => (
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
                >{`${stat.label}:`}</Typography>
                <Typography
                  sx={{
                    width: { xs: "64%", sm: "72%", md: "76%" },
                    fontSize: { xs: "1rem", md: "1.075rem" },
                  }}
                >
                  {stat.data}
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
