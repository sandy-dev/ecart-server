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

                    <BookList />

                </div>

                <div id='dvBookDetail'>

                    <div>
                        {/* <span><h2>Book detail</h2></span> */}
                    </div>

                    <BookDetail />

                </div>

            </div>
        )
    }
}

export default books
