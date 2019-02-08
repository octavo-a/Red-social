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
            <span><img src="${snapshot.val()[comment].authorPic ? snapshot.val()[comment].authorPic : './img/userLogo.png'}" class="user-pic-post" alt="userPic"><p>${snapshot.val()[comment].author} - Profesora de Básica</p></span>       
            </div>
            <div class="comment-content">
                <span>${snapshot.val()[comment].content}</span>
            </div> 
            
            `
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
    

    const newPostKey = firebase.database().ref().child("users/"+userId+"/post").push().key;

    const updates = {};
    updates["users/"+userId+"/posts/post" + newPostKey] = {
        "tags": tags,
        "author": firebase.auth().currentUser.displayName ? firebase.auth().currentUser.displayName : firebase.auth().currentUser.email,
        "content": post_text,
        "authorId": firebase.auth().currentUser.uid,
        "authorPic": firebase.auth().currentUser.photoURL ? firebase.auth().currentUser.photoURL : "./img/userLogo.png"
    }
    const updates2 = {};
    updates2["posts/post" + newPostKey] ={
        "tags": tags,
        "author": firebase.auth().currentUser.displayName ? firebase.auth().currentUser.displayName : firebase.auth().currentUser.email,
        "content": post_text,
        "authorId": firebase.auth().currentUser.uid,
        "authorPic": firebase.auth().currentUser.photoURL ? firebase.auth().currentUser.photoURL : "./img/userLogo.png"
    }

    firebase.database().ref().update(updates);
    if (privacy === "public") {
        firebase.database().ref().update(updates2);
    }

   
}

function submitComment(userId, post_text, postKey) {
    

    const newPostKey = firebase.database().ref().child("users/"+userId+"/comments").push().key;

    const updates = {};
    updates["users/"+userId+"/posts/" + postKey + "/comments/" + newPostKey] = {
        "author": firebase.auth().currentUser.displayName ? firebase.auth().currentUser.displayName : firebase.auth().currentUser.email,
        "content": post_text,
        "authorId": firebase.auth().currentUser.uid,
        "authorPic": firebase.auth().currentUser.photoURL ? firebase.auth().currentUser.photoURL : "./img/userLogo.png"
    }
    const updates2 = {};
    updates2["posts/" + postKey + "/comments/" + newPostKey] ={
        "author": firebase.auth().currentUser.displayName ? firebase.auth().currentUser.displayName : firebase.auth().currentUser.email,
        "content": post_text,
        "authorId": firebase.auth().currentUser.uid,
        "authorPic": firebase.auth().currentUser.photoURL ? firebase.auth().currentUser.photoURL : "./img/userLogo.png"
    }

    firebase.database().ref().update(updates);
    if (firebase.database().ref() !== null) {
        firebase.database().ref().update(updates2);
    }

   
}


