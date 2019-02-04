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
  loginPage();

  

  // FUNCION QUE CREA PAGINA INICIAL
  function loginPage() {
    
    document.getElementById("root").innerHTML = `
    <div id="logins">
    <input type="text"  id="login-mail" class="login-input" placeholder="Correo electrónico..">
    <input type="password" id="login-pwd" class="login-input" placeholder="Contraseña..">
    <button id="login-btn" class="login-btn">Iniciar Sesión</button>
    <span id="google-login" class="login"><img src="img/googleLogo.png" class="icon" alt="googleLogo"><p>Iniciar Sesión con Google</p></span>
    <span id="facebook-login" class="login facebook"><img src="img/facebookLogo2.png" class="icon" alt="facebookLogo"><p>Iniciar Sesión con Facebook</p></span>
    </div>
    
    `
    // BOTON LOGIN CON GOOGLE
    document.getElementById("google-login").addEventListener("click", googleLogin)
  
    // BOTON LOGIN CON FACEBOOK
    document.getElementById("facebook-login").addEventListener("click", facebookLogin)
  
    // BOTON PARA LOGIN CON EMAIL Y PASSWORD
    document.getElementById("login-btn").addEventListener("click", ()=> {
      const email = document.getElementById("login-mail").value;
      const password = document.getElementById("login-pwd").value;
      emailLogin(email, password);
    })

  }


  

  // LO QUE SE CREA CUANDO LOGEA EL USUARIO
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
        window.socialNetwork.createNewUserStorage();
        document.getElementById("root").innerHTML = `
        
        <nav class="responsive">
        <div id="div-logo">
            <img id="logo" src="./img/teachersLogo.png" alt="logo">
        </div>
        <div id="search-nav"><input id="search" type="text" placeholder="Buscar.."><a><i class="fas fa-search fa-lg"></i></a></div>
       </nav>
  
       <div id="content">
           
  
       </div>
       <div id="user-profile-side-nav">
           <div id="user-pic"><img src="./img/userLogo.png" class="user-pic" alt="userPic"></div>
           <div id="user-name">Raquel Patricia Canales Concha</div>
           <div class="side-option"><a>Perfil de Usuario</a></div>
           <div class="side-option"><a>Amigos</a></div>
           <div class="side-option"><a id="logout">Cerrar Sesión</a></div>
  
       </div>
       <footer class="responsive">
           <a id="user-profile"><img src="./img/userLogo.png" alt="userlogo" class="icon-large"></a>
       </footer>
        
        `
      
      window.socialNetwork.printPosts();
  // BOTON BARRA DE NAVEGACIÓN LATERAL
  document.getElementById("user-profile").addEventListener("click", ()=> {
    document.getElementById("user-profile-side-nav").style.display = "block";
  })

  // PARA CERRAR NAVEGACIÓN LATERAL
  document.getElementById("content").addEventListener("click", ()=> {
    document.getElementById("user-profile-side-nav").style.display = "none";
  })

  document.getElementById("logout").addEventListener("click", logout)
    } else {
      // No user is signed in.
      loginPage();
    }
  });

  // PARA VERIFICAR QUE LA AUTENTICACION CON REDIRECCIONAMIENTO SALIO OK
  firebase.auth().getRedirectResult().then(function(result) {
    if (result.credential) {
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      var token = result.credential.accessToken;
      // ...
    }
    // The signed-in user info.
    var user = result.user;
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

