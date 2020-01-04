import React, { Component, useState, useEffect } from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import { useMutation } from '@apollo/react-hooks'
import FileUpload from '_src/components/common/fileUpload'
import { FETCH_AUTHORS, ADD_AUTHOR } from '_src/components/queries/authors'

const AddAuthor = () => {

    const [addAuthor, { data }] = useMutation(ADD_AUTHOR)
    const [_name, setName] = useState('')
    const [_age, setAge] = useState('')
    const [_image, setImage] = useState('')
    const [isSubmit, setSubmit] = useState(false)

    const [_nameError, setNameError] = useState(false)
    const [_ageError, setAgeError] = useState(false)

    const setInputText = (event, type) => {

        let PatterText = /^[\w\s]+$/
        let PatterNumber = /^[0-9]*$/

        switch (type) {
            case 'name':
                PatterText.test(event.target.value) ? setName(event.target.value) : ''
                _nameError ? setNameError(false) : null
                break

            case 'age':
                PatterNumber.test(event.target.value) ? setAge(event.target.value) : ''
                _ageError ? setAgeError(false) : null
                break

            default: break;
        }
    }

    const validateInput = () => {

        if (_name == '' || _age == '') {

            _name == '' ? setNameError(true) : null
            _age == '' ? setAgeError(true) : null

            return false
        } else {
            return true
        }

    }

    const submitAuthor = () => {
        return <Add name={_name} age={_age} mutateQuery={ADD_AUTHOR} fetchQuery={FETCH_AUTHORS} />
    }

    return (

        <div className='container-authors-main'>


            {isSubmit && submitAuthor()}

            <div>

                <div>
                    <h2>Add Author</h2>
                </div>

                <div>

                    <div>
                    </div>

                    <div>

                        <input value={_name} className={_nameError ? 'inputError' : null} placeholder='name' maxLength='30' onChange={(event) => { setInputText(event, 'name') }} />

                        <br />

                        <input value={_age} className={_ageError ? 'inputError' : null} placeholder='age' maxLength='4' onChange={(event) => { setInputText(event, 'age') }} />

                        <br />

                        <button id='btnSubmit' type="submit" onClick={() => { setSubmit(true) }}>Add Author</button>


                    </div>

                </div>

            </div>

        </div>
    )
}

const Add = (props) => {

    const [method, { loading, data }] = useMutation(props.mutateQuery)
    if (loading) { }
    if (data) { }

    useEffect(() => {
        method({
            variables: { name: props.name, age: parseInt(props.age) },
            refetchQueries: [{ query: props.fetchQuery }]
        })
    }, [])

    return null
}



export default AddAuthor

