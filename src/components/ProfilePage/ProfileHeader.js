import { Box, Button, Typography } from "@mui/material";
import CustomPaddingLayout from "../common/CustomPaddingLayout";
import EditIcon from "@mui/icons-material/Edit";

function ProfileHeader(props) {
  const { currentUser } = props;

  return (
    <Box sx={{ position: "relative" }}>
      {/* Cover image of anime */}
      <Box
        sx={{
          width: "100%",
          aspectRatio: {
            xs: "16 / 7",
            sm: "14 / 6",
            md: "14 / 5",
            xl: "16 / 5",
          },
        }}
      >
        <img
          src={currentUser?.coverPhoto}
          alt={currentUser?.username}
          style={{
            display: "block",
            width: "100%",
            height: "100%",
          }}
        />
      </Box>

      <CustomPaddingLayout
        sx={{ width: "100%", position: "absolute", top: "116px", left: "0" }}
      >
        {/* <Box> */}
        <Box sx={{ width: "124px", height: "124px", mb: "8px" }}>
          <img
            src={currentUser?.profilePic}
            alt={currentUser?.username}
            style={{ borderRadius: "50%", width: "124px", height: "124px" }}
          />
        </Box>
        {/* </Box> */}

        <Box sx={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <Typography sx={{ fontWeight: 600, fontSize: "1.4rem" }}>
              {currentUser?.username}
            </Typography>

            {currentUser?.friendCount > 1 ? (
              <Typography>{`${currentUser?.friendCount} friends`}</Typography>
            ) : (
              <Typography>{`${currentUser?.friendCount} friend`}</Typography>
            )}
          </Box>

          {currentUser?.selfIntro.length > 0 && (
            <Typography>{currentUser?.selfIntro}</Typography>
          )}

          <Button
            sx={{
              display: "flex",
              gap: "8px",
              backgroundColor: "info.main",
              borderRadius: "12px",
              padding: "8px 12px",
            }}
          >
            <EditIcon sx={{ color: "#fff" }} />
            <Typography
              sx={{
                textTransform: "capitalize",
                color: "#fff",
                fontWeight: 550,
                fontSize: "1.1rem",
              }}
            >
              Edit Profile
            </Typography>
          </Button>
        </Box>
      </CustomPaddingLayout>
    </Box>
  );
}

export default ProfileHeader;
