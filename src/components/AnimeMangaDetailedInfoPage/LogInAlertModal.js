import { Box, Button, Modal, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function LogInAlertModal(props) {
  const { openLogInAlert, setOpenLogInAlert } = props;
  const navigate = useNavigate();
  const handleCloseLogInAlertModal = () => setOpenLogInAlert(false);

  return (
    <Modal
      open={openLogInAlert}
      onClose={handleCloseLogInAlertModal}
      aria-labelledby="login-alert-modal-title"
      aria-describedby="login-alert-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "316px", sm: "352px", md: "364px" },
          bgcolor: "background.paper",
          borderRadius: "8px",
          boxShadow: 24,
          padding: { xs: "20px", md: "28px" },
          "& .MuiTypography-root": {
            lineHeight: 1.35,
            textAlign: "center",
            marginBottom: "20px",
            fontSize: { xs: "1.1rem", sm: "1.2rem" },
            fontWeight: 550,
          },
          "& .MuiButtonBase-root": {
            lineHeight: "100%",
            padding: { xs: "8px 12px", sm: "8px 16px", md: "8px 20px" },
            textTransform: "capitalize",
            fontSize: { xs: "1.1rem", sm: "1.2rem" },
            width: { xs: "92px", md: "100px" },
          },
          "& .login-btn": {
            backgroundColor: "info.main",
            color: "#fff",
          },
          "& .cancel-btn": {
            border: "1px solid #ababab",
          },
        }}
      >
        <Typography id="login-alert-modal-title">
          User is not authorized. Please log in to continue.
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "stretch",
            gap: "8px",
          }}
        >
          <Button className="login-btn" onClick={() => navigate("/login")}>
            Log In
          </Button>
          <Button className="cancel-btn" onClick={handleCloseLogInAlertModal}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default LogInAlertModal;
