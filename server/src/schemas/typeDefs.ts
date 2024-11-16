const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    placeCount: Int
    savedPlaces: [Place!]!
  }

  type Place {
    placeId: String!
    name: String!
    createdAt: String
  }

  input UserInput {
    _id: ID
    username: String!
    email: String!
    password: String!
  }

  input PlaceInput {
    placeId: String!
    name: String!
  }
  
  type Auth {
    token: ID!
    user: User
  }

  type Query {
    user(username: String!): User
    me: User
  }

  type Mutation {
    addUser(input: UserInput!): Auth
    login(email: String!, password: String!): Auth
    savePlace(input: PlaceInput!): Place!
    removePlace(placeId: String): User!
  }
`;

export default typeDefs;