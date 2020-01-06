import React, { Component } from 'react'
import ArrowLeft from '@material-ui/icons/ArrowLeft'
import ArrowRight from '@material-ui/icons/ArrowRight'

const itemsPerPage = 5
let currentIndex = 0
let sortText = ''

export class paging extends Component {

    constructor(props) {
        super(props)

        this.state = {
        }
    }

    render() {

        const pageCount = this.props.itemCount == 0 ? 0 : Math.ceil(this.props.itemCount / itemsPerPage)
        let pagingArray = [...Array(pageCount).keys()]

        return (

            <div className='div-pagination'>
                {
                    currentIndex > 0 &&

                    <a className='' onClick={(e) => this.paginationClick(e, currentIndex - 1)}>
                        <ArrowLeft style={{ fontSize: 40, marginTop: '2%' }} />
                    </a>
                }

                {
                    pagingArray.map((user, index) => {
                        return (
                            <a key={index} className='anchorPaging' style={{ opacity: index == currentIndex ? .5 : 1 }} onClick={
                                (e) => { this.paginationClick(e, index) }}>{index + 1}</a>
                        )
                    })
                }

                {
                    currentIndex < (pageCount - 1) &&

                    <a className='' onClick={(e) => this.paginationClick(e, currentIndex + 1, false)}>
                        <ArrowRight style={{ fontSize: 40, marginTop: '2%' }} />
                    </a>
                }

            </div>
        )
    }


    paginationClick(event, index) {

        currentIndex = index
        this.props.onClick(index)
    }

    componentDidUpdate() {
        currentIndex = 0
        sortText = this.props.sortText
    }

    componentWillUpdate() {

        //if (this.props.sortText != sortText) {
            // currentIndex = 0
            // sortText = this.props.sortText
        //}
    }
}

export default paging
