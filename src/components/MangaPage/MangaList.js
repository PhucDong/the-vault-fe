import { Box } from "@mui/material";
import { useParams } from "react-router-dom";
import { useCallback } from "react";
import MangaCategory from "./MangaCategory";

const mangaCategoryList = [
  {
    category: "Trending Now",
    path: "trending",
    mangaList: [
      {
        title: "Jujutsu Kaisen",
        description: "bla bla bla bla",
        chapters: 24,
        publishingDate: "10 Oct 2020",
      },
      {
        title: "Naruto",
        description: "bla bla bla bla",
        chapters: 24,
        publishingDate: "5 Jun 2010",
      },
      {
        title: "One Punch Man",
        description: "bla bla bla bla",
        chapters: 24,
        publishingDate: "15 Jul 2018",
      },
      {
        title: "Love in the air",
        description: "bla bla bla bla",
        chapters: 24,
        publishingDate: "10 Oct 2020",
      },
      {
        title: "Prison School",
        description: "bla bla bla bla",
        chapters: 24,
        publishingDate: "10 Oct 2002",
      },
      {
        title: "Highschool of the dead",
        description: "bla bla bla bla",
        chapters: 24,
        publishingDate: "1 May 2016",
      },
    ],
  },
  {
    category: "All Time Popular",
    path: "popular",
    mangaList: [
      {
        title: "Jujutsu Kaisen",
        description: "bla bla bla bla",
        chapters: 24,
        publishingDate: "10 Oct 2020",
      },
      {
        title: "Naruto",
        description: "bla bla bla bla",
        chapters: 24,
        publishingDate: "5 Jun 2010",
      },
      {
        title: "One Punch Man",
        description: "bla bla bla bla",
        chapters: 24,
        publishingDate: "15 Jul 2018",
      },
      {
        title: "Love in the air",
        description: "bla bla bla bla",
        chapters: 24,
        publishingDate: "10 Oct 2020",
      },
      {
        title: "Prison School",
        description: "bla bla bla bla",
        chapters: 24,
        publishingDate: "10 Oct 2002",
      },
      {
        title: "Highschool of the dead",
        description: "bla bla bla bla",
        chapters: 24,
        publishingDate: "1 May 2016",
      },
    ],
  },
  {
    category: "Top 100 Mangas",
    path: "top-100-mangas",
    mangaList: [
      {
        title: "Jujutsu Kaisen",
        description: "bla bla bla bla",
        chapters: 24,
        publishingDate: "10 Oct 2020",
      },
      {
        title: "Naruto",
        description: "bla bla bla bla",
        chapters: 24,
        publishingDate: "5 Jun 2010",
      },
      {
        title: "One Punch Man",
        description: "bla bla bla bla",
        chapters: 24,
        publishingDate: "15 Jul 2018",
      },
      {
        title: "Love in the air",
        description: "bla bla bla bla",
        chapters: 24,
        publishingDate: "10 Oct 2020",
      },
      {
        title: "Prison School",
        description: "bla bla bla bla",
        chapters: 24,
        publishingDate: "10 Oct 2002",
      },
      {
        title: "Highschool of the dead",
        description: "bla bla bla bla",
        chapters: 24,
        publishingDate: "1 May 2016",
      },
    ],
  },
];

function MangaList() {
  const { categoryName } = useParams();

  const getMangaCategoryList = useCallback(() => {
    if (categoryName) {
      const filteredMangaCategory = mangaCategoryList.filter(
        (category) => category.path === categoryName
      );

      return filteredMangaCategory;
    } else {
      return mangaCategoryList;
    }
  }, [categoryName]);

  return (
    <Box
      sx={{
        padding: "0 22px",
        display: "flex",
        flexDirection: "column",
        gap: "40px",
      }}
    >
      {getMangaCategoryList().map((mangaCategory, index) => (
        <MangaCategory key={index} mangaCategory={mangaCategory} />
      ))}
    </Box>
  );
}

export default MangaList;
