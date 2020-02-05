import React, { Component } from 'react'
import { withApollo, Subscription } from 'react-apollo'
import { FETCH_BOOKS, RATING_ADDED_SUB } from '_src/components/queries/books'
import { ADD_CART, FETCH_CART } from '_src/components/queries/cart'
import List from '_src/components/common/list'
import Paging from '_src/components/common/pagingDatabase'
import Search from '@material-ui/icons/Search'
import Close from '@material-ui/icons/RemoveCircle'
import Category from '_src/config/category.json'
import GLOBAL from '_src/components/common/global'

const Categories = Category[0]['category']
const textMulti = .16
const textMultiCategory = .08
const item_per_page = 4
const dvCategoryHeight = 240
let activeCategory = 0
let activeSorting = 'rating'
let activeAuthor = 0


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

        var books = this.state.filteredData

        // if (books.length == 0) {
        //     history.pushState({ book: null }, document.title, window.location.pathname)
        // }

        return (

            <div>

                <div>

                    <div>

                        <div className='floatdivHeader' onClick={() => { this.setState({ heightSort: this.state.heightSort == 0 ? 100 : 0 }) }} >
                            <span> Sort</span>
                            <span> {this.state.sortText} </span>
                        </div>

                        <div className='floatdivHeader' onClick={() => { this.setState({ heightCategory: this.state.heightCategory == 0 ? dvCategoryHeight : 0 }) }} >
                            <span> Category </span>
                            <span> {this.state.categoryText} </span>

                            {
                                this.state.category > 0 &&
                                <Close onClick={() => { this.removeFilter('category') }} />
                            }

                        </div>

                        <div className='floatdivHeader' onClick={() => { this.setState({ heightCategory: this.state.heightCategory == 0 ? dvCategoryHeight : 0 }) }} >
                            <span> Author </span>
                            <span> {this.state.authorText} </span>

                            {
                                this.state.author != '' &&
                                <Close onClick={() => { this.removeFilter('author') }} />
                            }

                        </div>

                        {/* <div className='floatdivMain'>
                            <div className='floatdivHeader' onClick={() => { this.setState({ heightSort: this.state.heightSort == 0 ? 100 : 0 }) }} >
                                <span> Sort: &nbsp; </span>
                                <span> {this.state.sortText} </span>
                            </div>

                            <div className='floatdiv' style={{
                                height: this.state.heightSort,
                            }}>

                                {
                                    this.state.heightSort > 0 &&

                                    <div>
                                        <span onClick={() => { this.itemFilters(1, 'rating') }} style={{ borderWidth: this.state.heightSort == 0 ? 0 : 1 }} className='floatdivItems'>rating</span>
                                        <span onClick={() => { this.itemFilters(1, 'publish') }} style={{ borderWidth: this.state.heightSort == 0 ? 0 : 1 }} className='floatdivItems'>publish date</span>
                                    </div>

                                }
                            </div>
                        </div>


                        <div className='floatdivMain'>

                            <div className='floatdivHeader' onClick={() => { this.setState({ heightCategory: this.state.heightCategory == 0 ? dvCategoryHeight : 0 }) }} >
                                <span> Category: &nbsp; </span>
                                <span> {this.state.categoryText} </span>
                            </div>

                            <div className='floatdiv' style={{
                                height: this.state.heightCategory,
                            }}>

                                {
                                    this.state.heightCategory > 0 &&

                                    Categories.map((item, index) => {
                                        return (<span key={index} value={item.id} onClick={() => { this.itemFilters(2, item) }} style={{ borderWidth: this.state.heightCategory == 0 ? 0 : 1 }} className='floatdivItems'>{item.name}</span>)
                                    })
                                }

                            </div>

                        </div> */}

                    </div>

                    <div>

                        <input value={this.state.inputText} placeholder='name' maxLength='20' onChange={(event) => { this.validateAndSearch(event, 'name') }} />

                        <a className='searchbutton' onClick={(e) => this.searchBooks()}>
                            <Search />
                        </a>

                    </div>

                </div>

                <div>

                    {/* <Subscription subscription={RATING_ADDED_SUB}>
                        {({ data }) => {
                            return null
                        }}
                    </Subscription> */}

                    {
                        this.state.isLoading && <div>Loading..</div>
                    }

                    {
                        !this.state.isLoading && books && books.length > 0 &&

                        <div className='container-list'>

                            <List listData={books} className='container-list' source={'book'} onClick={(itemid) => { this.cartClicked(itemid) }} />
                            <Paging itemCount={this.state.itemCount} filters={{ sort: this.state.sortText, category: this.state.category, author: this.state.author }} onClick={(index) => { this.GetPaginatedData(index) }} />

                        </div>
                    }

                    {
                        !this.state.isLoading && books && books.length == 0 &&

                        <div style={{ minHeight: '50vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <span> No data</span>
                        </div>
                    }

                </div>

            </div>

        )
    }

    componentDidMount = async () => {

        const { client } = this.props
        this.setState({ isLoading: true })

        const res = await this.runQuery(FETCH_BOOKS, FETCH_BOOKS, { category: 0, author: '', sort: 'rating', search: '', limit: item_per_page, offset: 0 }, 'query')

        if (res.data) {

            const count = res.data.books.count
            const dataSet = res.data.books.Books
            this.setState({ filteredData: dataSet, itemCount: count, isLoading: false })
        } else {
            this.setState({ isLoading: false })
        }
    }

    componentDidUpdate() {

        if (this.props.sort != null && this.props.sort != undefined) {
            if (activeSorting != this.props.sort) {
                activeSorting = this.props.sort
                this.itemFilters(1, activeSorting)
            }
        }

        if (this.props.category != null && this.props.category != undefined) {
            if (activeCategory != this.props.category) {
                activeCategory = this.props.category
                let category = Categories[activeCategory]
                this.itemFilters(2, category)
            }
        }

        if (this.props.author != null && this.props.author != undefined) {
            if (activeAuthor != this.props.author.id) {
                activeAuthor = this.props.author.id
                this.itemFilters(3, { id: activeAuthor, name: this.props.author.name })
            }
        }
    }

    itemFilters = async (type, arg) => {

        const sortId = type == 1 ? arg : this.state.sortText
        const categoryId = type == 2 ? parseInt(arg.id) : parseInt(this.state.category)
        const authorId = type == 3 ? arg.id : this.state.author

        const res = await this.runQuery(FETCH_BOOKS, FETCH_BOOKS, { category: categoryId, author: authorId, sort: sortId, search: '', limit: item_per_page, offset: 0 }, 'query')

        if (res.data) {

            const dataSet = res.data.books.Books

            if (type == 1) {
                this.setState({ filteredData: dataSet, itemCount: res.data.books.count, heightSort: 0, sortText: sortId })
            }

            if (type == 2) {
                this.setState({ filteredData: dataSet, itemCount: res.data.books.count, heightCategory: 0, category: categoryId, categoryText: arg.name })
            }

            if (type == 3) {
                this.setState({ filteredData: dataSet, itemCount: res.data.books.count, author: authorId, authorText: arg.name })
            }
        }
    }

    removeFilter(type) {

        switch (type) {

            case 'author':
                this.itemFilters(3, { id: '', name: 'All' })
                break

            case 'category':
                let category = Categories[0]
                this.itemFilters(2, category)
                break

            default: break
        }
    }

    GetPaginatedData = async (index) => {

        const _offset = index * item_per_page

        const res = await this.runQuery(FETCH_BOOKS, FETCH_BOOKS, { category: this.state.category, author: this.state.author, sort: this.state.sortText, search: '', limit: item_per_page, offset: _offset }, 'query')
        if (res.data) {
            this.setState({ filteredData: res.data.books.Books, itemCount: res.data.books.count })
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

    async runQuery(_query, _refetchQuery, _variable, type) {

        const { client } = this.props

        if (type == 'query') {
            const res = await client.query({ query: _query, variables: _variable })
            return res

        } else {

            const res = await client.mutate({
                mutation: _query,
                variables: _variable,
                //refetchQueries: [{ query: _refetchQuery, variables: { userId: GLOBAL.userId } }]
            })
            return res
        }
    }

    async cartClicked(itemid) {

        let isSignedIn = GLOBAL.userId == '' ? false : true

        if (!isSignedIn) {
            let dvLogin = document.getElementById('dvLogin')
            dvLogin.click()
        } else {
            const { client } = this.props
            await client.mutate({
                mutation: ADD_CART,
                variables: { userId: GLOBAL.userId, bookId: itemid, date: this.formatDate(new Date(Date.now())) },
                refetchQueries: [{ query: FETCH_CART, variables: { userId: GLOBAL.userId } }]
            })

            //this.runQuery(ADD_CART, FETCH_CART, { userId: GLOBAL.userId, bookId: itemid, date: '11 Nov 2019' }, 'mutate')//"GLOBAL.userId"
        }
    }

    formatDate(date) {
        var monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        var day = date.getDate();
        var monthIndex = date.getMonth()
        var year = date.getFullYear()
        return day + ' ' + monthNames[monthIndex] + ' ' + year
    }

}

export default withApollo(bookList)
