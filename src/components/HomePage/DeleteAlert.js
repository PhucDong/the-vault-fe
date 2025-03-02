import styled from "@emotion/styled";
import { Box, Modal, Typography } from "@mui/material";
import CustomStyledDeleteAlertButton from "./CustomStyledDeleteAlertButton";
import apiService from "../../services/apiService";
import { useReviewAppDispatch } from "../../services/hooks";

const CustomStyledDeleteAlert = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "84%",
  backgroundColor: "#fff",
  borderRadius: "12px",
  padding: "20px",
  "& .delete-text": {
    "& .MuiTypography-root": {
      textAlign: "center",
      fontSize: "1.2rem",
      lineHeight: 1.25,
      fontWeight: 500,
    },
  },
  [theme.breakpoints.up("sm")]: {
    padding: "24px",
    width: "64%",
    "& .delete-text": {
      "& .MuiTypography-root": {
        fontSize: "1.3rem",
      },
    },
  },
  [theme.breakpoints.up("md")]: {
    padding: "28px",
    width: "44%",
  },
  [theme.breakpoints.up("lg")]: {
    width: "28%",
    "& .delete-text": {
      "& .MuiTypography-root": {
        fontSize: "1.4rem",
      },
    },
  },
}));

function DeleteAlert(props) {
  const {
    reviewId,
    commentId,
    openDeleteAlert,
    handleCloseDeleteAlert,
    setReviewList,
  } = props;
  const { updateComments } = useReviewAppDispatch();

  const handleDeleteUserReview = async () => {
    try {
      await apiService.delete(`/reviews/${reviewId}`);
      handleCloseDeleteAlert();

      const reviewListData = await apiService.get("/reviews");
      setReviewList(reviewListData.reviewList);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteReviewComment = async () => {
    try {
      await apiService.delete(`/comments/${commentId}`);
      handleCloseDeleteAlert();

      const commentListData = await apiService.get(`/comments?reviewId=${reviewId}`);
      updateComments({ reviewId, comments: commentListData.commentList });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal open={openDeleteAlert} onClose={handleCloseDeleteAlert}>
      <CustomStyledDeleteAlert>
        <Box className="delete-text">
          <Typography>{`Are you sure you want to delete this ${
            reviewId ? "review" : "comment"
          }?`}</Typography>
        </Box>

        <Box
          sx={{
            mt: "28px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "4px",
          }}
        >
          <CustomStyledDeleteAlertButton onClick={handleCloseDeleteAlert}>
            Cancel
          </CustomStyledDeleteAlertButton>
          <CustomStyledDeleteAlertButton
            onClick={
              commentId ? handleDeleteReviewComment : handleDeleteUserReview
            }
          >
            Delete
          </CustomStyledDeleteAlertButton>
        </Box>
      </CustomStyledDeleteAlert>
    </Modal>
  );
}

export default DeleteAlert;
