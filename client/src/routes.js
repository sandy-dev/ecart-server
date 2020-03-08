import React, { Fragment } from 'react'
import { Link, Route, Switch, Redirect } from 'react-router-dom'
import Books from '_src/components/books/books'
import Authors from '_src/components/authors/authors'
import BookDetail from '_src/components/books/details'
import NotFound from '_src/components/common/notFound'
import Account from '_src/components/users/account'
import Login from '_src/components/auth/login'

const ReactRouter = (props) => {
    return (
        <Fragment>
            <Switch>
                <Route exact path="/" component={Books} />
                <Route exact path="/books" component={Books} />
                <Route exact path="/authors" component={Authors} />
                <Route path="/books/details" exact component={BookDetail} />
                <Route exact path="/account" exact component={() => (<Account isSignedIn={props.isSignedIn} />)} />
                <Route exact path="/login" exact component={() => (<Login isSignedIn={props.isSignedIn} />)} />
                <Route path="*" component={NotFound} />
            </Switch>
        </Fragment>
    )
}

export default ReactRouter
