import React, { useState } from "react";
import { app } from "../firebaseConfig";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const FormData = () => {
  const [data, setData] = useState({});

  const handleChange = (e) => {
    let newInput = { [e.target.name]: e.target.value };

    setData({ ...data, ...newInput });
  };

  let auth = getAuth();
  let googleProvider = new GoogleAuthProvider();

  const handleSubmit = (e) => {
    signInWithPopup(auth, googleProvider)
      .then((response) => {
        console.log(response.user);
      })
      .catch((err) => {
        console.log(err.message);
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

        <button type="submit" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </>
  );
};

export default FormData;
