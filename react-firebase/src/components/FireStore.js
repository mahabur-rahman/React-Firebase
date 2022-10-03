import React, { useState } from "react";
import { app, database } from "../firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

const FireStore = () => {
  const [data, setData] = useState({});

  const collectionRef = collection(database, "users");

  const handleChange = (e) => {
    let newInput = { [e.target.name]: e.target.value };

    setData({ ...data, ...newInput });
  };

  //   post data
  const handleSubmit = (e) => {
    addDoc(collectionRef, {
      email: data.email,
      password: data.password,
    })
      .then((res) => {
        alert("data added");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  //   get data
  const getData = () => {
    getDocs(collectionRef)
      .then((res) => {
        console.log(
          res.docs.map((item) => {
            console.log("id : ", item.id);
            return { ...item.data(), id: item.id };
          })
        );
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const updateData = () => {
    const docToUpdate = doc(database, "users", "Yn3bJkjMGpGNoDsqZULx");

    updateDoc(docToUpdate, {
      email: "abc@gmail.com",
      password: "123",
    })
      .then(() => {
        alert("data updated!");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const deleteData = () => {
    const docToUpdate = doc(database, "users", "AeWvhUrXfs8hxScLbY8Q");

    deleteDoc(docToUpdate)
      .then(() => {
        alert("data deleted!");
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

        {/* <button type="submit" onClick={handleSubmit}>
          Submit
        </button> */}
        <button type="submit" onClick={deleteData}>
          get data
        </button>
      </div>
    </>
  );
};

export default FireStore;
