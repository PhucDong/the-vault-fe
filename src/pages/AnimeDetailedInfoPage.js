import { useLoaderData } from "react-router-dom";
import DetailedAnimeMangaHeader from "../components/AnimeMangaDetailedInfoPage/DetailedAnimeMangaHeader";
import DetailedTabNavigation from "../components/AnimeMangaDetailedInfoPage/DetailedTabNavigation";

function AnimeDetailedInfoPage() {
  const anime = useLoaderData();

  return (
    <>
      <DetailedAnimeMangaHeader item={anime} />
      <DetailedTabNavigation item={anime} />
    </>
  );
}

export default AnimeDetailedInfoPage;

export const animeDetailLoader = async ({ params }) => {
  const { animeId } = params;

  const res = await fetch(`http://localhost:3200/animeList/${animeId}`);

  if (!res.ok) {
    throw Error("Anime can't be found.");
  }

  return res.json();
};
