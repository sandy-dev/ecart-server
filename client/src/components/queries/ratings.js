import React from 'react'
import gql from 'graphql-tag'

const FETCH_RATINGS = gql`
  query ratingsQuery 
    {
        ratings{
            id
            rating
            review
            date
        }
    }`


const ADD_RATING = gql`
  mutation addRating( $rating: Int!, $review: String!, $userId: String!, $bookId: String!,$date: String!) {
    addRating(rating: $rating,review: $review,userId: $userId,bookId: $bookId,date: $date) {
      id
      rating
      review
      date
    }
  }
`

export {
  FETCH_RATINGS, ADD_RATING
}