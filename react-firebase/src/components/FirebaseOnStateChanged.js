import { useState, useEffect } from "react";
import { app, database } from "../firebaseConfig";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { collection, onSnapshot, addDoc } from "firebase/firestore";

const FirebaseOnStateChanged = () => {
  const auth = getAuth();
  const collectionRef = collection(database, "users");

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleInputs = (e) => {
    let inputs = { [e.target.name]: e.target.value };
    setData({ ...data, ...inputs });
  };

  //   login
  const login = () => {
    signInWithEmailAndPassword(auth, data.email, data.password);
  };

  //   logout
  const logout = () => {
    signOut(auth);
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
    </div>
  );
};

export default FirebaseOnStateChanged;
