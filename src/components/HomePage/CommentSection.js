import { Box } from "@mui/material";
import UserReviewComment from "./UserReviewComment";

function CommentSection(props) {
  const { comments, openReviewModal } = props;

  return (
    <>
      {comments?.length > 0 && openReviewModal && (
        <Box sx={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {comments?.map((comment, index) => (
            <UserReviewComment key={index} comment={comment} />
          ))}
        </Box>
      )}

      {/* {!openReviewModal && (
        <Box
          sx={{
            display: "flex",
            alignItems: "stretch",
            gap: "6px",
            position: openReviewModal ? "fixed" : "static",
            bottom: 0,
            left: 0,
            width: "100%",
            backgroundColor: "orange",
          }}
        >
          <Box
            sx={{
              width: { xs: "36px", md: "40px" },
              height: { xs: "36px", md: "40px" },
              backgroundColor: "#ababab",
              borderRadius: "50%",
            }}
          ></Box>

          <TextField
            multiline
            value={comment}
            onChange={handleChangeComment}
            placeholder={`Comment as ${loggedInUsername || registeredUsername}`}
            sx={{
              flex: 1,
              "& .MuiOutlinedInput-root": {
                height: "100%",
                padding: "8px 12px",
                borderRadius: "8px",

                "& .MuiOutlinedInput-input": {
                  padding: 0,
                  color: "primary.main",
                  fontSize: { xs: "0.9rem", md: "1rem" },
                  lineHeight: 1.25,
                },
              },
            }}
          />

          <Button
            disabled={!comment ? true : false}
            sx={{
              minWidth: 0,
              padding: 0,
              cursor: comment && "pointer",
              "&:hover": {
                backgroundColor: "transparent",
              },
            }}
            onClick={handlePostComment}
          >
            <SendIcon
              sx={{
                alignSelf: "flex-end",
                color: comment ? "info.main" : "primary.light",
                fontSize: { xs: "1.6rem", md: "1.8rem" },
              }}
            />
          </Button>
        </Box>
      )} */}
    </>
  );
}

export default CommentSection;
