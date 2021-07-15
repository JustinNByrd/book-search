const {gql} = require('apollo-server-express');

const typeDefs = gql`
	type User {
		_id: ID
		username: String
		email: String
		password: String
	}

	type Auth {
		token: String
		user: User
	}

	type Query {
		me(userId: ID!): User
		getAllUsers: [User]!
		
	}

`;

module.exports = typeDefs;
