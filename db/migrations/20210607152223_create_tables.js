exports.up = function (knex) {
	return knex.schema
		.createTable("users", function (t) {
			t.increments();
			t.string("name").notNullable();
			t.timestamp("created_at").defaultTo(knex.fn.now());
			t.timestamp("updated_at").defaultTo(knex.fn.now());
			t.string("license").notNullable();
		})
		.createTable("logs", function (t) {
			t.increments();
			t.timestamp("date_time").notNullable();
			t.string("buddy_name");
			t.string("location_name");
			t.float("temperature_in_c");
			t.float("ave_depth_in_m");
			t.float("max_depth_in_m");
			t.integer("user_id").references("id").inTable("users");
		});
};

exports.down = function (knex) {
	return knex.schema.dropTable("logs").dropTable("users");
};
