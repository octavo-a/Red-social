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
        
    },
    
    printPosts: ()=> {
        firebase.database().ref("/posts").on("value", function(snapshot){
            document.getElementById("content").innerHTML = ""
            let postKeys = Object.keys(snapshot.val());
            postKeys.reverse();
            for(let post of postKeys) {
                
                document.getElementById("content").innerHTML += `
                <div class="post">
                       <div class="post-header">
                           <span><img src="${snapshot.val()[post].authorPic ? snapshot.val()[post].authorPic : './img/userLogo.png'}" class="user-pic-post" alt="userPic"><p>${snapshot.val()[post].author} - Profesora de Básica</p></span>
          
                       </div>
                       <div class="post-content">
                        <span>${snapshot.val()[post].content}</span>
                       </div>
                       <a class="like" id=${post}><i class="material-icons">star_border</i><span>${snapshot.val()[post].likes ? Object.values(snapshot.val()[post].likes).length : "0"}</span></a>
                       <a class="comments" id="comments${post}"><i class="material-icons">comment</i><span>${snapshot.val()[post]["comments"+post] ? Object.values(snapshot.val()[post]["comments"+post]).length : "0"}</span></a>
                       <div class="comments-section" id="comments-section-${post}">
                       
                       </div>
                </div>

                
                `

                document.getElementById("comments-section-"+post).style.display = "none"

                if (snapshot.val()[post].likes !== undefined && Object.keys(snapshot.val()[post].likes).indexOf(firebase.auth().currentUser.uid) !== -1) {
                    document.getElementById(post).innerHTML = `
                    <i class="material-icons">star</i><span>${snapshot.val()[post].likes ? Object.values(snapshot.val()[post].likes).length : "0"}</span>
                    `
                }
                // console.log("creando funciones")
                let likeButtons = document.getElementsByClassName("like");
                for (let i = 0; i < likeButtons.length; i++) {
                    likeButtons[i].addEventListener("click", setLikePost)
                }
                let commentsButtons = document.getElementsByClassName("comments");
                for (let i = 0; i < commentsButtons.length; i++) {
                    commentsButtons[i].addEventListener("click", showComments)
                }

                // document.getElementById(post).addEventListener("click", setLikePost)
                // document.getElementById("comments"+post).addEventListener("click", showComments)
                
              }
            
        })
    },
   
    
    







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






