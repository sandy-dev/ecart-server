import React, { Component, useState, useEffect } from 'react'
import { withApollo, Query } from 'react-apollo'
import GLOBAL from '_src/components/common/global'
import { GET_USER, ADD_USER } from '_src/components/queries/users'

const UserSync = (props) => {

  if (props.user && props.user.uid) {
    GLOBAL.userId = props.user.uid  //5dec970b1806381dbeb73f4d
    GLOBAL.name = props.user.name
    GLOBAL.email = props.user.email
    getUser(props)
  }

  return null
}

async function getUser(props) {

  const { client } = props
  const res = await client.query({ query: GET_USER, variables: { uid: GLOBAL.userId } })
  if (res.data) {

    if (res.data.user == null) {
      const res = await client.mutate({
        mutation: ADD_USER,
        variables: { uid: GLOBAL.userId, name: GLOBAL.name, email: GLOBAL.email, image: '' }
      })
    }

  }
}

export default withApollo(UserSync)

