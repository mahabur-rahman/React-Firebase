import React, { useState } from "react";
import { database, app } from "../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

const FirebaseFireStore = () => {
  const [inputData, setInputData] = useState({});
  const collectionRef = collection(database, "users");

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setInputData({ ...inputData, [name]: value });
  };

  // btn click
  const handleClick = async (e) => {
    e.preventDefault();

    addDoc(collectionRef, {
      email: inputData.email,
      password: inputData.password,
    })
      .then((res) => {
        alert("data added");
      })
      .catch((err) => {
        alert(err.message);
      });

    // try {
    //   addDoc(collectionRef, {
    //     email: inputData.email,
    //     password: inputData.password,
    //   });
    //   alert("data added");
    // } catch (err) {
    //   alert(err.message);
    // }
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

export default FirebaseFireStore;
