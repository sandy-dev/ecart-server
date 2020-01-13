import React, { Component } from 'react'
import Edit from '@material-ui/icons/Edit'
import Person from '@material-ui/icons/Person'
import { Link } from 'react-router-dom'
import Rating from '_src/components/common/rating'
import IconStar from '@material-ui/icons/Star'
import RemoveCircle from '@material-ui/icons/RemoveCircle'
import Category from '_src/config/category.json'
import GLOBAL from '_src/components/common/global'

const Categories = Category[0]['category']

const imageHeightList = '15vw'
const imageWidthList = '15vw'

class list extends Component {

    render() {

        return (
            <div>
                {this.renderSwitch()}
            </div>
        )
    }

    renderSwitch() {

        switch (this.props.source) {
            case 'book':
                return <ListBook data={this.props.listData} onCartClick={this.props.onClick} />
                break
            case 'author':
                return <ListAuthor data={this.props.listData} onRemoveClick={(item) => { this.props.onRemoveClick(item) }} />
                break
            case 'rating':
                return <ListRating data={this.props.listData} />
                break

            case 'cart':
                return <ListCart data={this.props.listData} onRemoveClick={(item) => { this.props.onClick(item) }} />
                break
            default: break
        }
    }
}

const ListBook = (props) => {

    return (

        props.data.map((item, index) => {

            const rating = getTotalRating(item)

            return (

                <div key={index} className='item-list'>

                    <img src={`/uploads/${item.image}`} alt='' />

                    <div className='list-infobar'>

                        <span><span>Title: </span>  {item.name}</span>
                        <span><span>Author:</span>    {item.author.name}</span>
                        <span><span>Price: </span>   {item.price}</span>
                        <span> <span>Category  :</span> {Categories[item.category].name}</span>
                        <span> <span>Publish Date  :</span> {item.publishYear}</span>
                        <span> <span>Pages  :</span> {item.pages}</span>

                    </div>

                    <div className='list-infobar'>

                        <span style={{ flexDirection: "row" }}>

                            <IconStar style={{ height: '20px', marginRight: '4px' }} className='starselected' />

                            {
                                item.ratingCount > 0 &&
                                <span> {item.averageRating} / {item.ratingCount} </span>
                            }

                            {
                                item.ratingCount == null &&
                                <span> No ratings </span>
                            }


                        </span>

                        <a onClick={(event) => PageRedirect(event, `bookdetail`, item.id)}>
                            Check Reviews
                        </a>

                        <a onClick={(event) => PageRedirect(event, `bookdetail`, item.id)}>
                            Check Detail
                        </a>

                        <a onClick={() => { props.onCartClick(item.id) }}>
                            Add To Cart
                        </a>

                        {
                            GLOBAL.email == 'confikr.lab@gmail.com' &&
                            <Link to={{
                                pathname: '/books/add/',
                                id: item.id
                            }}
                                className='list-details-actions tooltip'>
                                <Edit />
                                {/* <span>Edit</span> */}
                            </Link>
                        }


                    </div>

                </div>
            )
        })

    )

    function getTotalRating(item) {

        let total = 0
        let count = item.ratings ? item.ratings.length : 0

        if (count > 0) {
            item.ratings.map(a => {
                total = total + a.rating
            })
        }

        return {
            average: total > 0 ? (total / count).toFixed(1) : 0,
            count: count
        }
    }

    function PageRedirect(event, page, id) {

        event.preventDefault()

        switch (page) {
            case 'bookdetail': window.location.href = "#dvBookDetail";
                break;
            case 'projects': window.location.href = "#dvProjects";
                break;
            default: break;
        }

        history.pushState({ book: id }, document.title, window.location.pathname)
    }
}

const ListAuthor = (props) => {
    return (
        props.data.map((item, index) => {

            return (
                <div key={index} className='item-list-cart'>

                    <span>{item.name}</span>

                    <Link to={{ pathname: '/books/', author: { id: item.id, name: item.name } }}>
                        <span>Books</span>
                    </Link>

                    {
                        GLOBAL.email == 'confikr.lab@gmail.com' &&
                        <RemoveCircle onClick={() => {
                            props.onRemoveClick(item.id)
                        }} />
                    }

                </div>
            )
        })

    )
}

const ListRating = (props) => {
    return (

        props.data.map((item, index) => {

            return (
                <div key={index}>

                    <div className='flexRowCenter reviewHead'>

                        <div>
                            <Person />
                        </div>

                        <span> {item.date}</span>

                    </div>

                    <span>{item.review}</span>
                </div>
            )
        })

    )
}

const ListCart = (props) => {

    return (

        props.data.map((item, index) => {

            return (
                <div key={index} className='item-list-cart'>

                    <span>{item.book.name}</span>
                    <span>${item.book.price}</span>
                    <span>{item.date}</span>
                    <RemoveCircle onClick={() => {
                        props.onRemoveClick(item._id)
                    }} />
                </div>
            )
        })

    )
}

export default list
