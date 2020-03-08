import React, { Component, useState } from 'react'
import { gql } from "apollo-boost";
import { withApollo, Subscription } from 'react-apollo'
import { Link } from 'react-router-dom'
import AddShoppingCartRounded from '@material-ui/icons/AddShoppingCartRounded'
import { FETCH_CART } from '_src/components/queries/cart'
import GLOBAL from '_src/components/common/global'
import { firebase } from '_src/components/auth/firebase'

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
        this.state = {
            cartCount: 0
        }
    }
    render() {
        return (
            <div id='dvheader' style={style.container}>
                {
                    this.props.isSignedIn &&
                    <div style={style.login}>
                        <Link to={"/account"}>
                            <AddShoppingCartRounded style={{ color: 'white' }} />
                        </Link>
                        <Subscription subscription={cartAddedSub}>
                            {({ data }) => {
                                if (data) {
                                    return <div style={style.cart}>
                                        <Link to={"/account"} style={{ textDecoration: 'none' }}>
                                            {data.cartAdded.count}
                                        </Link>
                                    </div>
                                } else
                                    return <div style={style.cart}>
                                        <Link to={"/account"} style={{ textDecoration: 'none' }}>
                                            {this.state.cartCount}
                                        </Link>
                                    </div>

                            }}
                        </Subscription>
                    </div>
                }
                <div id='dvLogin' style={style.login}>
                    {
                        this.props.isSignedIn ?
                            <a onClick={() => { this.logOut() }}
                                className='MuiButtonBase-root MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-textSizeSmall MuiButton-sizeSmall'>
                                <span style={style.text}>LOG OUT</span>
                            </a>
                            :
                            <Link to={"/login"}
                                className='MuiButtonBase-root MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-textSizeSmall MuiButton-sizeSmall'>
                                <span style={style.text}>LOGIN</span>
                            </Link>
                    }
                </div>
            </div >
        )
    }
    componentWillUpdate = async () => {
        if (GLOBAL.userId != '') {
            const { client } = this.props
            const res = await client.query({ query: FETCH_CART, variables: { userId: GLOBAL.userId } })
            if (res.data && res.data.carts.length != this.state.cartCount) {
                this.setState({ cartCount: res.data.carts.length })
            }
        }
        if (this.state.opacity == 1)
            this.setState({ opacity: 0 })
    }
    logOut = async () => {
        firebase.auth().signOut().then(function () { }).catch(function (error) { })
    }
}

export default withApollo(header)

const style = {
    container: {
        flex: 1,
        display: 'flex',
        displayDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    login: {
        display: 'flex',
        displayDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingRight: 10
    },
    text: {
        padding: '4px 5px',
        fontSize: '0.8125rem',
        color: 'white',
        fontFamily: 'Roboto, Helvetica',
        fontWeight: 500,
        lineHeight: 1.75,
        borderRadius: '4px',
        letterSpacing: '0.02857em',
        textTransform: 'uppercase',
        marginRight: 10
    },
    cart: {
        position: 'relative',
        right: '5px',
        top: '-13px',
        height: '20px',
        width: '20px',
        borderRadius: '50%',
        backgroundColor: '#FFCA28',
        display: 'flex',
        displayDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textCartCount: {
        color: 'white',
        fontFamily: 'Roboto, Helvetica',
        fontWeight: 500,
    }
}