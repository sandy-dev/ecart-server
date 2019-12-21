import React from 'react'
import gql from 'graphql-tag'

const FETCH_CART = gql`
  query cartQuery ( $userId: String!){
    cart(userId:$userId){
      userId
      bookId
    }
  }`


const ADD_CART = gql`
  mutation addCart( $userId: String!, $bookId: String!) {
    addCart(userId: $userId,bookId: $bookId) {
      userId
      bookId
    }
  }
`

export {
  FETCH_CART, ADD_CART
}