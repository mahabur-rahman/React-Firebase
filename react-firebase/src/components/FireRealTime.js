import React, { useState, useEffect } from "react";
import { app, database } from "../firebaseConfig";
import { addDoc, collection, getDocs, onSnapshot } from "firebase/firestore";

const FireRealTime = () => {
  const [data, setData] = useState({});

  // handleChange
  const handleChange = (e) => {
    let newInput = { [e.target.name]: e.target.value };

    setData({ ...data, ...newInput });
  };

  const collectionRef = collection(database, "users");

  // after btn click
  const handleSubmit = (e) => {
    addDoc(collectionRef, {
      name: data.name,
      email: data.email,
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

        <button type="submit" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </>
  );
};

export default FireRealTime;
