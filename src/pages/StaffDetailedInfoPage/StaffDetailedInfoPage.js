import { useLoaderData } from "react-router-dom";
import DetailedCharacterHeader from "../../components/CharacterDetailedInfoPage/DetailedCharacterHeader";
import DetailedCharacterRelatedEntryList from "../../components/CharacterDetailedInfoPage/DetailedCharacterRelatedEntryList";

function StaffDetailedInfoPage() {
  const staff = useLoaderData();

  return (
    <>
      <DetailedCharacterHeader item={staff} />
      <DetailedCharacterRelatedEntryList item={staff} />
    </>
  );
}

export default StaffDetailedInfoPage;

export const staffDetailLoader = async ({ params }) => {
  const { staffId } = params;

  const res = await fetch(`http://localhost:3600/staffList/${staffId}`);

  if (!res.ok) {
    throw Error("Staff can't be found.");
  }

  return res.json();
};
