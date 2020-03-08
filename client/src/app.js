import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import '_src/stylesheets/main.css'
import { firebase } from '_src/components/auth/firebase'
import UserSync from '_src/components/auth/userSync'
import { AplloClient, ApolloProvider } from '_src/config/apollo'
import GLOBAL from '_src/components/common/global'
import MiniDrawer from './demo'

class App extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isSignedIn: false,
            _user: []
        }
    }

    render() {
        return (
            <ApolloProvider client={AplloClient}>
                <BrowserRouter>
                    <MiniDrawer isSignedIn={this.state.isSignedIn} />

                    {/* <Header isSignedIn={this.state.isSignedIn} user={this.state._user} />
                        <Sidebar isSignedIn={this.state.isSignedIn} /> 
                        <Switch>
                            <UserSync signedIn={this.state.isSignedIn} user={this.state._user} />
                            <Route exact path="/" component={Books} />
                            <Route exact path="/books" component={Books} />
                            <Route exact path="/books/add" exact component={AddBook} />
                            <Route path="/books/details" exact component={BookDetail} />
                            <Route exact path="/authors" exact component={Authors} />
                            <Route exact path="/authors/add" exact component={AddAuthor} />
                            <Route exact path="/account" exact component={Account} />
                            <Route path="*" component={NotFound} />
                        </Switch>*/}
                </BrowserRouter>
            </ApolloProvider>
        )
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if (!!user) {
                GLOBAL.userId = user.uid
                this.setState({
                    isSignedIn: !!user,
                    _user: {
                        uid: user.uid,
                        name: user.displayName,
                        email: user.email,
                        phoneNumber: user.phoneNumber,
                    }
                })

            } else {
                GLOBAL.userId = ''
                GLOBAL.name = ''
                GLOBAL.email = ''
                this.setState({
                    isSignedIn: false,
                    _user: []
                })
            }
        })
    }
}

export default App