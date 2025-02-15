import { Box } from "@mui/material";
import UserReview from "./UserReview";
import { useEffect, useState } from "react";
import apiService from "../../services/apiService";
import { useSelector } from "react-redux";

// const reviewList = [
//   {
//     author: { username: "Nguyen Van A" },
//     text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Unde impedit rem, eius sapiente aut explicabo consectetur fugiat, possimus rerum dolor at nisi eaque quaerat distinctio obcaecati labore dignissimos, odit vero!",
//     likes: 50,
//     dislikes: 75,
//     comments: 20,
//   },
//   {
//     author: { username: "Tran Xuan Sanh" },
//     text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Unde impedit rem, eius sapiente aut explicabo consectetur fugiat, possimus rerum dolor at nisi eaque quaerat distinctio obcaecati labore dignissimos, odit vero!",
//     likes: 50,
//     dislikes: 75,
//     comments: 20,
//   },
//   {
//     author: { username: "Nguyen Van Ly" },
//     text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Unde impedit rem, eius sapiente aut explicabo consectetur fugiat, possimus rerum dolor at nisi eaque quaerat distinctio obcaecati labore dignissimos, odit vero!",
//     likes: 50,
//     dislikes: 75,
//     comments: 20,
//   },
// ];

function ReviewList() {
  const [reviewList, setReviewList] = useState(null);
  const loggedInAccessToken = useSelector(
    (state) => state.authentication.accessToken
  );
  const registeredAccessToken = useSelector((state) => state.user.accessToken);

  useEffect(() => {
    const fetchReviewList = async () => {
      try {
        if (loggedInAccessToken || registeredAccessToken) {
          apiService.defaults.headers.common.Authorization = `Bearer ${
            loggedInAccessToken || registeredAccessToken
          }`;
          const response = await apiService.get("/reviews");
          setReviewList(response.reviewList);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchReviewList();
  }, []);

  // console.log("Review list: ", reviewList);
  // const contentWrapperList = document.querySelectorAll(".ProseMirror");
  // console.log("Content wrapper list: ", contentWrapperList);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: { xs: "8px", md: "12px", lg: "16px" },
      }}
    >
      {reviewList?.map((review, index) => (
        <UserReview key={index} review={review} setReviewList={setReviewList} />
      ))}
    </Box>
  );
}

export default ReviewList;
