require('dotenv').config();
const { Pool } = require('pg');
const databaseName = process.env.DB_NAME;
const userName = process.env.DB_USER;
const userPassword = process.env.DB_PASSWORD;
const host = process.env.DB_HOST;
const port = process.env.DB_PORT;

class Db {
  constructor() {
    if (Db.instance) return Db.instance;
    this.connection = null;
    Db.instance = this;
  }

  async connect() {
    try {
      const pool = new Pool({
        user: userName,
        host: host,
        database: databaseName,
        password: userPassword,
        port: port,
      });
      await pool.connect();
      this.connection = pool;
    } catch (err) {
      console.error("Couldn't connec to t database");
      throw err;
    }
  }

  getConnection() {
    return this.connection;
  }

  static async getInstance() {
    if (!Db.instance) {
      Db.instance = new Db();
      await Db.instance.connect();
    }
    return Db.instance;
  }
}

module.exports = Db;
