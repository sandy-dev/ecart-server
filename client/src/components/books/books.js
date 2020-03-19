import React, { Component, StyleSheet } from 'react'
import ReactDOM from 'react-dom'
import BookDetail from '_src/components/books/details'
import BookList from '_src/components/books/list'
import { Grid, Paper, Card, CardContent, Button, TextField } from '@material-ui/core'

class books extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Grid container style={style.container}>
                <Grid item style={{ width: '100%' }}>
                    <BookList
                        category={this.props.location ? this.props.location.category : 0}
                        sort={this.props.location ? this.props.location.sort : 'rating'}
                        authorId={this.props.location ? this.props.location.authorId : ''}
                        authorName={this.props.location ? this.props.location.authorName : ''}
                        isSignedIn={this.props.location ? this.props.location.isSignedIn : this.props.isSignedIn} />

                </Grid>
                <Grid item id='dvBookDetail'>
                    <BookDetail isSignedIn={this.props.isSignedIn} />
                </Grid>
            </Grid>
        )
    }
}

const style = {
    container: {
        height: '100%',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingLeft: '3%',
        paddingRight: '3%',
        paddingBottom: 40
    },
}

export default books

