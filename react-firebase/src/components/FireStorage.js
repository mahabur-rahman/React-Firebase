import React, { useState } from "react";
import { app, storage } from "../firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const FireStorage = () => {
  const [data, setData] = useState(null);

  const handleClick = () => {
    const storageRef = ref(storage, `images/${data.name}`);

    const uploadTask = uploadBytesResumable(storageRef, data);

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
        <input
          type="file"
          name="file"
          onChange={(e) => setData(e.target.files[0])}
        />

        <button type="submit" onClick={handleClick}>
          Submit
        </button>
      </div>
    </>
  );
};

export default FireStorage;
