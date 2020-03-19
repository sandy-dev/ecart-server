import React, { Component } from 'react'
import Person from '@material-ui/icons/Person'
import { Link } from 'react-router-dom'
import Rating from '_src/components/common/rating'
import IconStar from '@material-ui/icons/Star'
import Edit from '@material-ui/icons/Edit'
import Category from '_src/config/category.json'
import GLOBAL from '_src/components/common/global'
import flowright from "lodash.flowright"
import { Query, graphql } from 'react-apollo'
import { ADD_CART, FETCH_CART } from '_src/components/queries/cart'
import { FETCH_BOOKS, RATING_ADDED_SUB } from '_src/components/queries/books'
import Paging from '_src/components/common/pagingDatabase'
import { Grid, Card, CardActionArea, CardMedia, CardContent, CardActions, Typography, Button, Divider } from '@material-ui/core'
import Popper from '_src/components/common/popper'
const item_per_page = 4
const Categories = Category[0]['category']

class bookItemsPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            offset: 0,
            anchorEl: null,
            badgeText: ''
        }
    }
    render() {
        return (
            <Query query={FETCH_BOOKS} variables={{
                category: this.props.filter.category, author: this.props.filter.author, sort: this.props.filter.sort, search: this.props.filter.search,
                limit: item_per_page, offset: this.state.offset
            }}>
                {({ loading, error, data }) => {
                    if (loading) return <span style={style.loader}>Loading...</span>
                    if (error) return <span style={style.loader}> error</span>
                    if (data.books.count == 0) return <span style={style.loader}> No data</span>

                    return (
                        <React.Fragment>
                            <BookItemsCard
                                books={data.books}
                                onCartClick={(event, itemId) => { this.cartClicked(event, itemId) }}
                                anchorEl={this.state.anchorEl}
                                badgeText={this.state.badgeText}
                            />
                            <Paging
                                itemCount={data.books.count}
                                type='book'
                                filters={{ sort: this.props.filter.sort, category: this.props.filter.category, author: this.props.filter.author }}
                                onClick={(index) => { this.GetPaginatedData(index) }}
                            />
                        </React.Fragment>
                    )
                }}
            </Query >
        )
    }
    GetPaginatedData = async (index) => {
        this.setState({ offset: index * item_per_page })
    }
    async cartClicked(event, itemid) {
        event.preventDefault()
        let target = event.currentTarget

        const isLoggedIn = this.props.isSignedIn || GLOBAL.userId != ''
        if (!isLoggedIn) {
            this.showBadge(target, 'Please Log in to continue')
            return false
        }

        const response = await this.props
            .addCart({
                userId: GLOBAL.userId,
                bookId: itemid,
                date: this.formatDate(new Date(Date.now()))
            })
            .then((res) => {
            })
            .catch((error) => {
                console.log(error)
            })

        this.showBadge(target, 'Cart added succesfully')
    }
    async showBadge(target, text) {
        await this.setState((prevState) => ({
            anchorEl: prevState.anchorEl ? null : target,
            badgeText: text
        }))

        setTimeout(() => {
            this.setState({
                anchorEl: null,
                badgeText: ''
            })
        }, 1500)
    }
    formatDate(date) {
        var monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        var day = date.getDate();
        var monthIndex = date.getMonth()
        var year = date.getFullYear()
        return day + ' ' + monthNames[monthIndex] + ' ' + year
    }
}
export default flowright(
    graphql(ADD_CART, {
        props: ({ mutate }) => ({
            addCart: (params) => {
                return mutate({
                    variables: params,
                    refetchQueries: [{ query: FETCH_CART, variables: { userId: GLOBAL.userId, limit: item_per_page, offset: 0, count: 0 } }]
                    // update: (proxy, { data: { addCart } }) => {
                    //     const oldCartItems = proxy.readQuery({ query: FETCH_CART, variables: { userId: GLOBAL.userId } })
                    //     const modifiedCart = oldCartItems.carts.push(addCart)
                    //     proxy.writeQuery({
                    //         query: FETCH_CART,
                    //         variables: { userId: GLOBAL.userId },
                    //         data: modifiedCart,
                    //     })
                    // }
                })
            }
        })
    })
)(bookItemsPage)

const BookItemsCard = props => {
    return (
        props.books.Books.map((item, index) => {
            return (
                <Card key={index} style={style.cardContainer}>
                    <Grid container spacing={3}>
                        <Grid item sm={4} style={style.center}>
                            <img src={`/uploads/${item.image}`} style={style.media} />
                        </Grid>
                        <Grid item sm={4} style={style.centerColumnLeft}>
                            <Grid item style={style.centerRowLeft}>
                                <IconStar style={{ height: '20px', marginRight: '4px' }} className='starselected' />
                                {item.ratingCount > 0 && <span> {item.averageRating} / {item.ratingCount} </span>}
                                {item.ratingCount == null && <span> No ratings </span>}
                            </Grid>
                            <Grid item style={style.centerRowLeft}>
                                <Typography variant="button" style={style.infoBoxHeader}>Title</Typography>
                                <Typography variant="body1" style={style.infoBox}> {item.name}</Typography>
                            </Grid>
                            <Grid item style={style.centerRowLeft}>
                                <Typography variant="button" style={style.infoBoxHeader}>Author</Typography>
                                <Typography variant="body1" style={style.infoBox}> {item.author.name}</Typography>
                            </Grid>
                            <Grid item style={style.centerRowLeft}>
                                <Typography variant="button" style={style.infoBoxHeader}>Price</Typography>
                                <Typography variant="button" style={style.infoBox}> {item.price}</Typography>
                            </Grid>
                            <Grid item style={style.centerRowLeft}>
                                <Typography variant="button" style={style.infoBoxHeader}>Category</Typography>
                                <Typography variant="button" style={style.infoBox}> {Categories[item.category].name}</Typography>
                            </Grid>
                            <Grid item style={style.centerRowLeft}>
                                <Typography variant="button" style={style.infoBoxHeader}>Publish Date</Typography>
                                <Typography variant="button" style={style.infoBox}> {item.publishYear}</Typography>
                            </Grid>
                            <Grid item style={style.centerRowLeft}>
                                <Typography variant="button" style={style.infoBoxHeader}>Pages</Typography>
                                <Typography variant="button" style={style.infoBox}> {item.pages}</Typography>
                            </Grid>
                        </Grid>
                        <Grid item sm={4} style={style.centerColumnLeft}>
                            <Button size="small" color="primary" onClick={(event) => PageRedirect(event, `bookdetail`, item.id)}> Check Reviews </Button>
                            <Button size="small" color="primary" onClick={(event) => PageRedirect(event, `bookdetail`, item.id)}> Check Detail </Button>
                            <Button size="small" color="primary" onClick={(event) => { props.onCartClick(event, item.id) }}> Add To Cart </Button>
                            <Popper
                                text={props.badgeText}
                                anchorEl={props.anchorEl} />

                            {
                                GLOBAL.email == 'confikr.lab@gmail.com' &&
                                <Link to={{ pathname: '/books/add/', id: item.id }} className='list-details-actions tooltip'> <Edit /> </Link>
                            }
                        </Grid>
                    </Grid>
                </Card>
            )
        })
    )
    function PageRedirect(event, page, id) {
        event.preventDefault()
        switch (page) {
            case 'bookdetail': window.location.href = "#dvBookDetail"
                break
            case 'projects': window.location.href = "#dvProjects"
                break
            default: break
        }
        history.pushState({ book: id }, document.title, window.location.pathname)
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
        padding: 20,
        boxShadow: '0px 0px 4px 0px #F5F5F5'
    },
    filterItems: {
        padding: 8
    },
    imageConatiner: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '30vw',
        height: '20vh',
    },
    center: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        //flexGrow: 1
    },
    centerRow: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
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
        color: '#9E9E9E',
    },
    media: {
        width: '60%',
        height: 200,
        //height: 200
    },
    loader: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        flexGrow: 1,
    }
}
