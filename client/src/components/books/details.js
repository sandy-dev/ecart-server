import React, { Component } from 'react'
import { graphql, Query } from 'react-apollo'
import { Grid, Card, CardMedia, CardContent, Typography, Button, Divider, Paper } from '@material-ui/core'
import Person from '@material-ui/icons/PersonOutlineSharp'
import { FETCH_BOOK_ID } from '_src/components/queries/books'
import { FETCH_RATINGS, ADD_RATING } from '_src/components/queries/ratings'
import Rating from '_src/components/common/rating'
import List from '_src/components/common/list'
import GLOBAL from '_src/components/common/global'
import Category from '_src/config/category.json'
import Popper from '_src/components/common/popper'

const Categories = Category[0]['category']
let bookId = 0
const colorBody = '#9E9E9E'

class bookDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            review: '',
            starsSelected: 2,
            bookId: '',
            reviewHeight: '100%',
            anchorEl: null,
        }
    }
    render() {
        let state = window.history.state
        if (state != null && state.book) { bookId = state.book }
        return (
            <React.Fragment>
                {bookId != '' &&
                    <Query query={FETCH_BOOK_ID} variables={{ id: bookId.toString() }}>
                        {({ loading, error, data }) => {
                            if (loading) return 'Loading...'
                            if (error) return `Error! ${error.message}`;
                            return (
                                <Card style={style.cardContainer}>
                                    <Grid container spacing={6}>
                                        <Grid item sm={12} style={style.center}>
                                            <Typography variant="button"> book details</Typography>
                                        </Grid>
                                        <Divider style={style.divider} />
                                        <Grid item sm={12} style={style.center}>
                                            <Card elevation={1} style={style.cardDetailHeader}>
                                                <Grid container>
                                                    <Grid item sm={4} style={style.center}>
                                                        <img src={`/uploads/${data.book.image}`} style={style.Media} />
                                                    </Grid>
                                                    <Grid item sm={8} style={style.center}>
                                                        <CardContent>
                                                            <Grid item style={style.centerRowLeft}>
                                                                <Typography variant="button" style={style.infoBoxHeader}>name</Typography>
                                                                <Typography variant="body1" style={style.infoBox}> {data.book.name}</Typography>
                                                            </Grid>
                                                            <Grid item style={style.centerRowLeft}>
                                                                <Typography variant="button" style={style.infoBoxHeader}>author</Typography>
                                                                <Typography variant="body1" style={style.infoBox}> {data.book.author.name}</Typography>
                                                            </Grid>
                                                            <Grid item style={style.centerRowLeft}>
                                                                <Typography variant="button" style={style.infoBoxHeader}>pages</Typography>
                                                                <Typography variant="body1" style={style.infoBox}> {data.book.pages}</Typography>
                                                            </Grid>
                                                            <Grid item style={style.centerRowLeft}>
                                                                <Typography variant="button" style={style.infoBoxHeader}>price</Typography>
                                                                <Typography variant="body1" style={style.infoBox}> {data.book.price}</Typography>
                                                            </Grid>
                                                            <Grid item style={style.centerRowLeft}>
                                                                <Typography variant="button" style={style.infoBoxHeader}>Category</Typography>
                                                                <Typography variant="body1" style={style.infoBox}> {Categories[data.book.category - 1].name}</Typography>
                                                            </Grid>
                                                        </CardContent>
                                                    </Grid>
                                                </Grid>
                                            </Card>
                                        </Grid>
                                        <Divider style={style.divider} />
                                        <Grid item sm={12} style={style.center}>
                                            <Grid container spacing={3}>
                                                <Grid item sm={12} style={style.center}>
                                                    <Typography variant="button"> description</Typography>
                                                </Grid>
                                                <Grid item sm={12} style={style.center}>
                                                    <Typography variant="body1" style={style.infoBox}> {data.book.description}</Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Divider style={style.divider} />
                                        <Grid item sm={12} style={style.center}>
                                            <Grid container spacing={3}>
                                                <Grid item sm={12} style={style.center}>
                                                    <Typography variant="button"> Reviews</Typography>
                                                </Grid>
                                                <Grid item sm={12} style={style.center}>
                                                    <Grid container direction='column' spacing={2} style={{ padding: 30 }}>
                                                        {
                                                            data.book.ratings && data.book.ratings.length > 0 &&
                                                            data.book.ratings.map((item, index) => {
                                                                return (
                                                                    <Paper direction='column' key={index} square elevation={0} style={{ marginBottom: 20 }}>
                                                                        <Grid item sm={6} style={style.centerRowLeft}>
                                                                            <Person />
                                                                            <Typography variant="caption" gutterBottom> {new Date(item.date).toDateString()}</Typography>
                                                                        </Grid>
                                                                        <Divider />
                                                                        <Typography variant="body1" style={{ color: colorBody, padding: 10 }}> {item.review}</Typography>
                                                                    </Paper>
                                                                )
                                                            })
                                                        }
                                                    </Grid>
                                                    {data.book.ratings.length == 0 && <span> No reviews </span>}
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Divider style={style.divider} />
                                        <Grid item sm={12} style={style.center}>
                                            <Grid container direction='column' style={style.centerColumn} spacing={1}>
                                                <Grid item sm={12} style={style.center}>
                                                    <Typography variant="button"> Add review</Typography>
                                                </Grid>
                                                <Grid item sm={12} style={style.centerRow}>
                                                    {this.state.reviewHeight == 0 && <Typography>Thank you</Typography>}
                                                </Grid>
                                                <Grid item sm={12} style={style.centerRow}>
                                                    <Rating onClick={(rating) => this.setRating(rating)} active={true} />
                                                </Grid>
                                                <Grid item sm={12} style={style.centerRow}>
                                                    <textarea style={{ height: '70px' }} value={this.state.review} maxLength='1000' onChange={(event) => { this.setText(event) }} />
                                                </Grid>
                                                <Grid item sm={12} style={style.centerRowBadge}>
                                                    <Button disabled={this.state.reviewHeight == 0 ? true : false} variant="outlined" color="primary" id='btnSubmit' type="submit" style={{ width: '40vmin' }} onClick={(event) => { this.submitReview(event, 'right') }} >
                                                        Submit Review
                                                   </Button>
                                                    <Popper
                                                        text='Please Log in to continue'
                                                        anchorEl={this.state.anchorEl} />
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Card>
                            )
                        }}
                    </Query>
                }
            </React.Fragment>
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
    submitReview(event, _place) {
        let isSignedIn = GLOBAL.userId == '' ? false : true
        if (!isSignedIn) {
            this.setState({ anchorEl: this.state.anchorEl ? null : event.currentTarget, })
            setTimeout(() => {
                this.setState({ anchorEl: null })
            }, 1500)
            return false
        }
        let date = this.formatDate(new Date(Date.now()))
        this.props.addRatingMutation({
            variables: { rating: parseInt(this.state.starsSelected), review: this.state.review, bookId: bookId, date: date, userId: GLOBAL.userId },
        })
        this.setState({ starsSelected: 0, review: '', reviewHeight: 0 })
    }
}
const style = {
    cardContainer: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 30,
        marginTop: 30,
        padding: 20,
        boxShadow: '0px 0px 4px 0px #F5F5F5'
    },
    center: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexGrow: 1
    },
    centerRow: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    centerColumn: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    centerRowLeft: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%',
    },
    centerColumnLeft: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        width: '100%',
    },
    cardDetailHeader: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        margin: 'auto'
    },
    Media: {
        height: 200,
        width: '100%',
    },
    infoBoxHeader: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 2,
    },
    infoBox: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 10,
        color: colorBody,
    },
    divider: {
        width: '100%'
    },
    badge: {
        position: 'relative',
        top: 0,
        left: 5,
        width: 'auto'
    },
    centerRowBadge: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative'
    }
}

export default graphql(ADD_RATING, { name: "addRatingMutation" })(bookDetail)
