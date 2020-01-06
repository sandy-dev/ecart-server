import React from 'react'
import gql from 'graphql-tag'

const GET_USER = gql`
  query user($uid: String!) {
    user(uid: $uid) {
      uid
      name
      email
      image
    }
  }
`

const ADD_USER = gql`
    mutation addUser($uid: String! $name: String!, $email: String!, $image: String!) {
        addUser(uid:$uid, name: $name, email:$email,  image:$image) {
            uid
            name
            email
            image
      }
    }
  `

export {
  GET_USER, ADD_USER
}