import React, { Component } from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import '_src/stylesheets/main.css'
import { firebase } from '_src/components/auth/firebase'
import UserSync from '_src/components/auth/userSync'
import Header from '_src/components/layout/header'
import Footer from '_src/components/layout/footer'
import Sidebar from '_src/components/layout/sidebar'
import NotFound from '_src/components/common/notFound'
import Landing from '_src/components/landing'
import Home from '_src/components/home'
import Account from '_src/components/users/account'

import Authors from '_src/components/authors/authors'
import AddAuthor from '_src/components/authors/addAuthor'

import Books from '_src/components/books/books'
import AddBook from '_src/components/books/add'
import BookDetail from '_src/components/books/details'

import { AplloClient, ApolloProvider } from '_src/config/apollo'


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

                    <UserSync signedIn={this.state.isSignedIn} user={this.state._user} />
                    <Header isSignedIn={this.state.isSignedIn} user={this.state._user} />
                    <Sidebar isSignedIn={this.state.isSignedIn} />
                    {/* <Route path="/" component={this.state.isSignedIn ? Sidebar : null} /> */}

                    <Switch>

                        {/* <Route exact path="/" component={this.state.isSignedIn ? Home : Landing} />
                        <Route exact path="/home" component={Home} /> */}

                        <Route exact path="/" component={Books} />
                        <Route exact path="/books" component={Books} />
                        <Route exact path="/books/add" exact component={AddBook} />
                        <Route path="/books/details" exact component={BookDetail} />

                        <Route exact path="/authors" exact component={Authors} />
                        <Route exact path="/authors/add" exact component={AddAuthor} />

                        <Route exact path="/account" exact component={Account} />

                        <Route path="*" component={NotFound} />

                    </Switch>

                </BrowserRouter>

                <Footer isSignedIn={this.state.isSignedIn} />

            </ApolloProvider>

        )
    }

    componentDidMount() {

        firebase.auth().onAuthStateChanged(user => {

            if (!!user) {
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
                this.setState({
                    isSignedIn: false,
                    _user: []
                })
            }
        })
    }
}

export default App