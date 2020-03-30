import React, { Component } from 'react'
import { withApollo, graphql, Query } from 'react-apollo'
import flowright from "lodash.flowright"
import { FETCH_CART, REMOVE_CART } from '_src/components/queries/cart'
import List from '_src/components/common/list'
import Paging from '_src/components/common/pagingDatabase'
import GLOBAL from '_src/components/common/global'
import { Grid, Card, Typography, Divider, Paper, CardHeader, CardContent, Avatar } from '@material-ui/core'
import { Redirect } from 'react-router-dom'
import { red } from '@material-ui/core/colors'
import { AccountBox } from '@material-ui/icons'

const item_per_page = 4
export class account extends Component {
    constructor(props) {
        super(props)
        this.state = {
            cartData: [],
            offset: 0,
            count: -1
        }
    }
    render() {
        if (!this.props.isSignedIn)
            return (<Redirect to={{ pathname: "/" }} />)
        return (
            <div style={style.conatiner}>
                <Card elevation={0} style={style.card}>
                    <CardHeader
                        style={style.mainHeader}
                        avatar={
                            <Avatar aria-label="recipe" style={style.avatar}>
                                <AccountBox />
                            </Avatar>
                        }
                        title={GLOBAL.name}
                    />
                    <Divider style={style.divider} />
                    <CardContent style={style.contain}>
                        <Grid container spacing={0} direction='column'>
                            <Grid item sm={12}>
                                <Card elevation={0}>
                                    <CardHeader
                                        style={style.header}
                                        subheader="Account Details"
                                    />
                                    <CardContent style={style.cardContain}>
                                        <Grid container spacing={1}>
                                            <Grid item sm={12} style={style.rows}>
                                                <Typography variant="caption" noWrap={true} style={style.text}> Name  : </Typography>
                                                <Typography variant="caption" noWrap={true} style={style.text}> {GLOBAL.name}</Typography>
                                            </Grid>
                                            <Grid item sm={12} style={style.rows}>
                                                <Typography variant="caption" noWrap={true} style={style.text}> Email  :</Typography>
                                                <Typography variant="caption" noWrap={true} style={style.text}> {GLOBAL.email}</Typography>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item sm={12}>
                                <Card elevation={0} style={{ padding: 0, width: '100%' }}>
                                    <CardHeader
                                        style={style.header}
                                        subheader="Cart Items"
                                    />
                                    <CardContent style={style.cardContain}>
                                        <Query
                                            query={FETCH_CART}
                                            fetchPolicy='no-cache'
                                            variables={{
                                                userId: GLOBAL.userId,
                                                limit: item_per_page,
                                                offset: this.state.offset,
                                                count: this.state.count
                                            }}>

                                            {({ loading, error, data }) => {
                                                if (loading) return <h4>Loading...</h4>
                                                if (error) console.log(error)
                                                if ( data.carts && data.carts.count > 0) {
                                                    return (
                                                        <div style={{ width: '100%' }}>
                                                            <List listData={data.carts.Carts} onClick={(item) => { this.removeCart(item) }} source={'cart'} />
                                                            <Paging
                                                                itemCount={data.carts.count}
                                                                type='cart'
                                                                onClick={(data) => { this.GetPaginatedData(data) }} />
                                                        </div>
                                                    )
                                                }
                                                else return <Typography variant="caption"> No Items</Typography>
                                            }}
                                        </Query>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </div >
        )
    }
    removeCart = async (item) => {
        const response = await this.props
            .removeCart({
                id: item,
                userId: GLOBAL.userId,
                offset: this.state.offset
            })
            .then((res) => {
                if (res.data.removeCart.count == this.state.offset && this.state.offset > 0) {
                    this.setState({ count: res.data.removeCart.count, offset: this.state.offset - item_per_page })
                }
                else {
                    this.setState({ count: res.data.removeCart.count })
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }
    GetPaginatedData = async (index) => {
        this.setState({ offset: index * item_per_page })
    }
}
export default flowright(
    graphql(REMOVE_CART, {
        props: ({ mutate }) => ({
            removeCart: (params) => {
                return mutate({
                    variables: { id: params.id, userId: params.userId },
                })
            }
        })
    })
)(withApollo(account))

const style = {
    conatiner: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexGrow: 1,
        height: '100%',
        width: '100%',
        minHeight: '100vh',
        padding: 10
    },
    card: {
        display: 'flex',
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    mainHeader: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    header: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        width: '100%',
    },
    contain: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%',
        padding: 0
    },
    cardContain: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%',
    },
    divider: {
        width: '100%'
    },
    text: {
        paddingLeft: 5,
        paddingRight: 5
    },
    list: {
        padding: 10,
        width: '100%'
    },
    avatar: {
        backgroundColor: red[500],
    },
    rows: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    }
}
