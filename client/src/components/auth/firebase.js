import firebase from "firebase"
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"

var firebaseConfig = {
    apiKey: "***",
    authDomain: "***",
}

firebase.initializeApp(firebaseConfig)

export {
    firebase, StyledFirebaseAuth
}
