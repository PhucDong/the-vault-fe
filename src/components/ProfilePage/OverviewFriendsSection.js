import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import { useMemo } from "react";

function OverviewFriendsSection(props) {
  const { user, handleChangeTab } = props;
  const isVerySmallScreenWidthAndAbove = useMediaQuery((theme) =>
    theme.breakpoints.up("xs")
  );
  const isSmallScreenWidthAndAbove = useMediaQuery((theme) =>
    theme.breakpoints.up("sm")
  );
  const isMediumScreenWidthAndAbove = useMediaQuery((theme) =>
    theme.breakpoints.up("md")
  );

  const friendList = useMemo(() => {
    if (isMediumScreenWidthAndAbove) {
      return user?.friendList?.slice(0, 8);
    } else if (isSmallScreenWidthAndAbove) {
      return user?.friendList?.slice(0, 11);
    } else if (isVerySmallScreenWidthAndAbove) {
      return user?.friendList?.slice(0, 7);
    }
  }, [
    isVerySmallScreenWidthAndAbove,
    isSmallScreenWidthAndAbove,
    isMediumScreenWidthAndAbove,
  ]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: { xs: "12px" } }}>
      <Box>
        <Typography
          sx={{
            fontSize: "1rem",
            fontWeight: 600,
            marginBottom: { xs: "6px" },
          }}
        >
          {`Friends (${user?.friendCount})`}
        </Typography>

        <Box
          sx={{
            display: "grid",
            gap: { xs: "8px" },
            gridTemplateColumns: {
              xs: "repeat(4, 1fr)",
              sm: "repeat(5, 1fr)",
              md: "repeat(3, 1fr)",
            },
          }}
        >
          {friendList.map((friend) => (
            <Box key={friend.username} sx={{ height: "100%" }}>
              <Box
                sx={{
                  height: { xs: "106px", sm: "128px" },
                  marginBottom: { xs: "4px" },
                }}
              >
                <img
                  src={friend.profilePic}
                  alt={friend.username}
                  style={{
                    display: "block",
                    width: "100%",
                    height: "100%",
                    borderRadius: "8px",
                  }}
                />
              </Box>

              <Typography
                sx={{
                  lineHeight: 1.25,
                  fontSize: "0.85rem",
                  fontWeight: 550,
                  wordBreak: "break-word",
                }}
              >
                {friend.username}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      <Button
        sx={{
          backgroundColor: "info.main",
          width: "100%",
          textTransform: "capitalize",
          borderRadius: "8px",
          color: "#fff",
          lineHeight: "100%",
          fontWeight: 550,
          fontSize: { xs: "1.1rem" },
          padding: { xs: "8px 0" },
        }}
        onClick={() => handleChangeTab(null, 1)} // 1 is the index for the Friends tab
      >
        See all friends
      </Button>
    </Box>
  );
}

export default OverviewFriendsSection;
