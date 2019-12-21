import React, { Component, useState } from 'react'
import { gql } from "apollo-boost";
import { withApollo, Subscription } from 'react-apollo'
import { Logo_1 } from '_src/components/common/impImage'
import { firebase, StyledFirebaseAuth } from '_src/components/auth/firebase'
import { Link } from 'react-router-dom'
import AddShoppingCartRounded from '@material-ui/icons/AddShoppingCartRounded'
import { FETCH_CART } from '_src/components/queries/cart'
import GLOBAL from '_src/components/common/global'


const _uiConfig = {
    signInFlow: "popup",
    signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.PhoneAuthProvider.PROVIDER_ID
    ],
    callbacks: { signInSuccess: () => false }
}

const cartAddedSub = gql`
  subscription {
    cartAdded{
        count
    }
  }
`

class header extends Component {

    constructor(props) {
        super(props)
        this.handleScroll = this.handleScroll.bind(this)

        this.state = {
            opacity: 0,
            scale: 0,
            cartCount: 0
        }
    }

    render() {

        return (

            <div className="header" id='dvheader'>

                <div>
                    <Link to={"/"}>
                        <img src={Logo_1} style={{ height: '6vmin', width: '7vmin', margin: '1vmin 0 1vmin 2vmin' }} />
                    </Link>
                </div>

                <div>

                    <div>

                        <AddShoppingCartRounded>
                        </AddShoppingCartRounded>

                        <Subscription subscription={cartAddedSub}>
                            {({ data }) => {
                                if (data) {
                                    return <div><span> {data.cartAdded.count} </span></div>
                                } else
                                    return ''

                            }}
                        </Subscription>




                    </div>

                    <div onClick={(event) => this.toggleDivMenu()} >


                        {
                            this.props.isSignedIn ? <span>Log Out</span> : <span>Login/Register</span>
                        }


                    </div>

                    <div id='dvToggle' style={{ transition: 'all .5s ease-out', opacity: this.state.opacity, transform: 'scale(' + this.state.opacity + ')' }}>


                        {
                            !this.props.isSignedIn &&
                            <StyledFirebaseAuth
                                uiConfig={_uiConfig}
                                firebaseAuth={firebase.auth()} />
                        }


                    </div>
                </div>

            </div>
        )
    }

    componentDidMount = async () => {

        window.addEventListener('scroll', this.handleScroll, true)

        const { client } = this.props
        const res = await client.query({ query: FETCH_CART, variables: { userId: '5dec970b1806381dbeb73f4d' } })//GLOBAL.userId 

        if (res.data) {
            this.setState({ cartCount: res.data.cart.length })
        }
    }

    componentWillUpdate() {

        if (this.state.opacity == 1)
            this.setState({ opacity: 0 })
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll)
    }

    toggleDivMenu() {

        if (this.props.isSignedIn) {

            firebase.auth().signOut().then(function () { }).catch(function (error) { })

        } else {

            this.setState({ opacity: 1 })
        }
    }

    handleScroll(event) {

        let dvHeader = document.getElementById('dvheader')
        let dvScroll = document.getElementById('dvScollTop')

        dvHeader.classList.add('scroll')
        dvScroll.style.display = "none"

        if (document.documentElement.scrollTop === 0) {
            dvHeader.classList.remove('scroll')
        }

        if (document.documentElement.scrollTop > 10) {
            dvScroll.style.display = "flex"
        }

    }
}

export default withApollo(header)




