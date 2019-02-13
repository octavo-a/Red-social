function showComments() {
    let areTherePosts;
    let postId = this.id.slice(8)
    document.getElementById("comments-section-"+postId).innerHTML = "";
    firebase.database().ref("/posts/"+postId+"/comments/").once("value", function(snapshot){
        if (snapshot.val() == null) {
            areTherePosts = false
            return;
        }
        for (let comment in snapshot.val()) {
            document.getElementById("comments-section-"+postId).innerHTML += `
            
            <div class="comment-header">
            <span><img src="${snapshot.val()[comment].authorPic ? snapshot.val()[comment].authorPic : './img/userLogo.png'}" class="user-pic-post" alt="userPic"><p>${snapshot.val()[comment].author} ${snapshot.val()[comment].especialidad ? "- "+snapshot.val()[comment].especialidad : ""}</p></span>       
            </div>
            <div class="comment-content">
                <span>${snapshot.val()[comment].content}</span>
            <div>
            <a class="edit-comment" >Editar</a>
            <a id="delete-comment-${snapshot.val()[comment].postId}/comments/${comment}" class="remove-comment">Eliminar</a>
            </div>
            </div> 
            
            `

            let deleteComment = document.getElementsByClassName("remove-comment");
            for (let i = 0; i < deleteComment.length; i++){
                deleteComment[i].addEventListener("click", removeComment)

            }
        }
    })
    if(areTherePosts === false) {
        return;
    }
    if (document.getElementById("comments-section-"+postId).style.display === "none") {
        document.getElementById("comments-section-"+postId).style.display = "block";
        return
    }
    if (document.getElementById("comments-section-"+postId).style.display === "block") {
        document.getElementById("comments-section-"+postId).style.display = "none";
        return
    }
}

function createComment() {
    const postId = this.id.slice(15)
    const userId = firebase.auth().currentUser.uid;
    if (document.getElementById("text-"+postId) === null) {
        document.getElementById("create-comments-section-"+postId).innerHTML = `
        <div class="create-comments-section">
        <textarea id="text-${postId}" class="comment-input" placeholder="Ingrese su comentario.."></textarea>
        <button id="btn${postId}" type="button" class="comment-btn">Publicar</button>
        </div>
        
        `
        document.getElementById(`btn${postId}`).addEventListener("click", ()=> {
            const post_text = document.getElementById(`text-${postId}`).value;
            submitComment(userId, post_text, postId)
        })

    } else {
        document.getElementById("create-comments-section-"+postId).innerHTML = "";
    }
}

function submitpost(tags, privacy, userId, post_text) {
    
    firebase.database().ref("users/"+firebase.auth().currentUser.uid).once("value", function(snapshot){
        const newPostKey = firebase.database().ref().child("users/"+userId+"/post").push().key;
    
        const updates = {};
        updates["users/"+userId+"/posts/post" + newPostKey] = {
            "tags": tags,
            "author": snapshot.val().profile.username,
            "content": post_text,
            "authorId": firebase.auth().currentUser.uid,
            "authorPic": snapshot.val().profile.profilePic,
            "especialidad": snapshot.val().profile.especialidad

        }
        const updates2 = {};
        updates2["posts/post" + newPostKey] ={
            "tags": tags,
            "author": snapshot.val().profile.username,
            "content": post_text,
            "authorId": firebase.auth().currentUser.uid,
            "authorPic": snapshot.val().profile.profilePic,
            "especialidad": snapshot.val().profile.especialidad

        }
    
        firebase.database().ref().update(updates);
        if (privacy === "public") {
            firebase.database().ref().update(updates2);
        }
        window.socialNetwork.printPosts(window.socialNetwork.printPostsDOM)   

    })
}

function submitComment(userId, post_text, postKey) {
    
    firebase.database().ref("users/"+firebase.auth().currentUser.uid).once("value", function(snapshot){
        const newPostKey = firebase.database().ref().child("users/"+userId+"/comments").push().key;
        // console.log(snapshot.val().profile.username)
        const updates = {};
        updates["users/"+userId+"/posts/" + postKey + "/comments/" + newPostKey] = {
            "author": snapshot.val().profile.username,
            "content": post_text,
            "authorId": firebase.auth().currentUser.uid,
            "authorPic": snapshot.val().profile.profilePic,
            "postId": postKey,
            "especialidad": snapshot.val().profile.especialidad
        }
        const updates2 = {};
        updates2["posts/" + postKey + "/comments/" + newPostKey] ={
            "author": snapshot.val().profile.username,
            "content": post_text,
            "authorId": firebase.auth().currentUser.uid,
            "authorPic": snapshot.val().profile.profilePic,
            "postId": postKey,
            "especialidad": snapshot.val().profile.especialidad

        }
    
        firebase.database().ref().update(updates);
        if (firebase.database().ref() !== null) {
            firebase.database().ref().update(updates2);
        }

    })

   

}

//Función para eliminar post

function removePost() {
    let  shortenId= this.id.slice(7)

    let commentsRef = firebase.database().ref("posts/"+shortenId);
    let commentsRef2 = firebase.database().ref("users/"+firebase.auth().currentUser.uid+"/posts/"+shortenId);
    let option = confirm("Confirma si quieres eliminar el post")
    
    if (option == true) {
        commentsRef.remove();
        commentsRef2.remove();
	} else {
        return  null
    
    }
}

//Funcion para eliminar comentarios

function removeComment() {
    let shortenId2=this.id.slice(15)
    // console.log(shortenId2)
    let commentRef3= firebase.database().ref("posts/"+shortenId2);
    let optionConfirmRemove = confirm ("Confirma si quieres eliminar el comentario")
    if (optionConfirmRemove == true){
        commentRef3.remove();
    } else {
        return null
    }
    
}



