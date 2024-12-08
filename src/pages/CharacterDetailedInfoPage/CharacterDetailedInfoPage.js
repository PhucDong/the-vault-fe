import { useLoaderData } from "react-router-dom";
import DetailedCharacterHeader from "../../components/CharacterDetailedInfoPage/DetailedCharacterHeader";
import DetailedCharacterRelatedEntryList from "../../components/CharacterDetailedInfoPage/DetailedCharacterRelatedEntryList";

function CharacterDetailedInfoPage() {
  const character = useLoaderData();

  return (
    <>
      <DetailedCharacterHeader item={character} />
      <DetailedCharacterRelatedEntryList item={character} />
    </>
  );
}

export default CharacterDetailedInfoPage;

export const characterDetailLoader = async ({ params }) => {
  const { characterId } = params;

  const res = await fetch(`http://localhost:3500/characterList/${characterId}`);

  if (!res.ok) {
    throw Error("Character can't be found.");
  }

  return res.json();
};
