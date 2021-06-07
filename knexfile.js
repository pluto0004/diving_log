// Update with your config settings.

module.exports = {
	development: {
		client: "pg",
		connection: 'postgres://localhost/diving_logger',
		migrations: {
			directory: __dirname + "/db/migrations",
			tableName: "knex_migrations",
		},
		seeds: {
			directory: __dirname + "/db/seeds",
		},
	},
	production: {
		client: "pg",
		connection: process.env.DATABASE_URL,
		migrations: {
			directory: __dirname + "/db/migrations",
		},
		seeds: {
			directory: __dirname + "/db/seeds/production",
		},
	},
};
