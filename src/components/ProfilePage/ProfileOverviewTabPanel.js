import { Box } from "@mui/material";
import React from "react";
import OverviewDetailsSection from "./OverviewDetailsSection";
import OverviewFriendsSection from "./OverviewFriendsSection";
import OverviewReviewsSection from "./OverviewReviewsSection";

function ProfileOverviewTabPanel(props) {
  const { value, index, currentUser, handleChangeTab } = props;

  return (
    <Box
      hidden={value !== index}
      sx={{
        display: value !== index ? "none" : "flex",
        flexDirection: "column",
        gap: { xs: "28px" },
      }}
    >
      <OverviewDetailsSection user={currentUser} />

      {currentUser?.friendCount > 0 && (
        <OverviewFriendsSection
          user={currentUser}
          handleChangeTab={handleChangeTab}
        />
      )}

      {currentUser?.reviews.length > 0 && (
        <OverviewReviewsSection user={currentUser} />
      )}
    </Box>
  );
}

export default ProfileOverviewTabPanel;
