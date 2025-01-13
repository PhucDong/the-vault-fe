import { useEffect, useState } from "react";
import DetailedAnimeMangaHeader from "../components/AnimeMangaDetailedInfoPage/DetailedAnimeMangaHeader";
import DetailedTabNavigation from "../components/AnimeMangaDetailedInfoPage/DetailedTabNavigation";
import { useParams } from "react-router-dom";
import apiService from "../services/apiService";

function MangaDetailedInfoPage() {
  const [manga, setManga] = useState(null);
  const { mangaId } = useParams();

  useEffect(() => {
    try {
      const fetchedManga = async () => {
        const response = await apiService.get(`/mangas/${mangaId}`);
        setManga(response.manga);
      };

      fetchedManga();
    } catch (error) {
      console.log("Errors: ", error);
    }
  }, [mangaId]);

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
