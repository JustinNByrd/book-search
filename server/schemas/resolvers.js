const { User } = require('../models');

const resolvers = {
	Query: {
		getAllUsers: async () => {
			return User.find();
		},
		me: async (parent, {userId}) => {
			return User.findOne({_id: userId});
		}
	}
}

module.exports = resolvers;
