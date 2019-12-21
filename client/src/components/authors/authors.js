import React, { Component } from 'react'
import { Query } from 'react-apollo'
import List from '_src/components/common/list'
import Paging from '_src/components/common/paging'
import Search from '@material-ui/icons/Search'
import { FETCH_AUTHORS } from '_src/components/queries/authors'

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

            <div className='container-authors-main'>

                <div>

                    <div>
                        <span><h2>Author List</h2></span>
                    </div>

                    <div>

                        <div>

                            <input value={this.state.inputText} maxLength='20' onChange={(event) => { this.validateAndSearch(event, 'name') }} />
                            <Search />

                        </div>

                        <Query query={FETCH_AUTHORS}>

                            {({ loading, error, data }) => {
                                if (loading) return <h4>Loading...</h4>
                                if (error) console.log(error)


                                console.log(data)

                                return (

                                    <div>
                                        <List listData={this.state.arrayRender} source={'author'} />
                                        <Paging array={data.authors} searchText={this.state.inputText} onClick={(data) => { this.GetPaginatedData(data) }} />
                                    </div>
                                )
                            }}

                        </Query>

                    </div>

                </div>

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
}

export default authors
