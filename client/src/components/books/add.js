import React, { Component } from 'react'
import { graphql, Query, compose, withApollo } from 'react-apollo'
import FileUpload from '_src/components/common/FileUpload'
import { FETCH_BOOKS, ADD_BOOK, FETCH_BOOK_ID, UPDATE_BOOK } from '_src/components/queries/books'
import { FETCH_AUTHORS } from '_src/components/queries/authors'
import Category from '_src/config/category.json'

const Categories = Category[0]['category']

class AddClass extends Component {

    constructor(props) {
        super(props)

        this.state = {

            _bookId: 0,

            _name: '',
            _pages: '',
            _author: '',
            _image: '',

            _category: '',
            _price: '',
            _language: '',
            _description: '',
            _publishYear: '',


            _nameError: '',
            _pageError: '',
            _authorError: '',

            isEdit: false
        }
    }

    render() {

        return (
            <div className='container-authors-main'>

                <div>

                    <div>
                        <h2>Add Book</h2>
                    </div>

                    <div>

                        <div>
                        </div>

                        <div>

                            name
                            <input value={this.state._name || ''} className={this.state._nameError ? 'inputError' : null} placeholder='name' maxLength='30' onChange={(event) => { this.setInputText(event, 'name') }} />

                            <br />
                            pages
                            <input value={this.state._pages || ''} className={this.state._pageError ? 'inputError' : null} placeholder='pages' maxLength='4' onChange={(event) => { this.setInputText(event, 'pages') }} />

                            <br />
                            price
                            <input value={this.state._price || ''} placeholder='price' maxLength='4' onChange={(event) => { this.setInputText(event, 'price') }} />

                            <br />
                            description
                            <input type='textarea' style={{ height: '100px' }} value={this.state._description || ''} placeholder='description' maxLength='1000' onChange={(event) => { this.setInputText(event, 'description') }} />

                            <br />
                            language
                            <input value={this.state._language || ''} placeholder='language' maxLength='10' onChange={(event) => { this.setInputText(event, 'language') }} />

                            <br />
                            publish year
                            <input value={this.state._publishYear || ''} placeholder='publish year' maxLength='12' onChange={(event) => { this.setInputText(event, 'pubyear') }} />

                            <br />
                            category
                            <select value={this.state._category || ''} onChange={(e) => { this.handleSelectChange(e, 'category') }}>

                                <option value={0}>select category</option>
                                {
                                    Categories.map((item, index) => {
                                        return (<option key={index} value={item.id}>{item.name}</option>)
                                    })
                                }
                            </select>

                            <br />
                            aauthor
                            <Query query={FETCH_AUTHORS}>

                                {({ loading, error, data }) => {
                                    if (loading) return <h4>Loading...</h4>
                                    if (error) console.log(error)


                                    return (

                                        <select className={this.state._authorError ? 'inputError' : null} value={this.state._author || ''}
                                            onChange={(e) => { this.handleSelectChange(e, 'author') }}>

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


                            <FileUpload onClick={(val) => { this.setState({ _image: val }) }} />

                            <button id='btnSubmit' type="submit" onClick={() => { this.submitBook() }}>Add Book</button>

                        </div>

                    </div>

                </div>

            </div>
        )
    }

    componentDidMount = async () => {

        const { client } = this.props

        if (this.props.location.id != null && this.props.location.id != undefined) {

            let res = await client.query({ query: FETCH_BOOK_ID, variables: { id: this.props.location.id.toString() } })

            if (res.data && res.data.book) {

                const data = res.data.book

                this.setState({

                    _bookId: this.props.location.id.toString(),
                    _name: data.name,
                    _pages: data.pages,
                    _author: data.authorID,
                    _image: data.image,

                    _price: data.price,
                    _language: data.language,
                    _description: data.description,
                    _publishYear: data.publishYear,
                    _category: data.category,

                    isEdit: true

                })
            }
        }
    }

    setInputText(event, type) {

        //let PatterText = /^[a-zA-Z0-9]+$/ //  /^[a-zA-Z]+$/
        let PatterText = /^[\w\s]+$/
        let PatterNumber = /^[0-9]*$/

        switch (type) {
            case 'name':
                PatterText.test(event.target.value) || event.target.value == '' ? this.setState({ _name: event.target.value }) : ''
                this.state._nameError ? this.setState({ _nameError: false }) : null
                break

            case 'pages':
                PatterNumber.test(event.target.value) ? this.setState({ _pages: event.target.value }) : ''
                this.state._pageError ? this.setState({ _pageError: false }) : null
                break


            case 'price':
                PatterNumber.test(event.target.value) ? this.setState({ _price: event.target.value }) : ''
                break

            case 'description':
                this.setState({ _description: event.target.value })
                break

            case 'language':
                this.setState({ _language: event.target.value })
                break

            case 'pubyear':
                this.setState({ _publishYear: event.target.value })
                break


            default: break;
        }
    }

    handleSelectChange(event, type) {

        switch (type) {

            case 'author':
                this.setState({ _author: event.target.value })
                this.state._authorError ? this.setState({ _authorError: false }) : null
                break

            case 'category':
                this.setState({ _category: event.target.value })
                break

            default: break
        }


    }

    validateInput() {

        if (this.state._name == '' || this.state._pages == '' || this.state._author == 0) {

            this.state._name == '' ? this.setState({ _nameError: true }) : null
            this.state._pages == '' ? this.setState({ _pageError: true }) : null
            this.state._author == 0 ? this.setState({ _authorError: true }) : null

            return false
        } else {
            return true
        }

    }

    async runQuery(_query, _variable) {
        const { client } = this.props
        const res = await client.mutate({ mutation: _query, variables: _variable })
    }

    async submitBook() {

        if (this.validateInput()) {

            if (this.state.isEdit) {
                const varaiable = {
                    id: this.state._bookId,
                    name: this.state._name,
                    pages: parseInt(this.state._pages),
                    authorID: this.state._author,
                    image: this.state._image,
                    price: parseInt(this.state._price),
                    language: this.state._language,
                    description: this.state._description,
                    publishYear: this.state._publishYear,
                    category: this.state._category,
                }
                this.runQuery(UPDATE_BOOK, varaiable)
            }
            else {
                const varaiable = {
                    name: this.state._name,
                    pages: parseInt(this.state._pages),
                    authorID: this.state._author,
                    image: this.state._image,
                    price: parseInt(this.state._price),
                    language: this.state._language,
                    description: this.state._description,
                    publishYear: this.state._publishYear,
                    category: this.state._category,
                }
                this.runQuery(ADD_BOOK, varaiable)
            }

            // this.props.addBookMutation({
            //     variables: {
            //         name: this.state._name,
            //         pages: parseInt(this.state._pages),
            //         image: this.state._image,
            //         authorID: this.state._author,

            //         price: parseInt(this.state._price),
            //         description: this.state._description,
            //         language: this.state._language,
            //         publishYear: this.state._publishYear,
            //         category: this.state._category
            //     },
            //     // refetchQueries: [{ query: FETCH_BOOKS }]
            // })
        }
    }
}

export default withApollo(AddClass)
//graphql(ADD_BOOK, { name: "addBookMutation" })
