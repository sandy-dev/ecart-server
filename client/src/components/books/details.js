import React, { Component } from 'react'
import { graphql, Query } from 'react-apollo'
import { FETCH_BOOK_ID } from '_src/components/queries/books'
import { FETCH_RATINGS, ADD_RATING } from '_src/components/queries/ratings'
import Rating from '_src/components/common/rating'
import List from '_src/components/common/list'
import GLOBAL from '_src/components/common/global'
import Category from '_src/config/category.json'

const Categories = Category[0]['category']
let bookId = 0

class bookDetail extends Component {

    constructor(props) {
        super(props)

        this.state = {
            review: '',
            starsSelected: 2,
            bookId: '',
            reviewHeight: '100%'
        }
    }

    render() {

        let state = window.history.state
        if (state != null && state.book) {
            bookId = state.book
        }

        return (

            <div>

                <div>

                </div>

                <div>

                    {
                        bookId != '' &&
                        <Query query={FETCH_BOOK_ID} variables={{ id: bookId.toString() }}>
                            {({ loading, error, data }) => {
                                if (loading) return 'Loading...'
                                if (error) return `Error! ${error.message}`;


                                return (

                                    <div className='container-author-detail'>

                                        <div>

                                            <div>
                                                <img style={{ width: '20vw', height: '20vw' }} src={`/uploads/${data.book.image}`} alt='' />

                                            </div>

                                            <div>
                                                <span> <span>name : </span>{data.book.name}</span>
                                                <span> <span>author  :</span> {data.book.author.name}</span>
                                                <span> <span>pages  :</span> {data.book.pages}</span>
                                                <span> <span>price  :</span> {data.book.price}</span>
                                                <span> <span>Category  :</span> {Categories[data.book.category - 1].name}</span>
                                            </div>

                                        </div>

                                        <div>

                                            <div>

                                                <span>description </span>
                                                <span> {data.book.description}</span>

                                            </div>

                                            <div>

                                                <div>

                                                    <span>Reviews </span>

                                                    {
                                                        data.book.ratings && data.book.ratings.length > 0 &&

                                                        <List listData={data.book.ratings} source={'rating'} />
                                                    }


                                                    {
                                                        data.book.ratings.length == 0 &&

                                                        <span> No reviews </span>
                                                    }


                                                </div>


                                                <div>

                                                    <span> Add review </span>

                                                    {
                                                        this.state.reviewHeight == 0 && <span>Thank you</span>
                                                    }

                                                    <div style={{ overflow: "hidden", transition: "height .5s ease-out", height: this.state.reviewHeight }}>



                                                        <Rating onClick={(rating) => this.setRating(rating)} active={true} />
                                                        <br />
                                                        <textarea style={{ height: '70px' }} value={this.state.review} maxLength='1000' onChange={(event) => { this.setText(event) }} />
                                                        <br />
                                                        <button id='btnSubmit' type="submit" onClick={() => { this.submitReview() }}>Submit Review</button>

                                                    </div>

                                                </div>

                                            </div>

                                        </div>

                                    </div>
                                )
                            }}

                        </Query>
                    }


                </div>

            </div>

        )
    }

    setText(event) {

        let PatterText = /^[a-zA-Z0-9,.!? ]*$/

        if (event.target.value != '' && !PatterText.test(event.target.value))
            return false
        else
            this.setState({ review: event.target.value })

    }

    setRating(rating) {
        this.setState({ starsSelected: rating })
    }

    formatDate(date) {
        var monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        var day = date.getDate();
        var monthIndex = date.getMonth()
        var year = date.getFullYear()
        return day + ' ' + monthNames[monthIndex] + ' ' + year
    }

    submitReview() {


        let isSignedIn = GLOBAL.userId == '' ? false : true

        if (!isSignedIn) {
            let dvLogin = document.getElementById('dvLogin')
            dvLogin.click()

            return false
        }

        let date = this.formatDate(new Date(Date.now()))

        this.props.addRatingMutation({
            variables: {
                rating: parseInt(this.state.starsSelected),
                review: this.state.review,
                bookId: bookId,
                date: date,
                userId: GLOBAL.userId
            },
        })

        this.setState({ starsSelected: 0, review: '', reviewHeight: 0 })
    }
}

export default graphql(ADD_RATING, { name: "addRatingMutation" })(bookDetail)
