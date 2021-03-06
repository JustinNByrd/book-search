const { User } = require('../models');
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
	Query: {
		getAllUsers: async () => {
			return User.find();
		},
		me: async (parent, args, context) => {
			if (context.user) {
				const userData = await User.findOne({ _id: context.user._id });
				return userData;
			}
		}
	},

	Mutation: {
		addUser: async (parent, args) => {
			try {
				const user = await User.create(args);
				const token = signToken(user);
				return { token, user };
			} catch (err) {
				console.log(err);
			}
		},

		login: async (parent, { email, password }) => {
			const user = await User.findOne({ email });
			if (!user) throw new AuthenticationError('Incorrect email');
			const passwordCheck = await user.isCorrectPassword(password);
			if (!passwordCheck) throw new AuthenticationError('Incorrect password');

			// if it gets here, the login credentials matched
			const token = signToken(user);
			return { token, user };
		},

		saveBook: async (parent, { bookData }, context) => {
			if (!context.user)
				throw new AuthenticationError('No Token');
			if (context.user) {
				const updatedUser = await User.findByIdAndUpdate(
					{ _id: context.user._id },
					{ $addToSet: { savedBooks: bookData }},
					{ new: true }
				);
				return updatedUser;
			}
		},

		removeBook: async (parent, { bookId }, context) => {
			if (context.user) {
				const updatedUser = await User.findOneAndUpdate(
					{ _id: context.user._id },
					{ $pull: { savedBooks: { bookId }}},
					{ new: true}
				);
				return updatedUser;
			}
		}
	}
}

module.exports = resolvers;
