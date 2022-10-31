import React, { useEffect, useState } from "react";
import { app, database } from "../../firebaseConfig";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

function Crud() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [users, setUsers] = useState([]);

  const auth = getAuth();
  const collectionRef = collection(database, "users");

  //   handleChange
  const handleChange = (e) => {
    const inputs = { [e.target.name]: e.target.value };

    setData({ ...data, ...inputs });
  };

  //   signUp
  const signUp = (e) => {
    e.preventDefault();

    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((res) => {
        console.log(res.user);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  //   signIn
  const signIn = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((res) => {
        console.log(res.user);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  //   add data
  const addData = (e) => {
    e.preventDefault();

    addDoc(collectionRef, data)
      .then((res) => {
        alert("data added!");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  //   get data
  const getData = (e) => {
    getDocs(collectionRef)
      .then((res) => {
        setUsers(
          res.docs.map((item) => {
            return { ...item.data(), id: item.id };
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //   update data
  const updateData = (id) => {
    const updateToDoc = doc(database, "users", id);

    updateDoc(updateToDoc, {
      name: data.name,
    })
      .then((res) => {
        alert("data updated!");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  //   delete data
  const deleteData = (id) => {
    const deleteToDoc = doc(database, "users", id);
    deleteDoc(deleteToDoc)
      .then(() => {
        alert("data deleted!");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="form-inputs">
      <input
        type="text"
        placeholder="Name"
        name="name"
        onChange={handleChange}
      />
      <br />
      <input
        type="email"
        placeholder="Email"
        name="email"
        onChange={handleChange}
      />
      <br />
      <input
        type="password"
        placeholder="Password"
        name="password"
        onChange={handleChange}
      />
      {/* 
      <button type="submit" onClick={signUp}>
        Sign Up
      </button>

      <button type="submit" onClick={signIn}>
        SignIn
      </button> */}

      <button type="submit" onClick={addData}>
        Add
      </button>
      {/* <button type="submit" onClick={getData}>
        Get
      </button> */}

      <h1>Users info</h1>

      {users?.map((user) => (
        <>
          <div key={user.id}>
            <p>{user.name}</p>
            <p>{user.email}</p>
            <p>{user.password}</p>
          </div>
          <button onClick={() => updateData(user.id)}>Update</button>
          <button onClick={() => deleteData(user.id)}>Delete</button>

          <hr />
        </>
      ))}
    </div>
  );
}

export default Crud;
