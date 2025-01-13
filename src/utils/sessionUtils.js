export const isSessionActive = () => {
  const sessionFlag = sessionStorage.getItem("isSessionActive");

  if (!sessionFlag) {
    sessionStorage.setItem("isSessionActive", "true"); // Mark the session as active
    return false; // First time loading the app (after restart or fresh session)
  }

  return true; // Ongoing session (app has been refreshed or reopened)
};
