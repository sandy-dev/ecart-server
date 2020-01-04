import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import BookDetail from '_src/components/books/details'
import BookList from '_src/components/books/list'

class books extends Component {

    constructor(props) {
        super(props)
    }

    render() {

        return (

            <div className='container-authors-main'>

                <div>

                    <div>
                        {/* <span><h2>Book List</h2></span> */}
                    </div>

                    <BookList
                        category={this.props.location.category}
                        sort={this.props.location.sort}
                        author={this.props.location.author} />

                </div>

                <div id='dvBookDetail'>

                    <div style={{ backgroundColor: this.props.isSignedIn ? '#F5F5F5' : '#F5F5F5' }}>
                    </div>

                    <BookDetail />

                </div>

            </div>
        )
    }
}

export default books
