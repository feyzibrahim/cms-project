import React from "react";
import { useState } from "react";
import { useAuthContext } from "../../Hook/contextHooks/useAuthContext";
import { useTeacherContext } from "../../Hook/contextHooks/useTeacherContext";

const TeacherForm = () => {
  const { user } = useAuthContext();
  const [error, setError] = useState();

  const [teacherName, setTeacherName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [registrationNumber, setRegistrationNumber] = useState();
  const [gender, setGender] = useState();
  const [designation, setDesignation] = useState();
  const [department, setDepartment] = useState();
  const [facultyMobileNumber, setFacultyMobileNumber] = useState();
  const [dob, setDob] = useState();
  const [joiningDate, setJoiningDate] = useState();
  const [subjectsCanTeach, setSubjectsCanTeach] = useState();
  const [salary, setSalary] = useState();

  const { dispatch } = useTeacherContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setError("You must be logged in...");
      return;
    }

    const teacher = {
      teacherName,
      email,
      password,
      registrationNumber,
      gender,
      designation,
      department,
      facultyMobileNumber,
      dob,
      joiningDate,
      subjectsCanTeach,
      salary,
    };
    const response = await fetch("/api/teacher", {
      method: "POST",
      body: JSON.stringify(teacher),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }

    if (response.ok) {
      setTeacherName("");
      setEmail("");
      setPassword("");
      setRegistrationNumber("");
      setGender("");
      setDepartment("");
      setFacultyMobileNumber("");
      setDob("");
      setJoiningDate("");
      setSubjectsCanTeach("");
      setSalary("");

      setError("");
      dispatch({ type: "CREATE_TEACHER", payload: json });

      console.log("New Teacher Added", json);
    }
  };

  return (
    <form className="collegeNewForm">
      <div className="collegeNewFormTitle">
        <h3>Enter Teacher Details</h3>
      </div>
      <label>Teacher Name</label>
      <input
        type="text"
        onChange={(e) => setTeacherName(e.target.value)}
        value={teacherName}
      />
      <label>Email Address</label>
      <input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <label>Password</label>
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <label>Registration ID</label>
      <input
        type="text"
        onChange={(e) => setRegistrationNumber(e.target.value)}
        value={registrationNumber}
      />
      <label>Gender</label>
      <input
        type="text"
        onChange={(e) => setGender(e.target.value)}
        value={gender}
      />
      <label>Designation</label>
      <input
        type="text"
        onChange={(e) => setDesignation(e.target.value)}
        value={designation}
      />
      <label>Department</label>
      <input
        type="text"
        onChange={(e) => setDepartment(e.target.value)}
        value={department}
      />
      <label>Mobile Number</label>
      <input
        type="number"
        onChange={(e) => setFacultyMobileNumber(e.target.value)}
        value={facultyMobileNumber}
      />
      <label>Date of Birth</label>
      <input type="date" onChange={(e) => setDob(e.target.value)} value={dob} />
      <label>Joining Date</label>
      <input
        type="date"
        onChange={(e) => setJoiningDate(e.target.value)}
        value={joiningDate}
      />
      <label>Subjects can Teach</label>
      <input
        type="text"
        onChange={(e) => setSubjectsCanTeach(e.target.value)}
        value={subjectsCanTeach}
      />
      <label>Salary</label>
      <input
        type="number"
        onChange={(e) => setSalary(e.target.value)}
        value={salary}
      />

      <div className="collegeFormButton">
        <button className="fullColeredButton" onClick={handleSubmit}>
          Add Department
        </button>
      </div>

      {error && <div className="workoutError">{error}</div>}
    </form>
  );
};

export default TeacherForm;
