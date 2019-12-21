import React, { Component, useState } from 'react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'


const USERS_QUERY = gql`
  query usersQuery 
    {
        users{
            id
          name
          age
        }
    }`

const ADD_AUTHOR = gql`
  mutation addUser( $name: String!, $age: Int!) {
    addUser(name: $name,age:$age) {
        id
      name
      age
    }
  }
`

function AddUser() {

    const [addUser, { data }] = useMutation(ADD_AUTHOR)

    const [_age, setAge] = useState('')
    const [_name, setName] = useState('')

    return (

        <div className='container-author-add'>

            <form
                onSubmit={e => {
                    e.preventDefault()
                    addUser({
                        variables: { name: _name, age: parseInt(_age) },
                        refetchQueries: [{ query: USERS_QUERY }]
                    })

                    setName('')
                    setAge('')

                }}>


                <input value={_name} placeholder='name' maxLength='10' onChange={(event) => {
                    /^[a-zA-Z]+$/.test(event.target.value) ? setName(event.target.value) : ''
                }} />

                <br />

                <input value={_age} placeholder='age' maxLength='2' onChange={(event) => {
                    /^[0-9]*$/.test(event.target.value) ? setAge(event.target.value) : ''
                }} />

                <button type="submit">Add User</button>

            </form>

        </div>
    )
}

function setInputText(event, type) {

    switch (type) {
        case 'name':

            break

        case 'age':

            if (/^[0-9]*$/.test(event.target.value))
                setAge(event.target.value)

            break

        default: break;
    }
}

export default AddUser
