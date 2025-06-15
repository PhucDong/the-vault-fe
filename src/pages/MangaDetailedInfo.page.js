import { useEffect, useState } from "react";
import DetailedAnimeMangaHeader from "../components/AnimeMangaDetailedInfoPage/DetailedAnimeMangaHeader";
import DetailedTabNavigation from "../components/AnimeMangaDetailedInfoPage/DetailedTabNavigation";
import { useParams } from "react-router-dom";
import apiService from "../services/apiService";
import { useSelector } from "react-redux";
import { useCollectionDispatch } from "../services/hooks";

function MangaDetailedInfoPage() {
  const [manga, setManga] = useState(null);
  const { mangaId } = useParams();
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
    const fetchedManga = async () => {
      try {
        const response = await apiService.get(`/mangas/${mangaId}`);
        setManga(response.manga);
        resetCollectionState();
      } catch (error) {
        console.log("Errors: ", error);
      }
    };

    if (
      isCollectionCreated ||
      isCollectionUpdated ||
      isCollectionDeleted ||
      mangaId
    ) {
      fetchedManga();
    }
  }, [mangaId, isCollectionCreated, isCollectionUpdated, isCollectionDeleted]);

  return (
    <>
      {manga && (
        <>
          <DetailedAnimeMangaHeader item={manga} />
          <DetailedTabNavigation item={manga} />
        </>
      )}
    </>
  );
}

export default MangaDetailedInfoPage;
