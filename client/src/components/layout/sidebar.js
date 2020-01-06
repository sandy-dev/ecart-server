import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom'
import Book from '@material-ui/icons/Book'
import Home from '@material-ui/icons/Home'
import People from '@material-ui/icons/People'
import ArrowForwardIos from '@material-ui/icons/ArrowForwardIos'
import Category from '_src/config/category.json'
import { FETCH_AUTHORS } from '_src/components/queries/authors'
import { withApollo } from 'react-apollo'

const Categories = Category[0]['category']
const FontMultiplier = 0.28
const FontMultiplierCategory = 0.08
const heightFilters = 180

export class sidebar extends Component {

    constructor(props) {
        super(props)

        this.state = {
            heightBook: 0,
            heightAuthor: 0,
            heightAccount: 0,

            heightCategory: heightFilters,
            heightSort: 50,
            heightAuthorFilter: 0,

            lstAuthors: []
        }
    }

    render() {

        console.log(this.props.isSignedIn)

        return (

            <div className="sidebar">

                <div className="sidebar-header">
                </div>

                <div className='sidebar-menu'>

                    <div>
                        <NavLink to={"/books"} exact onClick={() => { this.toggleMenu('book') }} activeClassName="selected">
                            Books <ArrowForwardIos />
                        </NavLink>

                    </div>

                    {/* <div style={{ height: this.state.heightBook }}>

                        <NavLink to={"/books/add"} activeClassName="selected">
                            <span style={{ fontSize: FontMultiplier * this.state.heightBook }}>Add</span>
                            <ArrowForwardIos />
                        </NavLink>

                    </div> */}

                </div>

                <div className='sidebar-menu'>

                    <div>

                        <NavLink to={"/authors"} exact onClick={() => { this.toggleMenu('author') }} activeClassName="selected">
                            Authors <ArrowForwardIos />
                        </NavLink>

                    </div>

                    {/* <div style={{ height: this.state.heightAuthor }}>
                        <NavLink to={"/authors/add"} activeClassName="selected"> <span style={{ fontSize: FontMultiplier * this.state.heightAuthor }}>Add</span> </NavLink>
                    </div> */}

                </div>

                {
                    this.props.isSignedIn &&
                    <div className='sidebar-menu'>

                        <div>

                            <NavLink to={"/account"} exact onClick={() => { this.toggleMenu('account') }} activeClassName="selected">
                                Account  <ArrowForwardIos />
                            </NavLink>

                        </div>

                    </div>
                }


                <br />
                <div className='sidebar-menu'>

                    <div>

                        <NavLink to={"/books"} exact onClick={() => { this.toggleMenu('sort') }} activeClassName="selected">
                            Sort
                        </NavLink>
                    </div>

                    <div style={{ height: this.state.heightSort }}>

                        <NavLink
                            to={{ pathname: '/books/', sort: 'rating' }}
                            className='border-1' activeClassName="selected">
                            <span style={{ fontSize: FontMultiplier * this.state.heightSort }}>rating </span>
                        </NavLink>
                        <NavLink
                            to={{ pathname: '/books/', sort: 'publish' }}
                            className='border-1' activeClassName="selected">
                            <span style={{ fontSize: FontMultiplier * this.state.heightSort }}>publish date </span>
                        </NavLink>

                    </div>
                </div>

                <div className='sidebar-menu'>

                    <div>

                        <NavLink to={"/books"} exact onClick={() => { this.toggleMenu('category') }} activeClassName="selected">
                            Category
                        </NavLink>
                    </div>

                    <div style={{ height: this.state.heightCategory, overflowY: 'scroll' }}>

                        {
                            Categories.map((item, index) => {
                                return (
                                    <NavLink
                                        to={{ pathname: '/books/', category: item.id }}
                                        className='border-1' activeClassName="selected" key={index}>
                                        <span style={{ fontSize: FontMultiplierCategory * this.state.heightCategory }}>{item.name} </span>
                                    </NavLink>
                                )
                            })
                        }

                    </div>

                </div>

                <div className='sidebar-menu'>

                    <div>

                        <NavLink to={"/books"} exact onClick={() => { this.toggleMenu('authorfilter') }} activeClassName="selected">
                            Author
                        </NavLink>
                    </div>


                    <div style={{ position: 'relative', height: this.state.heightAuthorFilter, overflowY: 'scroll', overflowX: 'hidden' }}>
                        {
                            this.state.lstAuthors.length > 0 &&
                            <div style={{ position: 'absolute', top: 0 }}>
                                {this.state.lstAuthors.map((item, index) => {
                                    return (
                                        <NavLink
                                            to={{ pathname: '/books/', author: { id: item.id, name: item.name } }}
                                            className='border-1' activeClassName="selected" key={index}>
                                            <span style={{ fontSize: FontMultiplierCategory * this.state.heightAuthorFilter }}>{item.name} </span>
                                        </NavLink>
                                    )
                                })}
                            </div>
                        }

                    </div>

                </div>

            </div>


        )
    }

    toggleMenu(menu) {
        switch (menu) {

            case 'book': this.setState({ heightBook: this.state.heightBook == 0 ? 40 : 0, heightAuthor: 0, heightAccount: 0 })
                break

            case 'author': this.setState({ heightAuthor: this.state.heightAuthor == 0 ? 40 : 0, heightBook: 0, heightAccount: 0 })
                break

            case 'account': this.setState({ heightAccount: this.state.heightAccount == 0 ? 40 : 0, heightBook: 0, heightAuthor: 0 })
                break


            case 'sort': this.setState({ heightSort: this.state.heightSort == 0 ? 50 : 0 })
                break


            case 'category': this.setState({ heightCategory: this.state.heightCategory == 0 ? heightFilters : 0, heightAuthorFilter: 0 })
                break


            case 'authorfilter': this.setState({ heightAuthorFilter: this.state.heightAuthorFilter == 0 ? heightFilters : 0, heightCategory: 0 })
                break

            default: break
        }
    }

    componentDidMount = async () => {

        const { client } = this.props

        const res = await client.query({ query: FETCH_AUTHORS })

        if (res.data) {
            this.setState({ lstAuthors: res.data.authors })
        }
    }
}

export default withApollo(sidebar)
