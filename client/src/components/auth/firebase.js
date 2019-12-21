import firebase from "firebase"
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"

var firebaseConfig = {
    apiKey: "AIzaSyB_PKaFrnLxfAPwU19l7KE4LRLmJgM373Y",
    authDomain: "elite-caster-236203.firebaseapp.com",
}

firebase.initializeApp(firebaseConfig)

export {
    firebase, StyledFirebaseAuth
}