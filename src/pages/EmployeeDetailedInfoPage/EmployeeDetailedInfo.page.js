import { useLocation, useParams } from "react-router-dom";
import DetailedCharacterHeader from "../../components/CharacterDetailedInfoPage/DetailedCharacterHeader";
import { useEffect, useState } from "react";
import DetailedEmployeeOtherWorkList from "../../components/EmployeeDetailedInfoPage/DetailedEmployeeOtherWorkList";
import apiService from "../../services/apiService";
import { randomCoverImg } from "../../utils/randomCoverImg";
import { defaultCoverImgAlt } from "../../utils/defaultCoverImgAlt";

function EmployeeDetailedInfoPage() {
  const { employeeId } = useParams();
  const [employee, setEmployee] = useState(null);
  const location = useLocation();

  useEffect(() => {
    try {
      const fetchedEmployee = async () => {
        const response = await apiService.get(`/employees/${employeeId}`);
        setEmployee(response.employee);
      };

      fetchedEmployee();
    } catch (error) {
      console.log(error);
    }
  }, [employeeId]);

  return (
    <>
      {employee && (
        <>
          <DetailedCharacterHeader
            item={employee}
            coverImg={
              location.state?.coverImg
                ? location.state.coverImg
                : randomCoverImg
            }
            title={
              location.state?.title ? location.state.title : defaultCoverImgAlt
            }
          />
          <DetailedEmployeeOtherWorkList item={employee} />
        </>
      )}
    </>
  );
}

export default EmployeeDetailedInfoPage;
