import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { graphql, compose } from 'react-apollo'
import { FETCH_BOOKS, RATING_ADDED_SUB } from '_src/components/queries/books'
import List from '_src/components/books/bookItemsPage'
import { Search, RemoveCircle } from '@material-ui/icons'
import Category from '_src/config/category.json'
import GLOBAL from '_src/components/common/global'
import { Grid, Paper, Card, Typography, Chip, Divider } from '@material-ui/core'
import { withRouter } from 'react-router-dom'

const Categories = Category[0]['category']
const item_per_page = 4
let _sort = 'rating'
let _category = 0
let _author = ''
let _authorName = 'All'

class bookList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            inputText: '',
            filteredData: [],
            offset: 0,
        }
    }
    render() {
        _sort = this.props.sort ? this.props.sort : _sort
        _category = (this.props.category != null || this.props.category != undefined) ? parseInt(this.props.category) : _category
        _author = (this.props.authorId != null || this.props.authorId != undefined) ? this.props.authorId : _author
        _authorName = (this.props.authorName != null || this.props.authorName != undefined) ? this.props.authorName : _authorName
        const _filter = { category: _category, author: _author, sort: _sort, search: this.state.inputText, limit: item_per_page, offset: this.state.offset }
        return (
            <Grid container style={style.container}>
                <Grid item sm={12} style={style.gridSeacrh}>
                    <Grid container spacing={3} direction='column'>
                        <Grid item sm={12} style={style.searchBox}>
                            <input
                                //value={this.state.inputText}
                                placeholder='name'
                                type='text'
                                maxLength='20'
                                onChange={(event) => { this.validateAndSearch(event, 'name') }} >
                            </input>
                            <Search style={style.searchIconBox} onClick={(e) => this.searchBooks()} />
                        </Grid>
                        <Divider />
                        <Grid item sm={12} >
                            <Grid container spacing={1} direction='row'>
                                <Grid item xs style={style.filterBox}>
                                    <Typography variant="caption" style={style.filterItems}> Category </Typography>
                                    <Divider orientation='vertical' />
                                    <Typography variant="caption" noWrap={true} style={style.filterItems}> {Categories[_category].name} </Typography>
                                    <RemoveCircle style={{ fontSize: 20, cursor: 'pointer', color: '#616161' }}
                                        onClick={() => {
                                            this.props.history.push({ category: 0 }, document.title, window.location.pathname)
                                        }}
                                    />
                                </Grid>
                                <Grid item xs style={style.filterBox}>
                                    <Typography variant="caption" style={style.filterItems}> Author </Typography>
                                    <Divider orientation='vertical' />
                                    <Typography variant="caption" noWrap={true} style={style.filterItems}> {_authorName} </Typography>
                                    <RemoveCircle style={{ fontSize: 20, cursor: 'pointer', color: '#616161' }}
                                        onClick={() => {
                                            this.props.history.push({ authorId: '', authorName: 'All' }, document.title, window.location.pathname)
                                        }}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item sm={12} style={style.gridBook}>
                    <List filter={_filter} isSignedIn={this.props.isSignedIn} />
                </Grid>
            </Grid >
        )
    }
    componentDidUpdate() {
        if (
            (document.documentElement.scrollTop > 100
                || document.body.scrollTop > 100) &&
            (
                (this.props.category != null && this.props.category != undefined)
                || (this.props.authorId != null && this.props.authorId != undefined)
                || (this.props.sort != null && this.props.sort != undefined)
            )
        ) {
            document.body.scrollTop = 0
            document.documentElement.scrollTop = 0
        }
    }
    searchBooks = async (index) => {
        const { client } = this.props
        const res = await this.runQuery(FETCH_BOOKS, FETCH_BOOKS, { category: 0, author: this.state.author, sort: this.state.sortText, search: this.state.inputText, limit: item_per_page, offset: 0 }, 'query')
        if (res.data) {

            const count = res.data.books.count
            const dataSet = res.data.books.Books
            this.setState({ filteredData: dataSet, itemCount: count, category: 0, categoryText: Categories[0].name })
        }
    }
    validateAndSearch(event, type) {

        //let PatterText = /^[a-zA-Z0-9]+$/ //  /^[a-zA-Z]+$/
        let PatterText = /^[a-zA-Z0-9,.!? ]*$/


        if (event.target.value != '' && !PatterText.test(event.target.value))
            return

        switch (type) {

            case 'name':
                this.setState({ inputText: event.target.value })
                break

            default: break;
        }

    }
    handleSelectChange(event, type) {
        switch (type) {
            case 'author':
                this.setState({ _author: event.target.value })
                this.state._authorError ? this.setState({ _authorError: false }) : null
                break

            case 'category':
                this.setState({ _category: event.target.value })
                break

            default: break
        }
    }
}
const style = {
    container: {
        display: 'flex',
        minHeight: '100vh',
    },
    leftpanel: {
        backgroundColor: '#F5F5F5',
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'row',
        padding: 5
    },
    filterItems: {
        paddingLeft: 5,
        paddingRight: 5,
    },
    gridSeacrh: {
        width: '100%',
        marginTop: 10,
    },
    gridBook: {
        width: '100%',
        marginTop: 10,
        minHeight: '30vh',
    },
    chip: {
        height: 25,
        borderRadius: 0,
    },
    searchBox: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    searchIconBox: {
        position: 'relative',
        top: 0,
        right: 25,
        cursor: 'pointer',
    },
    filterBox: {
        display: 'flex',
        flexGrow: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    }
}
export default withRouter(bookList)


