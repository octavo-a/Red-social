function showComments() {
    let postId = this.id.slice(8)
    document.getElementById("comments-section-"+postId).innerHTML = "";
    firebase.database().ref("/posts/"+postId+"/"+this.id).once("value", function(snapshot){
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
    if (document.getElementById("comments-section-"+postId).style.display === "none") {
        document.getElementById("comments-section-"+postId).style.display = "block";
        return
    }
    if (document.getElementById("comments-section-"+postId).style.display === "block") {
        document.getElementById("comments-section-"+postId).style.display = "none";
        return
    }
}


