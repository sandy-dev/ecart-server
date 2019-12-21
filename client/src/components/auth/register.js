import React, { Component } from 'react'
import '_src/stylesheets/main.css'
import { firebase, StyledFirebaseAuth } from '_src/components/auth/firebase'

const _uiConfig = {
    signInFlow: "popup",
    signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.PhoneAuthProvider.PROVIDER_ID
    ],
    callbacks: { signInSuccess: () => false }
}


class Register extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className='container-register'>

                <div>

                    <span>Register</span>

                    <StyledFirebaseAuth
                        uiConfig={_uiConfig}
                        firebaseAuth={firebase.auth()} />


                </div>

            </div>
        )
    }
}

export default Register
