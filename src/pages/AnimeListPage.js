import { Box } from "@mui/material";
import AnimeCategory from "../components/VisitorPage/AnimeCategory";
import { useLoaderData } from "react-router-dom";

function AnimeListPage() {
  const animeCategoryList = useLoaderData();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: { xs: "48px", md: "60px" },
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
