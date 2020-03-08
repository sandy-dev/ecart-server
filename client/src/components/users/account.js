import React, { Component } from 'react'
import { withApollo, Query } from 'react-apollo'
import { FETCH_CART, REMOVE_CART } from '_src/components/queries/cart'
import List from '_src/components/common/list'
import GLOBAL from '_src/components/common/global'
import { Grid, Card, Typography, Divider, Paper } from '@material-ui/core'
import { Redirect } from 'react-router-dom'

export class account extends Component {
    constructor(props) {
        super(props)

        this.state = {
            cartData: []
        }
    }

    render() {

        if (!this.props.isSignedIn)
            return (<Redirect to={{ pathname: "/" }} />)

        return (
            <div style={style.conatiner}>

                <Card sm={12} elevation={0} style={style.card}>
                    <Paper sm={12} elevation={0} style={style.header}>
                        <Typography variant="h6"> Account Details</Typography>
                    </Paper>
                    <Divider style={style.divider} />


                    <Grid container style={style.contain}>
                        <Grid item sm={12}>
                            <Typography variant="button" style={style.text}> Name</Typography>
                            <Typography variant="caption" style={style.text}> Name {GLOBAL.name}</Typography>
                        </Grid>
                        <Grid item sm={12}>
                            <Typography variant="button" style={style.text}> Email</Typography>
                            <Typography variant="caption" style={style.text}> Name {GLOBAL.email}</Typography>
                        </Grid>
                    </Grid>

                    <Paper sm={12} elevation={0} style={style.header}>
                        <Typography variant="h6"> Cart Items</Typography>
                    </Paper>
                    <Divider style={style.divider} />
                    <Paper sm={12} elevation={0} style={style.header}>
                        <Query query={FETCH_CART} variables={{ userId: GLOBAL.userId }}>
                            {({ loading, error, data }) => {
                                if (loading) return <h4>Loading...</h4>
                                if (error) console.log(error)

                                if (data.carts && data.carts.length > 0)
                                    return <List listData={data.carts} onClick={(item) => { this.removeCart(item) }} source={'cart'} />
                                else
                                    return <Typography variant="caption"> No Items</Typography>

                            }}
                        </Query>
                    </Paper>
                </Card>
            </div>
        )
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

const style = {
    conatiner: {
        flex: 1,
        height: '100%',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: '5%'
    },
    card: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        width: '100%'
    },
    contain: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20
    },
    divider: {
        width: '100%'
    },
    header: {
        padding: 10
    },
    text: {
        padding: 5
    }
}
