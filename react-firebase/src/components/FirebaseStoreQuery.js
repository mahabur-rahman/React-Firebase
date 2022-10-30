import React, { useEffect, useState } from "react";
import { app, database } from "../firebaseConfig";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";

const FirebaseStoreQuery = () => {
  const [input, setInput] = useState({});

  //   handleChange
  const handleChange = (e) => {
    const value = e.target.value;

    setInput({ ...input, [e.target.name]: value });
  };

  const collectionRef = collection(database, "users");
  // const ageQuery = query(collectionRef, where("age", ">", 19));
  const nameQuery = query(collectionRef, where("name", "==", "unknown"));

  //   btn click
  const handleClick = (e) => {
    addDoc(collectionRef, {
      name: input.name,
      email: input.email,
      age: Number(input.age),
    })
      .then(() => {
        alert("data added!");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  //   get data
  const getData = () => {
    onSnapshot(nameQuery, (data) => {
      console.log(
        data.docs.map((item) => {
          return item.data();
        })
      );
    });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="form">
        <input
          type="name"
          placeholder="name"
          name="name"
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="email"
          name="email"
          onChange={handleChange}
        />

        <input
          type="age"
          placeholder="age"
          name="age"
          onChange={handleChange}
        />
        <button type="submit" onClick={handleClick}>
          Submit
        </button>
      </div>
    </>
  );
};

export default FirebaseStoreQuery;
