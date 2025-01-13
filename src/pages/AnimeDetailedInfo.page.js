import { useParams } from "react-router-dom";
import DetailedAnimeMangaHeader from "../components/AnimeMangaDetailedInfoPage/DetailedAnimeMangaHeader";
import DetailedTabNavigation from "../components/AnimeMangaDetailedInfoPage/DetailedTabNavigation";
import { useEffect, useState } from "react";
import apiService from "../services/apiService";

function AnimeDetailedInfoPage() {
  const [anime, setAnime] = useState(null);
  const { animeId } = useParams();

  useEffect(() => {
    try {
      const fetchedAnime = async () => {
        const response = await apiService.get(`/animes/${animeId}`);
        setAnime(response.anime);
      };

      fetchedAnime();
    } catch (error) {
      console.log(error);
    }
  }, [animeId]);

  return (
    <>
      {anime && (
        <>
          <DetailedAnimeMangaHeader item={anime} />
          <DetailedTabNavigation item={anime} />
        </>
      )}
    </>
  );
}

export default AnimeDetailedInfoPage;
