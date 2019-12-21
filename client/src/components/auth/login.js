import React, { Component } from 'react'
import MenuIcon from '@material-ui/icons/Menu'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
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

const passLength = 6


export class login extends Component {

    constructor(props) {
        super(props)

        this.state = {
            name: '',
            email: '',
            password: '',

            isCreateSuccess: false,
            isError: false,
            txtError: '',

            isEmailError: false,
            isPasswordError: false,
        }
    }

    render() {

        return (
            <div id='dvToggleInner' className='container-login'>

                <div>

                    <div>
                    </div>

                </div>

                <div>

                    <div>
                        {/*
                        {
                            this.state.isCreateSuccess &&
                            <div>
                                <CheckCircleOutlineIcon style={{ fontSize: 18, color: 'green', marginRight: 3 }} />
                                <span>Registration successful. Log in with ur credentials</span>
                            </div>
                        }

                        {
                            this.state.isError &&
                            <div>
                                <ErrorOutlineIcon style={{ fontSize: 18, color: 'red', marginRight: 3 }} />
                                <span>{this.state.txtError}</span>
                            </div>
                        }
                        {

                            this.state.isEmailError &&
                            <div>
                                <ErrorOutlineIcon style={{ fontSize: 18, color: 'red', marginRight: 3 }} />
                                <span>email: provide a valid email address</span>
                            </div>
                        }
                        {
                            this.state.isPasswordError &&
                            <div>
                                <ErrorOutlineIcon style={{ fontSize: 18, color: 'red', marginRight: 3 }} />
                                <span>password: only alphabets and numbers ( Min 6 chars )</span>
                            </div>
                        }
*/}

                    </div>

                    <div>

                        {/* <input type="text" style={{ border: this.state.isEmailError ? 'solid 1px red' : '' }} placeholder='Email' maxLength="40" value={this.state.email} onChange={(event) => this.setInputText(event, 'email')} />
                        <input type="text" style={{ border: this.state.isPasswordError ? 'solid 1px red' : '' }} placeholder='Password' maxLength="40" value={this.state.password} onChange={(text) => this.setInputText(text, 'password')} />
                        <input type="submit" value="Submit" onClick={() => this.handleSubmit()} /> */}


                        <StyledFirebaseAuth
                            uiConfig={_uiConfig}
                            firebaseAuth={firebase.auth()} />

                    </div>

                </div>

            </div>
        )
    }

    handleSubmit() {

        if (this.validateTextInput()) {
            firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
                .then((result) => {
                    this.onSignupSuccess()
                })
                .catch((error) => {
                    if (error.code == 'auth/weak-password') {
                        this.onSignupError('Weak password!')
                    } else {
                        this.onSignupError(error.message)
                    }
                })
        }
    }

    onSignupSuccess() {

        this.setState((state => {
            return {
                isCreateSuccess: true,
                email: '',
                password: ''
            }
        }))
    }

    onSignupError(text) {
        this.setState({
            isError: true,
            txtError: text,
        })
    }

    setInputText(event, type) {

        if (this.state.isError)
            this.setState({ isError: false })

        if (this.state.isCreateSuccess)
            this.setState({ isCreateSuccess: false })

        switch (type) {
            case 'email':

                this.setState({ email: event.target.value })

                if (this.state.isEmailError)
                    this.setState({ isEmailError: false })

                break;

            case 'password':

                this.setState({ password: event.target.value })

                if (this.state.isPasswordError)
                    this.setState({ isPasswordError: false })

                break;

            default: break;
        }
    }

    validateTextInput() {

        let isSuccess = true

        let regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        let regPassword = /^[0-9a-zA-Z]+$/

        if (!regEmail.test(this.state.email)) {
            this.setState({ isEmailError: true })
            isSuccess = false
        }

        if (this.state.password.length < passLength || !regPassword.test(this.state.password)) {
            this.setState({ isPasswordError: true })
            isSuccess = false
        }

        return isSuccess
    }
}

export default login
