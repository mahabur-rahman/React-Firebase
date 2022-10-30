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
