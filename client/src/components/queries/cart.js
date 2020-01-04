import React from 'react'
import gql from 'graphql-tag'

const FETCH_CART = gql`
  query cartQuery ( $userId: String!){
    carts(userId:$userId){
      _id
      userId
      bookId
      date
      book{
        name
        price
      }
    }
  }`


const ADD_CART = gql`
  mutation addCart( $userId: String!, $bookId: String!, $date: String!) {
    addCart(userId: $userId,bookId: $bookId,date: $date) {
      userId
      bookId
      date
    }
  }
`

const REMOVE_CART = gql`
  mutation removeCart( $id: String!) {
    removeCart(id: $id) {
      count
    }
  }
`

export {
  FETCH_CART, ADD_CART, REMOVE_CART
}