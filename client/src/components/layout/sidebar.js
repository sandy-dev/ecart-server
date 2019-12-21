import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom'
import Book from '@material-ui/icons/Book'
import Home from '@material-ui/icons/Home'
import People from '@material-ui/icons/People'
import ArrowForwardIos from '@material-ui/icons/ArrowForwardIos'

const FontMultiplier = 0.18

export class sidebar extends Component {

    constructor(props) {
        super(props)

        this.state = {
            heightAuthor: 0,
            heightBook: 0
        }
    }


    render() {

        return (

            <div className="sidebar">

                <div className="sidebar-header">
                </div>


                <div className='sidebar-menu' >

                    <div>
                        <div>
                            <Home />
                        </div>

                        <NavLink to={"/home"} exact onClick={() => { this.toggleMenu('home') }} activeClassName="selected">
                            Home
                            <ArrowForwardIos />
                        </NavLink>
                    </div>

                </div>

                <div className='sidebar-menu' >

                    <div>
                        <div>
                            <Book />
                        </div>

                        <NavLink to={"/books"} exact onClick={() => { this.toggleMenu('book') }} activeClassName="selected">
                            Books
                            <ArrowForwardIos />
                        </NavLink>
                    </div>

                    <div style={{ height: this.state.heightBook }}>

                        <NavLink to={"/books/add"} activeClassName="selected">
                            <span style={{ fontSize: FontMultiplier * this.state.heightBook }}>Add</span>
                            <ArrowForwardIos />
                        </NavLink>

                    </div>

                </div>

                <div className='sidebar-menu'>

                    <div>
                        <div>
                            <People />
                        </div>

                        <NavLink to={"/authors"} exact onClick={() => { this.toggleMenu('author') }} activeClassName="selected">
                            Authors
                            <ArrowForwardIos />
                        </NavLink>
                    </div>

                    <div style={{ height: this.state.heightAuthor }}>
                        <NavLink to={"/authors/add"} activeClassName="selected"> <span style={{ fontSize: FontMultiplier * this.state.heightAuthor }}>Add</span> </NavLink>
                        <NavLink to={"/authors/details"} activeClassName="selected"> <span style={{ fontSize: FontMultiplier * this.state.heightAuthor }}>Detail</span> </NavLink>
                    </div>

                </div>

                <div className='sidebar-menu'>

                    <div>
                        <div>
                            <People />
                        </div>

                        <NavLink to={"/authors"} exact onClick={() => { this.toggleMenu('author') }} activeClassName="selected">
                            Account
                            <ArrowForwardIos />
                        </NavLink>
                    </div>

                    <div style={{ height: this.state.heightAuthor }}>
                        <NavLink to={"/authors/add"} activeClassName="selected"> <span style={{ fontSize: FontMultiplier * this.state.heightAuthor }}>Add</span> </NavLink>
                        <NavLink to={"/authors/details"} activeClassName="selected"> <span style={{ fontSize: FontMultiplier * this.state.heightAuthor }}>Detail</span> </NavLink>
                    </div>

                </div>

            </div>


        )
    }

    toggleMenu(menu) {
        switch (menu) {

            case 'book': this.setState({ heightBook: this.state.heightBook == 0 ? 40 : 0, heightAuthor: 0 })
                break

            case 'author': this.setState({ heightAuthor: this.state.heightAuthor == 0 ? 40 : 0, heightBook: 0 })
                break

            default: break
        }
    }
}

export default sidebar
