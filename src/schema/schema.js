export default `


  type Book {
    id: ID!
    name: String
    pages: Int
    image: String
    price: Float
    description: String
    language: String
    publishYear: String
    category: String
    authorID: String
    averageRating: Float
    ratingCount: Float

    author: Author
    ratings:[Rating]
    AverageRating: [RatingsOrderedType]
  }

  type Author {
    id: ID!
    name: String
    age: Int,
    book: [Book]
  }

  type User {
    _id: ID!
    uid: String
    name: String
    email: String
    image: String
  }

  type Rating {
    id: ID!
    rating: Int,
    review: String
    bookId: String
    userId: String
    date: String
    book: Book
  }

  type RatingsOrderedType {
    _id: ID!
    total: Int,
    count: Int
    average: Float
  }


  type Cart {
    _id: ID!
    userId: String!
    bookId: String!
    date: String!
    book: Book
  }

  type CartReturn {
    name: String!
    date: String!
  }

  type BooksResult {
    count: Int
    Books: [Book]
  }

  type CartResult {
    count: Int
    Carts: [Cart]
  }

  type Gallery {
    _id: ID!
    userId: String!
    userName: String!
    timeStamp: String!
    date: String!
    url: String!
    title: String!
    subHeader: String!
    description: String!
  }

  type GalleryResult {
    count: Int
    GalleryItems: [Gallery]
  }
  type GalleryResultCursor {
    cursor: String
    hasMore: Boolean!
    GalleryItems: [Gallery]
  }

  type Query {
    
    book( id: String!): Book
    books( category: Int!,author: String!, sort: String! , search: String! , limit: Int!, offset :Int! ): BooksResult

    author( id: String!): Author
    authors: [Author]

    rating( id: String!): Rating
    ratings: [Rating]
    ratingsOrdered: [RatingsOrderedType]

    user( uid: String!): User
    users: [User]

    cart(userId: String!): Cart
    carts(userId: String!, limit: Int!, offset :Int!, count :Int!): CartResult

    galleryItems(title: String!, limit: Int!, offset :Int!): GalleryResult
    galleryItemsCursor(title: String!, limit: Int!, cursor :String): GalleryResultCursor
  }


  type Mutation {
    addBook(
        name: String!,
        pages: Int!,
        image: String!,
        authorID: String!,

        price: Float!,
        description: String!,
        language: String!,
        publishYear: String!,
        category: String!
    ): Book
    
    updateBook(
          id: String!,
          name: String!,
          pages: Int!,
          image: String!,
          authorID: String!,

          price: Float!,
          description: String!,
          language: String!,
          publishYear: String!,
          category: String!
    ): Book

    addCart(userId: String!,bookId: String!,date: String!): Cart
    removeCart(id: String!,userId: String!): Result
    
    addRating(rating: Int!,review: String!,bookId: String!,userId: String!,date: String!): Rating
    
    addUser(uid: String!,name: String!,email: String!,image: String!): User
    
    addAuthor(name: String!,age: Int!): Author
    removeAuthor(id: String!): Author

    addGalleryItem(userId: String!,userName:String!,timeStamp:String!,date: String!, url: String!,title: String!,subHeader: String!,description: String!): Gallery
    removeGalleryItem(id: String!): Gallery

  }

  type Result {
    count: Int
    id: String
  }

  type Subscription {
    cartAdded: Result
    ratingAdded: Result
  }

  schema {
    query: Query
    mutation: Mutation
    subscription: Subscription
  }
  `