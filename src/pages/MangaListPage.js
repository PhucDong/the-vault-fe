import { Box } from "@mui/material";
import AnimeCategory from "../components/VisitorPage/AnimeCategory";
import { useLoaderData } from "react-router-dom";

function MangaListPage() {
  const mangaCategoryList = useLoaderData();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: { xs: "48px", md: "60px" },
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
