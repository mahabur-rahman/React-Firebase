import React, { useState } from "react";
import { app } from "../firebaseConfig";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const FormData = () => {
  const auth = getAuth();
  const [inputData, setInputData] = useState({});

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setInputData({ ...inputData, [name]: value });
  };

  // btn click
  const handleClick = (e) => {
    e.preventDefault();

    // register
    createUserWithEmailAndPassword(auth, inputData.email, inputData.password)
      .then((res) => {
        console.log(res.user);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <>
      <div className="form">
        <input
          type="text"
          placeholder="email"
          name="email"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          name="password"
          onChange={handleChange}
        />

        <button type="submit" onClick={handleClick}>
          Submit
        </button>
      </div>
    </>
  );
};

export default FormData;
