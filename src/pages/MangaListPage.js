import { Box } from "@mui/material";
import AnimeCategory from "../components/VisitorPage/AnimeCategory";
import { useLoaderData, useLocation } from "react-router-dom";

function MangaListPage() {
  const mangaCategoryList = useLoaderData();
  const location = useLocation();

  console.log("Manga list page!");

  return (
    <Box
      sx={{
        padding: location.pathname === "/" ? "0 22px" : 0,
        display: "flex",
        flexDirection: "column",
        gap: "40px",
      }}
    >
      {mangaCategoryList.map((animeCategory, index) => (
        <AnimeCategory key={index} animeCategory={animeCategory} />
      ))}
    </Box>
  );
}

export default MangaListPage;

export const mangaCategoryListLoader = async () => {
  const response = await fetch("http://localhost:5000/mangaCategoryList");

  if (!response.ok) {
    throw new Error("Failed to fetch manga category list");
  }

  return response.json();
};
