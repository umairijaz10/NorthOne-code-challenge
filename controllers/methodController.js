const Method = require('../models/method');

const createMethodResolver = async (_, { input }) => {
  try {
    const newMethod = new Method(input);
    await newMethod.save();
    return newMethod;
  } catch (err) {
    throw new Error('Failed to create a new method.');
  }
};

const getAllMethodsResolver = async () => {
  try {
    const methods = await Method.find();
    return methods;
  } catch (err) {
    throw new Error('Failed to fetch methods.');
  }
};

const getMethodCodeToNameMappingResolver = async () => {
  try {
    const methods = await Method.find();
    const codeToNameMapping = methods.reduce((mapping, method) => {
      mapping[method.code] = method.name;
      return mapping;
    }, {});
    return codeToNameMapping;
  } catch (err) {
    throw new Error('Failed to fetch method code-to-name mapping.');
  }
};

module.exports = {
  createMethodResolver,
  getAllMethodsResolver,
  getMethodCodeToNameMappingResolver,
};