import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/students") // ✅ Fixed API URL
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/delete_student/${id}`)
      .then(() => {
        setData(data.filter((student) => student.id !== id));
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container">
      <h3>Students</h3>
      <div>
        <Link to="/"></Link>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Roll Number</th>
            <th>Gender</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((student) => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.firstname}</td>
              <td>{student.lastname}</td>
              <td>{student.rollnumber}</td>
              <td>{student.gender}</td>
              <td>
                <Link type="button" to={`/read/${student.id}`}>
                  Read
                </Link>
                <button type="button" onClick={() => handleDelete(student.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Home;
