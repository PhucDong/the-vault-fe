import { useLocation, useParams } from "react-router-dom";
import DetailedCharacterHeader from "../../components/CharacterDetailedInfoPage/DetailedCharacterHeader";
import DetailedCharacterRelatedEntryList from "../../components/CharacterDetailedInfoPage/DetailedCharacterRelatedEntryList";
import { useEffect, useState } from "react";
import apiService from "../../services/apiService";
import { Box } from "@mui/material";
import { randomCoverImg } from "../../utils/randomCoverImg";
import { defaultCoverImgAlt } from "../../utils/defaultCoverImgAlt";

function CharacterDetailedInfoPage() {
  const [character, setCharacter] = useState(null);
  const { characterId } = useParams();
  const location = useLocation();

  console.log("Location state: ", location.state);

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
        <Box>
          <DetailedCharacterHeader
            item={character}
            coverImg={
              location.state?.coverImg
                ? location.state.coverImg
                : randomCoverImg
            }
            title={
              location.state?.title ? location.state.title : defaultCoverImgAlt
            }
          />
          <DetailedCharacterRelatedEntryList item={character} />
        </Box>
      )}
    </>
  );
}

export default CharacterDetailedInfoPage;
