import React, { useEffect, useState } from "react";
import { app, database } from "../firebaseConfig";
import {
  addDoc,
  collection,
  getDoc,
  getDocs,
  onSnapshot,
} from "firebase/firestore";

const RealTimeUpdate = () => {
  const [input, setInput] = useState({});

  //   handleChange
  const handleChange = (e) => {
    const value = e.target.value;

    setInput({ ...input, [e.target.name]: value });
  };

  const collectionRef = collection(database, "users");

  //   btn click
  const handleClick = (e) => {
    e.preventDefault();

    addDoc(collectionRef, {
      name: input.name,
      email: input.email,
    })
      .then(() => {
        alert("data added successful!");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  //   get Data
  const getData = () => {
    // getDocs(collectionRef).then((data) => {
    //   console.log(
    //     data.docs.map((item) => {
    //       return item.data();
    //     })
    //   );
    // });
    onSnapshot(collectionRef, (data) => {
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

        <button type="submit" onClick={handleClick}>
          Submit
        </button>
      </div>
    </>
  );
};

export default RealTimeUpdate;
