import React, { Component } from 'react'
import { firebase, StyledFirebaseAuth } from '_src/components/auth/firebase'
import { Container, Card, Typography, Divider } from '@material-ui/core'
import { Redirect } from 'react-router-dom'

const _uiConfig = {
    signInFlow: "popup",
    signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.PhoneAuthProvider.PROVIDER_ID
    ],
    callbacks: { signInSuccess: () => false }
}

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isEmailError: false,
            isPasswordError: false,
        }
    }

    render() {

        if (this.props.isSignedIn)
            return (<Redirect to={{ pathname: "/" }} />)

        return (
            <div style={style.conatiner}>
                <Card sm={12} elevation={1} style={style.login}>
                    <Card sm={12} elevation={0} style={style.header}>
                        <Typography variant="button"> Login using google and firebase</Typography>
                    </Card>
                    <Divider style={style.divider} />
                    <StyledFirebaseAuth
                        uiConfig={_uiConfig}
                        firebaseAuth={firebase.auth()} />
                </Card>
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
}
export default Login
const style = {
    conatiner: {
        flex: 1,
        height: '100%',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: '10%'
    },
    login: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        paddingTop: 20,
        width: '80%'
    },
    divider: {
        width: '100%'
    },
    header: {
        padding: 10
    }
}
