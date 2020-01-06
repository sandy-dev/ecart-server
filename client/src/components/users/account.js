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

                    <div style={{ flexDirection: 'row', width: '50vw', justifyContent: 'flex-start', marginBottom: '2vh' }}>
                        <span style={{ width: '5vw', textAlign: 'center', fontWeight: 'bold' }}> Name: </span>
                        <span> {GLOBAL.name} </span>
                    </div>
                    <div style={{ flexDirection: 'row', width: '50vw', justifyContent: 'flex-start' }}>
                        <span style={{ width: '5vw', textAlign: 'center', fontWeight: 'bold' }}> Email: </span>
                        <span> {GLOBAL.email} </span>
                    </div>

                </div>

                <div>

                    <span><h2>Cart Items</h2></span>

                </div>

                <div>

                    {
                        this.state.cartData.length > 0 &&
                        <List listData={this.state.cartData} onClick={(item) => { this.removeCart(item) }} source={'cart'} />
                    }

                    {
                        this.state.cartData.length == 0 &&
                        <span> No items</span>
                    }


                </div>


            </div>
        )
    }

    componentDidMount = async () => {

        console.log(GLOBAL.userId)

        const { client } = this.props
        const res = await client.query({ query: FETCH_CART, variables: { userId: GLOBAL.userId } })

        if (res.data) {
            this.setState({ cartData: res.data.carts })
        }
    }

    removeCart = async (item) => {

        const { client } = this.props
        const res = await client.mutate({
            mutation: REMOVE_CART,
            variables: { id: item, userId: GLOBAL.userId },
            refetchQueries: [{ query: FETCH_CART, variables: { userId: GLOBAL.userId } }]
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
