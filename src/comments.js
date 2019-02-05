function showComments() {
    let areTherePosts;
    let postId = this.id.slice(8)
    document.getElementById("comments-section-"+postId).innerHTML = "";
    firebase.database().ref("/posts/"+postId+"/"+this.id).once("value", function(snapshot){
        if (snapshot.val() == null) {
            areTherePosts = false
            return;
        }
        for (let comment in snapshot.val()) {
            document.getElementById("comments-section-"+postId).innerHTML += `
            
            <div class="comment-header">
            <span><img src="./img/userLogo.png" class="user-pic-post" alt="userPic"><p>${snapshot.val()[comment].author} - Profesora de Básica</p></span>       
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

function submitpost() {
    const tags = document.getElementById("post-tags").value;
    const privacy = document.getElementById("privacy-setting").value;
    const userId = firebase.auth().currentUser.uid;
    const post_text = document.getElementById("post-text").value;

    if (post_text === "" || tags === "" || privacy === "") {
        alert("Por favor, ingrese todos los campos requeridos: ingrese al menos una etiqueta y especifique la privacidad de su mensaje")
        return
    }

    const newPostKey = firebase.database().ref().child("users/"+userId+"/post").push().key;

    const updates = {};
    updates["users/"+userId+"/post" + newPostKey] = {
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

    window.socialNetwork.printPosts(); 




}


