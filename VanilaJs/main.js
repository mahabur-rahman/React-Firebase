const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAI9gzFiZL6TET8sXsrExlUggy7UmgUcio",
  authDomain: "fir-js-7bae1.firebaseapp.com",
  projectId: "fir-js-7bae1",
  storageBucket: "fir-js-7bae1.appspot.com",
  messagingSenderId: "650706646753",
  appId: "1:650706646753:web:35ae398b62d7517dc9a9a0",
});

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();

// register
const register = () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  auth
    .createUserWithEmailAndPassword(email, password)
    .then((res) => {
      console.log(res.user);
    })
    .catch((err) => {
      alert(err.message);
      console.log(err.code);
      console.log(err.message);
    });
};

// login
const login = () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  auth
    .signInWithEmailAndPassword(email, password)
    .then((res) => {
      console.log(res.user);
    })
    .catch((err) => {
      alert(err.message);
      console.log(err.code);
      console.log(err.message);
    });
};

// add data
const addData = () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  db.collection("users")
    .add({
      password,
      email,
    })
    .then((res) => {
      console.log(res.id);
    })
    .catch((err) => {
      console.log(err.message);
    });
};

// read data
const readData = () => {
  db.collection("users")
    .get()
    .then((data) => {
      console.log(
        data.docs.map((item) => {
          return { ...item.data(), id: item.id };
        })
      );
    })
    .catch((err) => {
      console.log(err.message);
    });
};

// update data

const updateData = () => {
  db.collection("users", doc(`GeexGYnU51GfhCE9Tz0F`))
    .update({
      email: "noman@gmail.com",
      password: "123456",
    })
    .then(() => {
      alert("data updated!");
    })
    .catch((err) => {
      console.log(err.message);
    });
};

// delete data
const deleteData = () => {
  db.collection("users", doc(`nKBRZFT014iBbG4MOEFV`).delete())
    .then(() => {
      alert("deleted..");
    })
    .catch((err) => {
      console.log(err);
    });
};
