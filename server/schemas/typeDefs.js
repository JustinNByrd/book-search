const {gql} = require('apollo-server-express');

const typeDefs = gql`
	type User {
		_id: ID
		username: String
		email: String
		password: String
		savedBooks: [Book]
	}

	type Book {
		bookId: ID!
		authors: [String]
		description: String
		title: String
		image: String
		link: String
	}

	type Auth {
		token: String
		user: User
	}

	type Query {
		me: User
		getAllUsers: [User]!
	}

	input saveBookInput {
		authors: [String]
		description: String
		title: String
		bookId: String
		image: String
		link: String
	}

	type Mutation {
		removeBook(bookId: ID!): User
		saveBook(bookData: saveBookInput!): User
		addUser(username: String!, email: String!, password: String!): Auth
		login(email: String!, password: String!): Auth
	}
`;

module.exports = typeDefs;