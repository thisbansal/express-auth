require('dotenv').config();
const { Pool } = require('pg');

// TODO: change pool implementation to Knex JS
const getConfig = () => {
  const databaseName = process.env.DB_NAME;
  const userName = process.env.DB_USER;
  const userPassword = process.env.DB_PASSWORD;
  const host = process.env.DB_HOST;
  const port = process.env.DB_PORT;

  if (!databaseName) throw new Error('databaseName not found');
  if (!userName) throw new Error('userName not found');
  if (!userPassword) throw new Error('userPassword not found');
  if (!host) throw new Error('database address not found');
  if (!port) throw new Error('database port number not found');

  return {
    databaseName,
    userName,
    userPassword,
    host,
    port,
  };
};

const createPool = (config) => {
  return new Pool({
    user: config.userName,
    host: config.host,
    database: config.databaseName,
    password: config.userPassword,
    port: config.port,
  });
};

const connectToDatabase = async (pool) => {
  try {
    await pool.connect();
    return pool;
  } catch (error) {
    console.error("Couldn't create database instance: ", error);
    throw error;
  }
};

const createDb = async () => {
  try {
    const config = getConfig();
    const pool = createPool(config);
    return await connectToDatabase(pool);
  } catch (error) {
    console.error('Failed to create database instance');
    throw error;
  }
};

const Db = (() => {
  let instance;

  const getInstance = async () => {
    if (!instance) {
      instance = await createDb();
    }
    return instance;
  };

  return { getInstance };
})();

module.exports = Db;
