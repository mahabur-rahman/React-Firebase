import React, { useState } from "react";
import { database, app } from "../firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { async } from "@firebase/util";

const FirebaseFireStore = () => {
  const [user, setUser] = useState([]);

  const [inputData, setInputData] = useState({});
  const collectionRef = collection(database, "users");

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setInputData({ ...inputData, [name]: value });
  };

  // btn click || add data
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
  };

  //   get data from fireStore

  const getData = () => {
    getDocs(collectionRef)
      .then((res) => {
        setUser(
          res.docs.map((item) => {
            return { ...item.data(), id: item.id };
          })
        );
      })
      .catch((err) => alert(err.message));
  };

  //   updateData

  const updateData = async () => {
    try {
      const docToUpdate = doc(database, "users", "8NowfsvbrmnJ03Y5oBQs");
      updateDoc(docToUpdate, {
        email: "abc@gmail.com",
        password: 123456,
      });

      alert("data updated successful!");
    } catch (err) {
      console.log(err.message);
    }
  };

  // delete document
  const deleteData = async () => {
    const deleteUser = doc(database, "users", "8NowfsvbrmnJ03Y5oBQs");
    deleteDoc(deleteUser)
      .then(() => {
        alert("data deleted...");
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

        {/* read data  */}
        <ul>
          {user.map((list) => (
            <li key={list.id}>
              <span>Id : {list.id} </span>
              <span> Email : {list.email}</span>
            </li>
          ))}
        </ul>

        <button type="submit" onClick={handleClick}>
          Submit
        </button>

        <button onClick={getData}>Get</button>
        <button onClick={updateData}>Update</button>
        <button onClick={deleteData}>Delete</button>
      </div>
    </>
  );
};

export default FirebaseFireStore;
