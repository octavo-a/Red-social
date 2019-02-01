let userNow;
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
            userNow = user.val()
        })

        return userNow;
        
    },

    getPosts: ()=> {
        
    }







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





