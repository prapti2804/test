import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./test.css";

function App() {
  const navigate = useNavigate(); // ✅ Correct placement of useNavigate

  const [values, setValues] = useState({
    firstname: "",
    lastname: "",
    rollnumber: "",
    gender: "",
  });

  const handleChanges = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(values);

    try {
      const res = await axios.post("http://localhost:5000/add_user", values); // ✅ Correct backend URL
      console.log(res);
      navigate("/home"); // ✅ Redirect to Home after submission
    } catch (err) {
      console.error("Error submitting form:", err);
    }
  };

  const handleReset = () => {
    setValues({
      firstname: "",
      lastname: "",
      rollnumber: "",
      gender: "",
    });
  };

  return (
    <div className="container">
      <h1>Student Entry Screen</h1>
      <Link to="/home"></Link>
      <form onSubmit={handleSubmit}>
        <label htmlFor="firstname">First Name*</label>
        <input
          type="text"
          placeholder="Enter First Name"
          name="firstname"
          onChange={handleChanges}
          required
          value={values.firstname}
        />

        <label htmlFor="lastname">Last Name*</label>
        <input
          type="text"
          placeholder="Enter Last Name"
          name="lastname"
          onChange={handleChanges}
          required
          value={values.lastname}
        />

        <label htmlFor="rollnumber">Roll Number*</label>
        <input
          type="text"
          placeholder="Enter Roll Number"
          name="rollnumber"
          onChange={handleChanges}
          required
          value={values.rollnumber}
        />

        <label>Gender*</label>
        <label>
          <input
            type="radio"
            name="gender"
            value="Male"
            onChange={handleChanges}
            required
            checked={values.gender === "Male"}
          />
          Male
        </label>
        <label>
          <input
            type="radio"
            name="gender"
            value="Female"
            onChange={handleChanges}
            required
            checked={values.gender === "Female"}
          />
          Female
        </label>

        <div>
          <button type="submit">Submit</button>
          <button type="button" onClick={handleReset}>
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}

export default App;
