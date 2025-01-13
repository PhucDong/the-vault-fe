import { useParams } from "react-router-dom";
import DetailedCharacterHeader from "../../components/CharacterDetailedInfoPage/DetailedCharacterHeader";
import DetailedCharacterRelatedEntryList from "../../components/CharacterDetailedInfoPage/DetailedCharacterRelatedEntryList";
import { useEffect, useState } from "react";
import apiService from "../../services/apiService";

function CharacterDetailedInfoPage() {
  const [character, setCharacter] = useState(null);
  const { characterId } = useParams();

  useEffect(() => {
    try {
      const fetchedCharacter = async () => {
        const response = await apiService.get(`/characters/${characterId}`);
        setCharacter(response.character);
      };

      fetchedCharacter();
    } catch (error) {
      console.log(error);
    }
  }, [characterId]);

  return (
    <>
      {character && (
        <>
          <DetailedCharacterHeader item={character} />
          <DetailedCharacterRelatedEntryList item={character} />
        </>
      )}
    </>
  );
}

export default CharacterDetailedInfoPage;
