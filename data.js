let firebaseData = {
    userNow: false,
    postsNow: false,
}



window.firebaseData = firebaseData;


window.socialNetwork = {

    createNewUserStorage: ()=> {
        firebase.database().ref("users/"+firebase.auth().currentUser.uid).once("value", function(snapshot) {
            if (snapshot.val() === null) {
                firebase.database().ref("/users/" + firebase.auth().currentUser.uid).set({
                    "profile": {
                        "username": firebase.auth().currentUser.displayName !== null ? firebase.auth().currentUser.displayName : firebase.auth().currentUser.email,
                        "especialidad": false,
                        "profilePic": firebase.auth().currentUser.photoURL,
                        "email": firebase.auth().currentUser.email
                    },
                    "posts": false,
                    "comments": false
                })
            }
            else {
                // console.log(snapshot.val())
                // console.log("usuario ya existia")
            }
            return snapshot
        })
        .then(user=> {
            firebaseData.userNow = user.val()
        })

        return firebaseData.userNow;
        
    },
    
    printPosts: ()=> {
        firebase.database().ref("/posts").on("value", function(snapshot){
            for(let post in snapshot.val()) {
                document.getElementById("content").innerHTML += `
                <div class="post">
                       <div class="post-header">
                           <span><img src="./img/userLogo.png" class="user-pic-post" alt="userPic"><p>${snapshot.val()[post].author} - Profesora de Básica</p></span>
          
                       </div>
                       <div class="post-content">
                        <span>${snapshot.val()[post].content}</span>
                       </div>
                   </div>
                
                `
                
              }
            
        })
    },
    
    // ESTO AL FINAL NO FUNCIONO
    // printContentPage: (callback)=> {
    //     window.socialNetwork.getPosts();
    //     window.socialNetwork.createNewUserStorage();
    //     document.getElementById("root").innerHTML = `
        
    //     <nav class="responsive">
    //     <div id="div-logo">
    //         <img id="logo" src="./img/teachersLogo.png" alt="logo">
    //     </div>
    //     <div id="search-nav"><input id="search" type="text" placeholder="Buscar.."><a><i class="fas fa-search fa-lg"></i></a></div>
    //     </nav>

    //     <div id="content">
            

    //     </div>
    //     <div id="user-profile-side-nav">
    //         <div id="user-pic"><img src="./img/userLogo.png" class="user-pic" alt="userPic"></div>
    //         <div id="user-name">Raquel Patricia Canales Concha</div>
    //         <div class="side-option"><a>Perfil de Usuario</a></div>
    //         <div class="side-option"><a>Amigos</a></div>
    //         <div class="side-option"><a id="logout">Cerrar Sesión</a></div>

    //     </div>
    //     <footer class="responsive">
    //         <a id="user-profile"><img src="./img/userLogo.png" alt="userlogo" class="icon-large"></a>
    //     </footer>
        
    //     `
        
    //     return callback();
    // }
    
    







}



















// {
//     /* Visit https://firebase.google.com/docs/database/security to learn more about security rules. */
//     "rules": {
//       ".read": false,
//       ".write": false,
//         "users": {
//           "$uid": {
//             "profile": {
//                ".validate": "auth.uid == $uid"
//             },
//                "posts": {
//                   "tags": {
//                    ".validate": "auth.uid == $uid"
//                 },
//                 "content": {
//                   ".validate": "auth.uid == $uid"
//                 },
//                 "comments": {
//                   "$commentid": {
//                       ".validate": "auth.uid != null && newData.child('user_id').val() == auth.uid"
                  
//                   }
//                 }
//             }
//           },
//         ".read": "auth.uid != null",
//         ".write": "auth.uid != null",
            
//         }
//     }
//   }





