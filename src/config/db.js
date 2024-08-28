require('dotenv').config();
const knex = require('knex');
const databaseClient = { pg: 'pg' };

const getConfig = (dbClient) => {
  const databaseName = process.env.DB_NAME;
  const userName = process.env.DB_USER;
  const userPassword = process.env.DB_PASSWORD;
  const host = process.env.DB_HOST;
  const port = process.env.DB_PORT;
  const client = databaseClient[dbClient];

  if (!databaseName) throw new Error('databaseName not found');
  if (!userName) throw new Error('userName not found');
  if (!userPassword) throw new Error('userPassword not found');
  if (!host) throw new Error('database address not found');
  if (!port) throw new Error('database port number not found');
  if (!client) throw new Error('database client not provided');

  return {
    databaseName,
    userName,
    userPassword,
    host,
    port,
    client,
  };
};

const createKnexHandler = (config) => {
  return knex({
    client: config.client,
    connection: {
      user: config.userName,
      host: config.host,
      database: config.databaseName,
      password: config.userPassword,
      port: config.port,
    },
  });
};

const returnDbInstance = async () => {
  try {
    const config = getConfig(databaseClient.pg);
    const knexInstance = createKnexHandler(config);
    return await knexInstance;
  } catch (error) {
    console.error('Failed to create database instance');
    throw error;
  }
};

const Db = (() => {
  let instance;

  const getInstance = async () => {
    if (!instance) {
      instance = await returnDbInstance();
    }
    return instance;
  };

  return { getInstance };
})();

module.exports = Db;
