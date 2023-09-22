const Transaction = require('../models/transaction');

exports.createTransactionResolver = async (_, { input }) => {
  try {
    const newTransaction = new Transaction(input);
    await newTransaction.save();
    return newTransaction;
  } catch (err) {
    throw new Error('Failed to create a new transaction.');
  }
};

// GraphQL Resolver for Retrieving Transactions by Method Name
exports.getTransactionsByMethodNameResolver = async (_, { methodName }) => {
  try {
    const transactions = await Transaction.find({ methodCode: methodName });
    return transactions;
  } catch (err) {
    throw new Error('Failed to fetch transactions by Method Name.');
  }
};

// GraphQL Resolver for Updating a Transaction
exports.updateTransactionResolver = async (_, { id, input }) => {
  try {
    const updatedTransaction = await Transaction.findByIdAndUpdate(
      id,
      input,
      { new: true }
    );
    if (!updatedTransaction) {
      throw new Error('Transaction not found.');
    }
    return updatedTransaction;
  } catch (err) {
    throw new Error('Failed to update the transaction.');
  }
};

// GraphQL Resolver for Deleting a Transaction
exports.deleteTransactionResolver = async (_, { id }) => {
  try {
    const deletedTransaction = await Transaction.findByIdAndRemove(id);
    if (!deletedTransaction) {
      throw new Error('Transaction not found.');
    }
    return deletedTransaction;
  } catch (err) {
    throw new Error('Failed to delete the transaction.');
  }
};

// GraphQL Resolver for Listing All Transactions
exports.getAllTransactionsResolver = async () => {
  try {
    const transactions = await Transaction.find();
    return transactions;
  } catch (err) {
    throw new Error('Failed to fetch transactions.');
  }
};

// GraphQL Resolver for Calculating the Current Account Balance
exports.getAccountBalanceResolver = async () => {
  try {
    const transactions = await Transaction.find();
    const accountBalance = transactions.reduce((total, transaction) => {
      return total + transaction.amount;
    }, 0);
    return { accountBalance };
  } catch (err) {
    throw new Error('Failed to calculate account balance.');
  }
};