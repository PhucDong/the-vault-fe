import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
import apiService from "../../services/apiService";
import ProfileHeader from "../../components/ProfilePage/ProfileHeader";
import ProfileTabNavigation from "../../components/ProfilePage/ProfileTabNavigation";

function ProfilePage() {
  // const currentUserId = useSelector(
  //   (state) => state.authentication.currentUserId
  // );
  // console.log("Current User ID: ", currentUserId);
  // const { userId } = useParams();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await apiService.get(`/users/me`);
        // console.log("Current User Data: ", response.user);
        setCurrentUser(response.user);
      } catch (error) {
        console.log("Error fetching current user: ", error);
      }
    };

    fetchCurrentUser();
  }, []);

  return (
    <>
      <ProfileHeader currentUser={currentUser} />
      <ProfileTabNavigation currentUser={currentUser} />
    </>
  );
}

export default ProfilePage;
