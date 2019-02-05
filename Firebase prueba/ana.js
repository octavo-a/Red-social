 
//  document.addEventListener("DOMContentLoaded", event => {
window.onload = initialization;


  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAhWvV9aEX4jdOpECtQhpfA_cS4maTrHfI",
    authDomain: "teacher-squad.firebaseapp.com",
    databaseURL: "https://teacher-squad.firebaseio.com",
    projectId: "teacher-squad",
    storageBucket: "teacher-squad.appspot.com",
    messagingSenderId: "661428915725"
  };

  firebase.initializeApp(config);

//aquí se guardan los post en firebase

  let post_text;
  

  function initialization (){
    
    document.getElementById("btn").addEventListener("click", submitpost, false)   
    
    

  }

  function submitpost() {
    post_text = document.getElementById("post").value;

    if (post_text === ""){

      return 
    }
  

  var newPostKey = firebase.database().ref().child('users/perfil/post').push().key;

  var updates = {};
  updates['users/perfil/post' + newPostKey] = post_text;


  return firebase.database().ref().update(updates);




  }

//se limpia el textarea al hacer click
 
// function clearContents(post_text) {
//   post_text.value = '';
// }



//mensaje retorna en la pagina

(function() {

const preObject = document.getElementById('users');
const mensaje_retornado = document.getElementById('post_fact')

//crear referencias
const dbRefObject = firebase.database().ref().child('users');
const dbRefmensaje = dbRefObject.child('perfil');

//sincronizar cambios de objetos
dbRefObject.on('value', snap =>{
preObject.innerText = JSON.stringify(snap.val(), null, 3);
});

//sincronizar lista de cambios
 dbRefmensaje.on('child_added', snap => {
   const textArea = document.createElement ('p');
    textArea.innerText = snap.val();
    textArea.id = snap.key;
    mensaje_retornado.appendChild(textArea);
 });

 dbRefmensaje.on('child_changed', snap =>{
   const textareaChanged = document.getElementById(snap.key);
   textareaChanged.innerText = snap.val();
 });

 dbRefmensaje.on('child_removed', snap => {
 const textAreaRemove = document.getElementById(snap.key);
 textAreaRemove.remove();
 })


}());

// function funcionPrincipal(callback){
//   alert('hago algo y llamo al callback avisando que terminé');
//   callback('Miguel');
// }

// funcionPrincipal(function(nombre){
//  alert('me llamo ' + nombre);
// });




