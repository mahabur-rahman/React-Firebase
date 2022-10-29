import React, { useState } from "react";
import { app, storage } from "../firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const GetStorage = () => {
  const [inputData, setInputData] = useState({});

  const handleClick = (e) => {
    e.preventDefault();

    const mountainsRef = ref(storage, inputData.name);
    const uploadTask = uploadBytesResumable(mountainsRef, inputData);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        console.log(error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
        });
      }
    );
  };

  return (
    <>
      <div className="form">
        <input type="file" onChange={(e) => setInputData(e.target.files[0])} />

        <button type="submit" onClick={handleClick}>
          Submit
        </button>
      </div>
    </>
  );
};

export default GetStorage;
