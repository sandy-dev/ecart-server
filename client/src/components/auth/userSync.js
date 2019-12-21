import React, { Component, useState, useEffect } from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import { useLazyQuery, useMutation } from '@apollo/react-hooks'
import GLOBAL from '_src/components/common/global'

const GET_USER = gql`
  query user($uid: String!) {
    user(uid: $uid) {
      id
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
            id
            uid
            name
            email
            image
      }
    }
  `


const UserSync = () => {

  const [_user, setUser] = useState(null)
  const [getUser, { loading, data }] = useLazyQuery(GET_USER)

  useEffect(() => {
    //getUser({ variables: { uid: '5dec8856afcd9e1c6b71b476' } }) 
  }, [])

  if (loading) { }

  if (data) {
    
    
    if (data.user == null) {
      return <UserAdd />
    }
    else {
      GLOBAL.userId = data.user.id
      GLOBAL.name = data.user.name
      GLOBAL.email = data.user.email
    }
  }

  return null
}

const UserAdd = () => {

  const [addUser, { loading, data }] = useMutation(ADD_USER)

  if (loading) { }
  if (data) { }

  useEffect(() => {
    //addUser({ variables: { uid: '5dec8856afcd9e1c6b71b476', name: 'subhash', email: 'subhash@email.com', image: '' } })
  }, [])

  return null
}

export default UserSync

