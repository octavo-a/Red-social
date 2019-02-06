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

    // window.socialNetwork.printPosts(cbDOM); 




}


