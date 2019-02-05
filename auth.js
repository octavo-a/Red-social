// LOGIN CON GOOGLE
function googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider);
}

// LOGIN CON FACEBOOK

function facebookLogin() {
    const provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithRedirect(provider);
}

// LOGIN CON EMAIL Y PWD
function emailLogin(email, password) {
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(`${errorCode} ${errorMessage}`)
        // ...
      });
}

function logout() {
    firebase.auth().signOut().then(function() {
        // Sign-out successful.
      }).catch(function(error) {
        // An error happened.
        console.log(error)
      });
}

// CREAR CUENTA MAIL Y PWD
function createAccount(mail, pwd) {
    firebase.auth().createUserWithEmailAndPassword(mail, pwd).catch(function(error) {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // ...
        console.log(`${errorCode} ${errorMessage}`)
      });
}