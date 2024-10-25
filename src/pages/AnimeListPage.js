import { Box } from "@mui/material";
import AnimeCategory from "../components/VisitorPage/AnimeCategory";
import { useLoaderData, useLocation } from "react-router-dom";

function AnimeListPage() {
  const animeCategoryList = useLoaderData();
  const location = useLocation();

  return (
    <Box
      sx={{
        padding: location.pathname === "/" ? "0 22px" : 0,
        display: "flex",
        flexDirection: "column",
        gap: "40px",
      }}
    >
      {animeCategoryList.map((animeCategory, index) => (
        <AnimeCategory key={index} animeCategory={animeCategory} />
      ))}
    </Box>
  );
}

export default AnimeListPage;

export const animeCategoryListLoader = async () => {
  const response = await fetch("http://localhost:4000/animeCategoryList");

  if (!response.ok) {
    throw new Error("Failed to fetch anime category list");
  }

  return response.json();
};
