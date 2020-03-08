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
                <Grid item>
                    <Grid item xs>
                        <BookList
                            category={this.props.location.category}
                            sort={this.props.location.sort}
                            author={this.props.location.author} />

                    </Grid>
                </Grid>
                <Grid item id='dvBookDetail'>
                    <BookDetail />
                </Grid>
            </Grid>
        )
    }
}

const style = {
    container: {
        flex: 1,
        height: '100%',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingLeft: '2%',
        paddingRight: '2%',
        paddingBottom: 40
    },
}

export default books

