function setLikePost() {
    let uid = firebase.auth().currentUser.uid;
    let name = firebase.auth().currentUser.displayName ? firebase.auth().currentUser.displayName: firebase.auth().currentUser.email;
    let id = this.id
    firebase.database().ref("/posts").once("value", function(snapshot){
        if (snapshot.val()[id].likes !== undefined) {
            if (Object.keys(snapshot.val()[id].likes).indexOf(firebase.auth().currentUser.uid) !== -1) {
            firebase.database().ref("/posts/" + id + "/likes").update({
                [uid]:  null
            })
            } else {
                firebase.database().ref("/posts/" + id + "/likes").update({
                    [uid]:  name
                }) 
            }
    
        } else {
            firebase.database().ref("/posts/" + id + "/likes").update({
                [uid]:  name
            })
        }
    


})
}

