import type { Knex } from "knex";
import knex from "knex";

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./db.sqlite3",
    },
    useNullAsDefault: true,
  },
  staging: {
    client: "sqlite3",
    connection: {
      filename: "./db.sqlite3",
    },
    useNullAsDefault: true,
  },
  production: {
    client: "sqlite3",
    connection: {
      filename: "./db.sqlite3",
    },
    useNullAsDefault: true,
  },

  // NEW: Add "test" environment here
  test: {
    client: "sqlite3",
    connection: {
      filename: ":memory:",
    },
    useNullAsDefault: true,
  },
};

module.exports = config;

export const db = knex(config[process.env.NODE_ENV || "development"]);
