import React, { Component } from 'react'
import { withApollo } from 'react-apollo'
import { FETCH_BOOKS } from '_src/components/queries/books'
import { ADD_CART, FETCH_CART } from '_src/components/queries/cart'
import List from '_src/components/common/list'
import Paging from '_src/components/common/paging'
import Search from '@material-ui/icons/Search'
import Category from '_src/config/category.json'
import GLOBAL from '_src/components/common/global'

const Categories = Category[0]['category']
const textMulti = .16
const textMultiCategory = .08
const item_per_page = 10


class bookList extends Component {

    constructor(props) {
        super(props)

        this.state = {
            arrayRender: [],
            inputText: '',
            mainData: [],
            filteredData: [],
            heightSort: 0,
            heightCategory: 0
        }
    }

    render() {


        var books = this.state.filteredData

        return (

            <div>

                <div>

                    <div>

                        <div className='floatdivMain'>
                            <div className='floatdivHeader' onClick={() => { this.setState({ heightSort: this.state.heightSort == 0 ? 100 : 0 }) }} > <span> Sort list </span>
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
                            <div className='floatdivHeader' onClick={() => { this.setState({ heightCategory: this.state.heightCategory == 0 ? 200 : 0 }) }} > <span> Category </span></div>

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

                        </div>

                    </div>

                    <div>
                        <input value={this.state.inputText} maxLength='20' onChange={(event) => { this.validateAndSearch(event, 'name') }} />
                        <Search />
                    </div>

                </div>

                <div>

                    {/* {
                        data.loading && <div>Loading..</div>
                    } */}

                    {
                        books && books.length > 0 &&

                        <div className='container-list'>
                            <List listData={this.state.arrayRender} className='container-list' source={'book'} onClick={(itemid) => { this.cartClicked(itemid) }} />
                            <Paging array={books} searchText={this.state.inputText} onClick={(data) => { this.GetPaginatedData(data) }} />
                        </div>
                    }

                    {
                        books && books.length == 0 &&

                        <div>
                            <span> No data</span>
                        </div>
                    }

                </div>

            </div>

        )
    }

    itemFilters(type, arg) {

        let dataSet = this.state.mainData

        if (type == 1) {//sort

            switch (arg) {
                case 'rating':

                    dataSet.sort(function (x, y) {

                        if (x.AverageRating[0] == null)
                            return 1
                        else if (y.AverageRating[0] == null)
                            return -1
                        else return y.AverageRating[0].average - x.AverageRating[0].average
                    })

                    break

                case 'publish':

                    dataSet.sort(function (x, y) {
                        return new Date(y.publishYear) - new Date(x.publishYear)
                    })

                    break


                default: break
            }

            this.setState({ data: dataSet, heightSort: 0 })

        } else {

            let newdataSet = dataSet.filter(e => e.category == arg.id)
            this.setState({ filteredData: newdataSet, heightCategory: 0 })

        }
    }

    componentDidMount = async () => {

        const { client } = this.props

        const res = await this.runQuery(FETCH_BOOKS, FETCH_BOOKS, { category: 0, sort: 'rating', limit: item_per_page, offset: 0 }, 'query')
        if (res.data) {
            this.setState({ filteredData: res.data.books, mainData: res.data.books })
        }
    }

    GetPaginatedData(data) {
        this.setState({ arrayRender: data })
    }

    validateAndSearch(event, type) {

        let PatterText = /^[a-zA-Z0-9]+$/ //  /^[a-zA-Z]+$/

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
        this.runQuery(ADD_CART, FETCH_CART, { userId: "5dec970b1806381dbeb73f4d", bookId: itemid }, 'mutate')//"GLOBAL.userId"
    }

}

export default withApollo(bookList)
