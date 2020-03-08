import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import { FETCH_BOOKS, RATING_ADDED_SUB } from '_src/components/queries/books'
import List from '_src/components/books/bookItemsPage'
import Search from '@material-ui/icons/Search'
import Close from '@material-ui/icons/RemoveCircle'
import Category from '_src/config/category.json'
import GLOBAL from '_src/components/common/global'
import { Grid, Paper, Card, Typography, Chip, Divider } from '@material-ui/core'

const Categories = Category[0]['category']
const textMulti = .16
const textMultiCategory = .08
const item_per_page = 4
const dvCategoryHeight = 240
let activeCategory = 0
let activeSorting = 'rating'
let activeAuthor = ''

const style = {
    container: {
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
    gridBooks: {
        marginTop: 10,
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
        paddingBottom: 10,
        position: 'relative'
    },
    searchIconBox: {
        position: 'absolute',
        top: 6,
        right: 5,
        cursor: 'pointer',
    },
    filterBox: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 5
    }
}

class bookList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            inputText: '',
            filteredData: [],
            heightSort: 0,
            heightCategory: 0,
            offset: 0,
            category: 0,
            categoryText: 'All',
            sortText: 'rating',
            author: '',
            authorText: 'All',
            isLoading: false
        }
    }
    render() {
        const _filter = {
            category: this.state.category,
            author: this.state.author,
            sort: this.state.sortText,
            search: this.state.inputText,
            limit: item_per_page,
            offset: this.state.offset
        }

        return (
            <Grid container style={style.container}>
                <Grid item sm={12}>
                    <Grid container style={style.searchBox}>
                        <Grid item style={{ position: 'relative' }}>
                            <input
                                //value={this.state.inputText}
                                placeholder='name'
                                type='text'
                                maxLength='20'
                                onChange={(event) => { this.validateAndSearch(event, 'name') }} ></input>
                            <Search style={style.searchIconBox} onClick={(e) => this.searchBooks()} />
                        </Grid>
                    </Grid>
                    <Divider />
                    <Grid container>
                        <Grid item xs={12} style={style.filterBox}>
                            <Card elevation={0} style={style.leftpanel}>
                                <Typography variant="caption" style={style.filterItems}> Category </Typography>
                                <Chip style={style.chip} label={this.state.categoryText} onDelete={() => { this.setState({ category: 0, categoryText: 'All' }) }} />
                            </Card>
                            <Card elevation={0} style={style.leftpanel}>
                                <Typography variant="caption" style={style.filterItems}> Author </Typography>
                                <Chip style={style.chip} label={this.state.authorText} onDelete={() => { this.setState({ author: '', authorText: 'All' }) }} />
                            </Card>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item sm={12} style={style.gridBooks}>
                    <List filter={_filter} />
                </Grid>
            </Grid>
        )
    }

    componentDidUpdate() {
        if (this.props.sort != null && this.props.sort != undefined) {
            if (activeSorting != this.props.sort) {
                activeSorting = this.props.sort
                this.setState({ sortText: activeSorting })
            }
        }
        if (this.props.category != null && this.props.category != undefined) {
            if (activeCategory != this.props.category) {
                activeCategory = parseInt(this.props.category)
                let category = Categories[activeCategory]
                this.setState({ category: activeCategory, categoryText: category.name })
            }
        }

        if (this.props.author != null && this.props.author != undefined) {
            if (activeAuthor != this.props.author.id) {
                activeAuthor = this.props.author.id
                this.setState({ author: activeAuthor, authorText: this.props.author.name })
            }
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

export default bookList


