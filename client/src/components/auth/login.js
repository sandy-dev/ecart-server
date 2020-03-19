import React, { Component } from 'react'
import { firebase, StyledFirebaseAuth } from '_src/components/auth/firebase'
import { Container, Card, CardHeader, CardContent, Avatar, Typography, Divider } from '@material-ui/core'
import { AccountBox } from '@material-ui/icons'
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
                <Card sm={12} elevation={1} style={style.login} style={style.login}>
                    <CardHeader
                        style={style.contain}
                        avatar={
                            <Avatar aria-label="recipe" style={style.avatar}>
                                <AccountBox />
                            </Avatar>
                        }
                        title="Log in"
                    />
                    <Divider style={style.divider} />
                    <CardContent style={style.content}>
                        <Typography variant="button"> Login using google and firebase</Typography>
                        {/* <Divider style={style.divider} variant='inset' /> */}
                        <StyledFirebaseAuth
                            uiConfig={_uiConfig}
                            firebaseAuth={firebase.auth()} />
                    </CardContent>
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
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexGrow: 1,
        height: '100%',
        width: '100%',
        minHeight: '100vh',
        paddingTop: 20
    },
    login: {
        display: 'flex',
        height: '80%',
        width: '80%',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 20,
    },
    content: {
        display: 'flex',
        flexGrow: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: '100%',
        width: '100%',
    },
    divider: {
        width: '100%'
    },
    header: {
        padding: 10
    }
}
