import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { FETCH_BOOKS } from '_src/components/queries/books'
import { Query, withApollo } from 'react-apollo'

const bookCount = 6

export class Landing extends Component {

    constructor(props) {
        super(props)

        this.state = {

            books: [],
        }
    }


    render() {

        let books = []
        if (this.state.books.length > 0) {
            books = this.state.books
        }

        return (
            <div className='container-landing'>

                <div>
                </div>

                <div>

                    <div>

                        <div>

                            <div>
                                <span> Top Rated</span>
                            </div>


                            <div>
                                {
                                    books.length > 0 &&

                                    books.map((item, index) => {
                                        if (index < bookCount) {

                                            return (
                                                <div key={item.id}>
                                                    <img src={`/uploads/${item.image}`} alt='' />
                                                    <span>{item.name} </span>
                                                </div>
                                            )
                                        }
                                    })
                                }
                            </div>

                        </div>

                        <div>

                            <div>
                                <span> Historical</span>
                            </div>


                            <div>
                                {
                                    this.getBooksFiltered('history') != null &&

                                    this.getBooksFiltered('history').map((item, index) => {
                                        if (index < bookCount) {

                                            return (
                                                <div key={item.id}>
                                                    <img src={`/uploads/${item.image}`} alt='' />
                                                    <span>{item.name} </span>
                                                </div>
                                            )
                                        }
                                    })
                                }
                            </div>

                        </div>

                    </div>

                    <div>

                        <div>

                            <div>
                                <span>
                                    Fiction
                                </span>
                            </div>


                            <div>
                                {
                                    this.getBooksFiltered('fiction') != null &&

                                    this.getBooksFiltered('fiction').map((item, index) => {
                                        if (index < bookCount) {

                                            return (
                                                <div key={item.id}>
                                                    <img src={`/uploads/${item.image}`} alt='' />
                                                    <span>{item.name} </span>
                                                </div>
                                            )
                                        }
                                    })
                                }
                            </div>

                        </div>

                        <div>

                            <div>
                                <span> Technology</span>
                            </div>


                            <div>
                                {
                                    this.getBooksFiltered('technology') != null &&

                                    this.getBooksFiltered('technology').map((item, index) => {
                                        if (index < bookCount) {

                                            return (
                                                <div key={item.id}>
                                                    <img src={`/uploads/${item.image}`} alt='' />
                                                    <span>{item.name} </span>
                                                </div>
                                            )
                                        }
                                    })
                                }
                            </div>

                        </div>

                    </div>

                </div>

            </div>
        )
    }

    componentDidMount() {
        this.fetchBooks()
    }

    fetchBooks = async () => {
        const { client } = this.props
        const res = await client.query({ query: FETCH_BOOKS })
        if (res.data && res.data.books) {

            let abc = res.data.books

            abc.sort(function (x, y) {

                if (x.AverageRating[0] == null)
                    return 1
                else if (y.AverageRating[0] == null)
                    return -1
                else return y.AverageRating[0].average - x.AverageRating[0].average
            })


            this.setState({ books: abc })
        }
    }

    getBooksFiltered(type) {

        let books = this.state.books

        switch (type) {
            case 'historical': //1
                return books.filter(e => e.category == 1)
                break
            case 'fiction': //3
                return books.filter(e => e.category == 3)
                break
            case 'technology': //5
                return books.filter(e => e.category == 5)
                break
            default: break
        }
    }
}

export default withApollo(Landing)
