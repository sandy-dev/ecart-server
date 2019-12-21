import React from 'react'
import gql from 'graphql-tag'

const FETCH_AUTHORS = gql`
  query authorsQuery 
    {
        authors{
            id
          name
          age
        }
    }`


const ADD_AUTHOR = gql`
  mutation addAuthor( $name: String!, $age: Int!) {
    addAuthor(name: $name,age:$age) {
      id
      name
      age
    }
  }
`

export {
  FETCH_AUTHORS, ADD_AUTHOR
}