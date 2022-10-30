import { useState, useEffect } from "react";
import { app, database } from "../firebaseConfig";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { collection, onSnapshot, addDoc } from "firebase/firestore";

const SecurityRules = () => {
  const auth = getAuth();
  const collectionRef = collection(database, "users");

  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
    age: "",
  });

  const handleInputs = (e) => {
    let inputs = { [e.target.name]: e.target.value };

    setData({ ...data, ...inputs });
  };

  //   login
  const login = () => {
    signInWithEmailAndPassword(auth, data.name, data.email);
  };

  //   logout
  const logout = () => {
    signOut(auth);
  };

  //   add data
  const addData = (e) => {
    e.preventDefault();

    addDoc(collectionRef, {
      name: data.name,
      email: data.email,
      age: data.age,
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
    onSnapshot(collectionRef, (data) => {
      console.log(
        data.docs.map((item) => {
          return item.data();
        })
      );
    });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (data) => {
      if (data) {
        alert("You are logged in");
        console.log(data);
      } else {
        alert("Logout");
      }
    });

    getData();
  }, [auth]);

  return (
    <div>
      <input
        type="email"
        placeholder="email"
        name="email"
        onChange={handleInputs}
      />
      <input
        type="password"
        placeholder="password.."
        name="password"
        onChange={handleInputs}
      />
      <button onClick={login}>Login</button>
      <button onClick={logout}>Logout</button>

      <hr />

      <input
        type="text"
        placeholder="name"
        name="name"
        onChange={handleInputs}
      />
      <input
        type="email"
        placeholder="email.."
        name="email"
        onChange={handleInputs}
      />
      <input
        type="number"
        placeholder="age.."
        name="age"
        onChange={handleInputs}
      />
      <input
        type="password"
        placeholder="password"
        name="password"
        onChange={handleInputs}
      />

      <button type="submit" onClick={addData}>
        Add
      </button>
    </div>
  );
};

export default SecurityRules;
