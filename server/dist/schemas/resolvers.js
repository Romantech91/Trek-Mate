import User from '../models/User.js';
import { signToken, AuthenticationError } from '../utils/auth.js';
const resolvers = {
    Query: {
        user: async (_parent, { username }) => {
            return User.findOne({ username }).populate('savedBooks');
        },
        // Query to get the authenticated user's information
        // The 'me' query relies on the context to check if the user is authenticated
        me: async (_parent, _args, context) => {
            // If the user is authenticated, find and return the user's information along with their books
            // console.log(context);
            if (context.user) {
                return User.findOne({ _id: context.user._id }).populate('savedBooks');
            }
            // If the user is not authenticated, throw an AuthenticationError
            throw new AuthenticationError('Could not authenticate user.');
        },
    },
    Mutation: {
        addUser: async (_parent, { input }) => {
            // Create a new user with the provided username, email, and password
            const { username, email, password } = input;
            const user = await User.create({ username, email, password });
            // Sign a token with the user's information
            const token = signToken(user.username, user.email, user._id);
            // Return the token and the user
            return { token, user };
        },
        login: async (_parent, { email, password }) => {
            // Find a user with the provided email
            const user = await User.findOne({ email });
            // If no user is found, throw an AuthenticationError
            if (!user) {
                throw new AuthenticationError('Could not authenticate user.');
            }
            // Check if the provided password is correct
            const correctPw = await user.isCorrectPassword(password);
            // If the password is incorrect, throw an AuthenticationError
            if (!correctPw) {
                throw new AuthenticationError('Could not authenticate user.');
            }
            // Sign a token with the user's information
            const token = signToken(user.username, user.email, user._id);
            // Return the token and the user
            return { token, user };
        },
        saveBook: async (_parent, { input }, context) => {
            if (context.user) {
                return User.findOneAndUpdate({ _id: context.user._id }, {
                    $addToSet: {
                        savedBooks: { ...input },
                    },
                }, {
                    new: true,
                    runValidators: true,
                });
            }
            throw AuthenticationError;
            ('You need to be logged in!');
        },
        removeBook: async (_parent, { bookId }, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate({ _id: context.user._id }, { $pull: { savedBooks: { bookId: bookId } } }, { new: true });
                // console.log(updatedUser);
                return updatedUser;
            }
            throw AuthenticationError;
        },
    },
};
export default resolvers;