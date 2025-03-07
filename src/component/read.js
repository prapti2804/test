import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function Read() {
  const [data, setData] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate(); // To redirect after deletion

  useEffect(() => {
    axios
      .get(`http://localhost:5000/get_student/${id}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  // Function to delete student
  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      axios
        .delete(`http://localhost:5000/delete_student/${id}`)
        .then(() => {
          alert("Student deleted successfully!");
          navigate("/"); 
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="container">
      <h1>User {id}</h1>
      <Link to="/">Back</Link>

      {data && !data.message ? (
        <ul>
          <li>
            <b>ID: </b>
            {data.id}
          </li>
          <li>
            <b>First Name: </b>
            {data.firstname}
          </li>
          <li>
            <b>Last Name: </b>
            {data.lastname}
          </li>
          <li>
            <b>Roll Number: </b>
            {data.rollnumber}
          </li>
          <li>
            <b>Gender: </b>
            {data.gender}
          </li>
        </ul>
      ) : (
        <p>{data?.message || "Loading..."}</p>
      )}

      {data && !data.message && (
        <button
          onClick={handleDelete}
          style={{
            background: "red",
            color: "white",
            padding: "10px",
            border: "none",
            cursor: "pointer",
            marginTop: "10px",
          }}
        >
          Delete Student
        </button>
      )}
    </div>
  );
}

export default Read;
