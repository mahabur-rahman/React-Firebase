import React, { useState } from "react";
import { app, database } from "../../firebaseConfig";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

function Crud() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const auth = getAuth();

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
  return (
    <div className="form-inputs">
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

      <button type="submit" onClick={signUp}>
        Sign Up
      </button>

      <button type="submit" onClick={signIn}>
        SignIn
      </button>
    </div>
  );
}

export default Crud;
