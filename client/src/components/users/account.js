import React, { Component } from 'react'
import { withApollo, Query } from 'react-apollo'
import { FETCH_CART, REMOVE_CART } from '_src/components/queries/cart'
import List from '_src/components/common/list'
import GLOBAL from '_src/components/common/global'

export class account extends Component {


    constructor(props) {
        super(props)

        this.state = {
            cartData: []
        }
    }

    render() {

        return (

            <div className='container-account'>


                <div>

                    <span><h2>Acoount Details</h2></span>

                </div>

                <div>

                    <span> Name: {GLOBAL.name} </span>
                    <span> Email : {GLOBAL.email}</span>

                </div>

                <div>

                    <span><h2>Cart Items</h2></span>

                </div>

                <div>

                    <List listData={this.state.cartData} onClick={(item) => { this.removeCart(item) }} source={'cart'} />

                </div>


            </div>
        )
    }

    componentDidMount = async () => {

        const { client } = this.props
        const res = await client.query({ query: FETCH_CART, variables: { userId: '5dec970b1806381dbeb73f4d' } })//GLOBAL.userId 
        if (res.data) {
            this.setState({ cartData: res.data.carts })
        }
    }

    removeCart = async (item) => {

        const { client } = this.props
        const res = await client.mutate({
            mutation: REMOVE_CART,
            variables: { id: item },
            refetchQueries: [{ query: FETCH_CART, variables: { userId: '5dec970b1806381dbeb73f4d' } }]
        })

        if (res.data.removeCart != null && res.data.removeCart.count != null) {

            let data = this.state.cartData
            let dataNew = []
            data.forEach((item) => {
                if (String(item._id).includes(res.data.removeCart.count)) {
                    dataNew = data.filter(e => !String(e._id).includes(res.data.removeCart.count))
                }
            })
            this.setState({ cartData: dataNew })
        }
    }

}

export default withApollo(account)
