import { Box, Typography } from "@mui/material";
import CustomPaddingLayout from "../common/CustomPaddingLayout";
import { Link } from "react-router-dom";
import AnimeStaff from "./AnimeStaff";
import { useEffect, useMemo, useState } from "react";

function DetailedItemStaffList(props) {
  const { item, tabValue, setTabValue } = props;
  const [staffList, setStaffList] = useState(null);

  const getFilteredStaffList = useMemo(() => {
    if (staffList && item.staff?.length > 0) {
      return staffList.filter((staff) => item.staff.includes(staff.id));
    }
  }, [staffList, item.staff]);

  useEffect(() => {
    fetch("http://localhost:3600/staffList")
      .then((response) => response.json())
      .then((data) => setStaffList(data));
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
          <Typography>Staff</Typography>
          {tabValue === 0 && (
            <Link onClick={() => setTabValue(2)}>View All</Link>
          )}
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            flexWrap: { xs: "nowrap", md: "wrap" },
            justifyContent: "space-between",
            gap: "8px",
          }}
        >
          {getFilteredStaffList && getFilteredStaffList.length > 0 ? (
            getFilteredStaffList
              .slice(0, 6)
              .map((animeStaff, index) => (
                <AnimeStaff key={index} animeStaff={animeStaff} />
              ))
          ) : (
            <Typography sx={{ fontSize: { xs: "0.95rem", sm: "1.1rem" } }}>
              No staff found.
            </Typography>
          )}
        </Box>
      </Box>
    </CustomPaddingLayout>
  );
}

export default DetailedItemStaffList;
