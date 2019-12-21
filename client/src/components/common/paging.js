import React, { Component } from 'react'
import ArrowLeft from '@material-ui/icons/ArrowLeft'
import ArrowRight from '@material-ui/icons/ArrowRight'

const itemsPerPage = 6
let currentIndex = 0
let pageCount = 0
let searchText = ''
let dataArray = []

export class paging extends Component {

    constructor(props) {
        super(props)

        this.state = {
            offSet: 0,
            pageCount: 0,
            currentIndex: 0,


        }
    }

    render() {

        let pagingArray = [...Array(pageCount).keys()]

        return (

            <div className='div-pagination'>

                {
                    currentIndex > 0 &&

                    <a className='' onClick={(e) => this.paginationClick(e, currentIndex - 1, false)}>
                        <ArrowLeft style={{ fontSize: 40, marginTop: '2%' }} />
                    </a>
                }

                {
                    pagingArray.map((user, index) => {
                        return (

                            <a key={index} className='anchorPaging' style={{ opacity: index == currentIndex ? .5 : 1 }} onClick={(e) => this.paginationClick(e, index, false)}>{index + 1}</a>
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

    componentDidMount() {

        dataArray = this.props.array
        this.paginationClick('', 0, false)
    }

    componentDidUpdate() {

        if (dataArray != this.props.array || (this.props.searchText != null && searchText != this.props.searchText)) {
            searchText = this.props.searchText.toLowerCase()
            dataArray = this.props.array
            this.paginationClick('', 0, true)
        }
    }

    paginationClick(event, index, isSearch) {

        currentIndex = index
        let currentArray = []

        if (isSearch) {
            let resultArray = this.props.array.filter(e => String(e.name).toLowerCase().includes(searchText))
            pageCount = resultArray.length == 0 ? 0 : Math.ceil(resultArray.length / itemsPerPage)
            currentArray = resultArray.slice(0, itemsPerPage)
        } else {
            currentArray = this.props.array.slice(currentIndex * itemsPerPage, currentIndex * itemsPerPage + itemsPerPage)
            pageCount = this.props.array.length == 0 ? 0 : Math.ceil(this.props.array.length / itemsPerPage)
        }

        this.props.onClick(currentArray)
    }
}

export default paging
