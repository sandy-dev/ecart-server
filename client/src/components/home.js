import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { FETCH_BOOKS } from '_src/components/queries/books'
import { Query, withApollo } from 'react-apollo'

const bookCount = 6

export class Home extends Component {

    constructor(props) {
        super(props)
        this.handleScroll = this.handleScroll.bind(this)

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
            <div className='container-home'>

                <div>
                </div>

                <div>

                    <div>

                        <div>

                            <div>
                                <span> Top Rated</span>


                                <Link to={{ pathname: '/books/', category: '' }} >
                                    <span> View List</span>
                                </Link>

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
                                <span> Latest Published</span>
                                <Link to={{ pathname: '/books/', category: '' }} >
                                    <span> View List</span>
                                </Link>
                            </div>


                            <div>
                                {/* {
                                    books.length > 0 &&

                                    this.getBooksFiltered('top').map((item, index) => {
                                        if (index < bookCount) {

                                            return (
                                                <div key={item.id}>
                                                    <img src={`/uploads/${item.image}`} alt='' />
                                                    <span>{item.name} </span>
                                                </div>
                                            )
                                        }
                                    })
                                } */}
                            </div>

                        </div>

                    </div>

                    <div>

                        <div>

                            <div>
                                <span>
                                    History
                                </span>
                                <Link to={{ pathname: '/books/', category: 'history' }} >
                                    <span> View List</span>
                                </Link>
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
                                <span>
                                    Fiction
                                </span>
                                <Link to={{ pathname: '/books/', category: 'fiction' }} >
                                    <span> View List</span>
                                </Link>
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

                    </div>

                </div>

            </div>
        )
    }

    componentDidMount() {

        window.addEventListener('scroll', this.handleScroll, true)

        this.fetchBooks()
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll)
    }

    handleScroll(event) {

        let dvHeader = document.getElementById('dvheader')
        let dvScroll = document.getElementById('dvScollTop')

        dvHeader.classList.add('scroll')
        dvScroll.style.display = "none"

        if (document.documentElement.scrollTop === 0) {
            dvHeader.classList.remove('scroll')
        }

        if (document.documentElement.scrollTop > 10) {
            dvScroll.style.display = "flex"
        }

    }

    fetchBooks = async () => {
        const { client } = this.props
        const res = await client.query({ query: FETCH_BOOKS })
        if (res.data && res.data.books) {
            this.setState({ books: res.data.books })
        }
    }

    getBooksFiltered(type) {

        let books = this.state.books

        switch (type) {
            case 'top':
        }
    }
}

export default withApollo(Home)
