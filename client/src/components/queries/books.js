import gql from 'graphql-tag'

const FETCH_BOOKS = gql`
  query booksQuery 
    {
        books{
            id
            name
            pages
            price
            image
            publishYear
          category
            author{
              id
              name
            }
            ratings{
              id
              review
              rating
              date
              userId
            }
            AverageRating{
              average
            }
          }
    }`


const FETCH_BOOK_ID = gql`
  query bookQuery ( $id: String!){

      book(id:$id){
          id
          name
          pages
          image
          authorID
          price
          description
          language
          publishYear
          category
          author{
            id
            name
          }
          ratings{
            review
            date
            userId
          }
        }
    }`


const ADD_BOOK = gql`
    mutation addBook( $name: String!, $pages: Int!, $image: String!, $authorID: String!
      , $price: Float!, $description: String!, $language: String!
      , $publishYear: String!, $category: String!
      ) {
      addBook(name: $name, pages:$pages,  image:$image, authorID:$authorID
        price:$price, description:$description, language:$language, 
        publishYear:$publishYear,category:$category
        ) {
          id
        name
        pages
        authorID
        image
        
        price
        description
        language
        publishYear
        category
      }
    }
  `

const UPDATE_BOOK = gql`
    mutation updateBook($id: String!, $name: String!, $pages: Int!, $image: String!, $authorID: String!
      , $price: Float!, $description: String!, $language: String!
      , $publishYear: String!, $category: String!
      ) {
        updateBook(id: $id, name: $name, pages:$pages,  image:$image, authorID:$authorID
        price:$price, description:$description, language:$language, 
        publishYear:$publishYear,category:$category
        ) {
          id
        name
        pages
        authorID
        image
        
        price
        description
        language
        publishYear
        category
      }
    }
  `

export {
  FETCH_BOOKS, ADD_BOOK, FETCH_BOOK_ID, UPDATE_BOOK
}