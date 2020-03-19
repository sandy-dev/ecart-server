import React, { Component } from 'react'
import { Query, withApollo } from 'react-apollo'
import List from '_src/components/common/list'
import Paging from '_src/components/common/paging'
import Search from '@material-ui/icons/Search'
import { FETCH_AUTHORS, REMOVE_AUTHOR } from '_src/components/queries/authors'
import { Grid, Card, Typography, Button, Divider, Paper, CardHeader, CardContent } from '@material-ui/core'

export class authors extends Component {
    constructor(props) {
        super(props)
        this.state = {
            arrayRender: [],
            inputText: ''
        }
    }

    render() {
        return (
            <div style={style.conatiner}>
                <Card elevation={0} style={style.card}>
                    <CardHeader
                        style={style.header}
                        subheader="Author List"
                    />
                    <Divider style={style.divider} />
                    <CardContent style={style.cardContain}>
                        <Query query={FETCH_AUTHORS}>
                            {({ loading, error, data }) => {
                                if (loading) return <h4>Loading...</h4>
                                if (error) console.log(error)
                                return (
                                    <Paper elevation={0} style={{ width: '100%', padding: '10%' }}>
                                        <List listData={this.state.arrayRender} source={'author'} onRemoveClick={(item) => { this.removeAuthor(item) }} />
                                        <Paging array={data.authors} searchText={this.state.inputText} onClick={(data) => { this.GetPaginatedData(data) }} />
                                    </Paper>
                                )
                            }}
                        </Query>
                    </CardContent>
                </Card>
                {/* 

                <Paper sm={12} elevation={0} style={style.header}>
                    <Typography variant="h6"> Author List</Typography>
                </Paper>
                <Query query={FETCH_AUTHORS}>
                    {({ loading, error, data }) => {
                        if (loading) return <h4>Loading...</h4>
                        if (error) console.log(error)
                        return (
                            <Paper elevation={0} style={{ width: '100%', padding: '10%' }}>
                                <List listData={this.state.arrayRender} source={'author'} onRemoveClick={(item) => { this.removeAuthor(item) }} />
                                <Paging array={data.authors} searchText={this.state.inputText} onClick={(data) => { this.GetPaginatedData(data) }} />
                            </Paper>
                        )
                    }}
                </Query> */}
            </div>
        )
    }

    GetPaginatedData(data) {
        this.setState({ arrayRender: data })
    }
    validateAndSearch(event, type) {

        let PatterText = /^[a-zA-Z0-9]+$/ //  /^[a-zA-Z]+$/

        if (event.target.value != '' && !PatterText.test(event.target.value))
            return

        switch (type) {

            case 'name':
                this.setState({ inputText: event.target.value })
                break

            default: break;
        }
    }
    removeAuthor = async (item) => {

        const { client } = this.props
        const res = await client.mutate({
            mutation: REMOVE_AUTHOR,
            variables: { id: item },
            refetchQueries: [{ query: FETCH_AUTHORS }]
        })
    }
}

export default withApollo(authors)
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
        width: '90%',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    header: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        width: '100%',
    },
    cardContain: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%',
    },
    center: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    divider: {
        width: '100%'
    },
}