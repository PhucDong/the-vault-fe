import { useParams } from "react-router-dom";
import DetailedAnimeMangaHeader from "../components/AnimeMangaDetailedInfoPage/DetailedAnimeMangaHeader";
import DetailedTabNavigation from "../components/AnimeMangaDetailedInfoPage/DetailedTabNavigation";
import { useEffect, useState } from "react";
import apiService from "../services/apiService";
import { useSelector } from "react-redux";
import { useCollectionDispatch } from "../services/hooks";

function AnimeDetailedInfoPage() {
  const [anime, setAnime] = useState(null);
  const { animeId } = useParams();
  const isCollectionCreated = useSelector(
    (state) => state.collection.isCollectionCreated
  );
  const isCollectionUpdated = useSelector(
    (state) => state.collection.isCollectionUpdated
  );
  const isCollectionDeleted = useSelector(
    (state) => state.collection.isCollectionDeleted
  );
  const { resetCollectionState } = useCollectionDispatch();

  useEffect(() => {
    const fetchedAnime = async () => {
      try {
        const response = await apiService.get(`/animes/${animeId}`);
        setAnime(response.anime);
        resetCollectionState();
      } catch (error) {
        console.log(error);
      }
    };

    if (
      isCollectionCreated ||
      isCollectionUpdated ||
      isCollectionDeleted ||
      animeId
    ) {
      fetchedAnime();
    }
  }, [animeId, isCollectionCreated, isCollectionUpdated, isCollectionDeleted]);

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
