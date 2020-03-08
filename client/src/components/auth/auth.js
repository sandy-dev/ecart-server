import React, { Component } from 'react'
import { firebase } from '_src/components/auth/firebase'

class Auth extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isSignedIn: false
        }
    }
    render() {
        return (
            ''
        )
    }
    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            this.setState({ isSignedIn: !!user })
        })
    }
    isAuthenticated() {
        return this.state.isSignedIn
    }
}

export default new Auth()
