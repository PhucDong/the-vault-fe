import { useParams } from "react-router-dom";
import DetailedCharacterHeader from "../../components/CharacterDetailedInfoPage/DetailedCharacterHeader";
import { useEffect, useState } from "react";
import DetailedEmployeeOtherWorkList from "../../components/EmployeeDetailedInfoPage/DetailedEmployeeOtherWorkList";
import apiService from "../../services/apiService";

function EmployeeDetailedInfoPage() {
  const { employeeId } = useParams();
  const [employee, setEmployee] = useState(null);

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
          <DetailedCharacterHeader item={employee} />
          <DetailedEmployeeOtherWorkList item={employee} />
        </>
      )}
    </>
  );
}

export default EmployeeDetailedInfoPage;
