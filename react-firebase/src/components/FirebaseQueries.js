import React, { useState, useEffect } from "react";
import { app, database } from "../firebaseConfig";
import {
  addDoc,
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";

const FirebaseQueries = () => {
  const [data, setData] = useState({});

  // handleChange
  const handleChange = (e) => {
    let newInput = { [e.target.name]: e.target.value };

    setData({ ...data, ...newInput });
  };

  const collectionRef = collection(database, "users");
  //   const ageQuery = query(collectionRef, where("age", "==", 43));
  const nameQuery = query(collectionRef, where("name", "==", "mahabur2"));

  // after btn click
  const handleSubmit = (e) => {
    addDoc(collectionRef, {
      name: data.name,
      email: data.email,
      age: Number(data.age),
    })
      .then(() => {
        alert("data added");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  // get data
  const getData = () => {
    // getDocs(collectionRef).then((data) => {
    //   console.log(
    //     data.docs.map((item) => {
    //       return item.data();
    //     })
    //   );
    // });

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
          type="text"
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
          type="number"
          placeholder="age"
          name="age"
          onChange={handleChange}
        />

        <button type="submit" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </>
  );
};

export default FirebaseQueries;
