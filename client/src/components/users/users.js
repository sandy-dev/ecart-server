import React, { Component } from 'react'
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import AddAuthor from '_src/components/authors/addAuthor'
import List from '_src/components/common/list'
import Paging from '_src/components/common/paging'

const AUTHORS_QUERY = gql`
  query authorsQuery 
    {
        authors{
            id
          name
          age
        }
    }`


export class authors extends Component {


    constructor(props) {
        super(props)

        this.state = {
            arrayRender: []
        }
    }

    render() {


        return (

            <div className='container-authors'>

                <div>

                    <div>

                        Author List

                    </div>

                    <Query query={AUTHORS_QUERY}>

                        {({ loading, error, data }) => {
                            if (loading) return <h4>Loading...</h4>
                            if (error) console.log(error)

                            return (

                                <div>
                                    <List listData={this.state.arrayRender} />
                                    <Paging array={data.authors} onClick={(data) => { this.GetPaginatedData(data) }} />
                                </div>
                            )
                        }}

                    </Query>

                </div>


                <div>

                    <div>
                        Add Author
                    </div>

                    <AddAuthor />

                </div>


            </div>
        )
    }

    GetPaginatedData(data) {
        this.setState({ arrayRender: data })
    }
}

export default authors
