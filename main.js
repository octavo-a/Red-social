document.addEventListener("DOMContentLoaded", event => {
// Initialize Firebase
const config = {
    apiKey: "AIzaSyAzb47AU23OXlHs6sjt-uGq9ZcbwuaBVTg",
    authDomain: "red-social-profesores.firebaseapp.com",
    databaseURL: "https://red-social-profesores.firebaseio.com",
    projectId: "red-social-profesores",
    storageBucket: "",
    messagingSenderId: "847131414857"
  };
  firebase.initializeApp(config);


  // LOGIN CON GOOGLE
  document.getElementById("google-login").addEventListener("click", ()=> {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider);
  })

  // LOGIN CON FACEBOOK
  document.getElementById("facebook-login").addEventListener("click", ()=> {
    const provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithRedirect(provider);
  })

  // PARA LOGIN CON EMAIL Y PASSWORD
  document.getElementById("login-btn").addEventListener("click", ()=> {
    const email = document.getElementById("login-mail").value;
    const password = document.getElementById("login-pwd").value;
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(`${errorCode} ${errorMessage}`)
      // ...
    });
  })
  
  // PARA VER QUE SE LOGEO CORRECTAMENTE
  firebase.auth().getRedirectResult().then(function(result) {
    if (result.credential) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // ...
    }
    // The signed-in user info.
    var user = result.user;
    console.log(user)
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(`${errorCode} ${errorMessage}`)
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });


























})