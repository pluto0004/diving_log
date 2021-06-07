exports.seed = function (knex) {
	// Deletes ALL existing entries
	return knex("logs").del().then(function () {
		// Inserts seed entries
		return knex("logs").insert([
			{
				date_time: "2021-06-01 09:05:06",
				buddy_name: "Tsuyoshi",
				location_name: "Izu",
				temperature_in_c: 24.5,
				ave_depth_in_m: 4.5,
				max_depth_in_m: 20.0,
				user_id: 1,
			},
			{
				date_time: "2021-06-01 09:05:06",
				buddy_name: "miyoko",
				location_name: "Okinawa",
				temperature_in_c: 30.5,
				ave_depth_in_m: 6.5,
				max_depth_in_m: 12.0,
				user_id: 1,
			},
		]);
	});
};
