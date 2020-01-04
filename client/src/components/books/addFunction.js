import React, { Component, useState } from 'react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import FileUpload from '_src/components/common/fileUpload'
import { QUERY_BOOKS, ADD_BOOK } from '_src/components/queries/books'
import { FETCH_AUTHORS } from '_src/components/queries/authors'
import { Query } from 'react-apollo'

const AddBook = () => {

    const [addBook, { data }] = useMutation(ADD_BOOK)
    const [_name, setName] = useState('')
    const [_pages, setPages] = useState('')
    const [_author, setAuthor] = useState(0)
    const [_image, setImage] = useState('')

    const [_nameError, setNameError] = useState(false)
    const [_pageError, setPageError] = useState(false)
    const [_authorError, setAuthorError] = useState(false)


    const setInputText = (event, type) => {

        let PatterText = /^[a-zA-Z0-9]+$/ //  /^[a-zA-Z]+$/
        let PatterNumber = /^[0-9]*$/

        switch (type) {
            case 'name':
                PatterText.test(event.target.value) ? setName(event.target.value) : ''
                _nameError ? setNameError(false) : null
                break

            case 'pages':
                PatterNumber.test(event.target.value) ? setPages(event.target.value) : ''
                _pageError ? setPageError(false) : null
                break

            default: break;
        }
    }

    const handleSelectChange = (event) => {
        setAuthor(event.target.value)
        _authorError ? setAuthorError(false) : null
    }

    const validateInput = () => {

        if (_name == '' || _pages == '' || _author == 0) {

            _name == '' ? setNameError(true) : null
            _pages == '' ? setPageError(true) : null
            _author == 0 ? setAuthorError(true) : null


            return false
        } else {
            return true
        }

    }

    return (

        <div className='container-authors-main'>

            <div>
                <div>
                    <h2>Add Book</h2>
                </div>

                <div>

                    <div>
                    </div>

                    <form
                        onSubmit={e => {

                            e.preventDefault()
                            if (!validateInput())
                                return false



                            addBook({
                                variables: { name: _name, pages: parseInt(_pages), image: _image, authorID: _author },
                                refetchQueries: [{ query: QUERY_BOOKS }]
                            })

                            setName('')
                            setPages('')
                            setAuthor('')
                            setImage('')

                        }}>


                        <input value={_name} className={_nameError ? 'inputError' : null} placeholder='name' maxLength='10' onChange={(event) => { setInputText(event, 'name') }} />

                        <br />

                        <input value={_pages} className={_pageError ? 'inputError' : null} placeholder='pages' maxLength='4' onChange={(event) => { setInputText(event, 'pages') }} />

                        <br />


                        <Query query={FETCH_AUTHORS}>

                            {({ loading, error, data }) => {
                                if (loading) return <h4>Loading...</h4>
                                if (error) console.log(error)


                                return (
                                    <select className={_authorError ? 'inputError' : null} value={_author} onChange={handleSelectChange}>

                                        <option value={0}>select author</option>
                                        {
                                            data.authors.map((item, index) => {
                                                return (<option key={index} value={item.id}>{item.name}</option>)
                                            })
                                        }

                                    </select>
                                )
                            }}

                        </Query>

                        <FileUpload onClick={(val) => { setImage(val) }} />

                        <button id='btnSubmit' type="submit">Add Book</button>

                    </form>

                </div>
            </div>

        </div>
    )
}

export default AddBook
