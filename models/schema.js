const { GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLList, GraphQLNonNull, GraphQLFloat, GraphQLScalarType } = require('graphql');
const Transaction = require('./transaction');
const Method = require('./method');

const GraphQLDate = new GraphQLScalarType({
  name: 'Date',
  description: 'Custom Date scalar type',
  parseValue(value) {
    return new Date(value);
  },
  serialize(value) {
    return value.toISOString();
  },
});

const TransactionType = new GraphQLObjectType({
  name: 'Transaction',
  fields: () => ({
    id: { type: GraphQLString },
    date: { type: GraphQLDate },
    amount: { type: GraphQLFloat },
    status: { type: GraphQLString },
    counterpartyName: { type: GraphQLString },
    methodCode: { type: GraphQLString },
    note: { type: GraphQLString },
  }),
});

const MethodType = new GraphQLObjectType({
  name: 'Method',
  fields: () => ({
    code: { type: GraphQLString },
    name: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    getTransactionById: {
      type: TransactionType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        return Transaction.findById(args.id);
      },
    },
    getTransactions: {
      type: new GraphQLList(TransactionType),
      resolve() {
        return Transaction.find({});
      },
    },
    getAllMethods: {
      type: new GraphQLList(MethodType),
      resolve() {
        return Method.find({});
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createTransaction: {
      type: TransactionType,
      args: {
        date: { type: new GraphQLNonNull(GraphQLDate) },
        amount: { type: new GraphQLNonNull(GraphQLFloat) },
        status: { type: new GraphQLNonNull(GraphQLString) },
        counterpartyName: { type: new GraphQLNonNull(GraphQLString) },
        methodCode: { type: new GraphQLNonNull(GraphQLString) },
        note: { type: GraphQLString },
      },
      resolve(parent, args) {
        const transaction = new Transaction({
          date: args.date,
          amount: args.amount,
          status: args.status,
          counterpartyName: args.counterpartyName,
          methodCode: args.methodCode,
          note: args.note,
        });
        return transaction.save();
      },
    },
    createMethod: {
      type: MethodType,
      args: {
        code: { type: new GraphQLNonNull(GraphQLString) },
        name: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        const method = new Method({
          code: args.code,
          name: args.name,
        });
        return method.save();
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
