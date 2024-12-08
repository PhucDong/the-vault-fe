import { useLoaderData } from "react-router-dom";
import DetailedAnimeMangaHeader from "../components/AnimeMangaDetailedInfoPage/DetailedAnimeMangaHeader";
import DetailedTabNavigation from "../components/AnimeMangaDetailedInfoPage/DetailedTabNavigation";

function MangaDetailedInfoPage() {
  const manga = useLoaderData();

  return (
    <>
      <DetailedAnimeMangaHeader item={manga} />
      <DetailedTabNavigation item={manga} />
    </>
  );
}

export default MangaDetailedInfoPage;

export const mangaDetailLoader = async ({ params }) => {
  const { mangaId } = params;

  const res = await fetch(`http://localhost:3300/mangaList/${mangaId}`);

  if (!res.ok) {
    throw Error("Manga can't be found.");
  }

  return res.json();
};
