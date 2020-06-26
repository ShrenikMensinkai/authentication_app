const graphql = require('graphql');
const httperror = require('http-errors');
const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;
const { GetUser } = require("../actions/user/get_users_by_id");
const { ActionManager } = require('../actions/action_manager');
const UserType = new GraphQLObjectType({
    name: 'User',
    fields: ( ) => ({
        name: { type: GraphQLString },
        phoneNo: { type: GraphQLString },
        email: { type: GraphQLString }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: UserType,
            args: { id: { type: GraphQLString } },
            resolve(parent, args){
                let action = new GetUser(args.id);
                return ActionManager.execute(action);
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});