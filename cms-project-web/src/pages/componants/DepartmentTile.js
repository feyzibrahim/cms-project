import React from "react";
import { useAuthContext } from "../../Hook/contextHooks/useAuthContext";
import { useDepartmentContext } from "../../Hook/contextHooks/useDepartmentContext";

const DepartmentTile = ({ department }) => {
  const { user } = useAuthContext();
  const { dispatch } = useDepartmentContext();

  const handleClick = async () => {
    if (!user) {
      return;
    }

    const response = await fetch("/api/department/" + department._id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await response.json();
    if (response.ok) {
      dispatch({ type: "DELETE_DEPARTMENT", payload: json });
    }
  };

  return (
    <div className="departmentTile">
      <span className="material-symbols-outlined" onClick={handleClick}>
        Delete
      </span>
      <h2>{department.department_name}</h2>
      <p>Years: {department.year_count}</p>
      <p>HOD: {department.hod}</p>
      <p>Teachers: {department.teacher_count}</p>
      <p>Students: {department.students_count}</p>
    </div>
  );
};

export default DepartmentTile;
