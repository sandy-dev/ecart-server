import React, { Component } from 'react'
import IconStar from '@material-ui/icons/Star'

export default class StarRating extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            starsSelected: 2
        }
    }

    render() {
        const totalStars = 5
        const { starsSelected } = this.state

        return (
            <div className="star-rating">
                {[...Array(totalStars)].map((n, i) => (
                    <Star
                        key={i}
                        size={this.props.size}
                        selected={i < starsSelected}
                        onClick={this.props.active ? () => this.change(i + 1) : null}
                    />
                ))}

                {/* <p>
                    {starsSelected} of {totalStars} stars
                </p> */}
            </div>
        )
    }

    change(starsSelected) {
        this.setState({ starsSelected: starsSelected })
        this.props.onClick(starsSelected)
    }
}


const Star = ({ selected = false, onClick = f => f, size }) => {

    return (
        <IconStar className={selected ? 'starselected star' : 'star'} style={{ height: size, width: size }} onClick={onClick} />
    )
}