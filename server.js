const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const knex = require("./db/knex");
const exphbs = require("express-handlebars");
const swaggerUi = require("swagger-ui-express");

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
swaggerDocument = require("./swagger.json");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Handlebars middleware
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Homepage
app.get("/", async (req, res) => {
	const users = await knex("users");
	const logs = await knex("logs");
	res.render("index", {
		title: "Diver's App",
		users,
		logs,
	});
});

// Users
// Get: All users data
app.get("/api/users", async (req, res) => {
	const users = await knex("users");
	res.send(users);
});

// Get: Individual user data
app.get("/api/users/:id", async (req, res) => {
	const users = await knex("users");
	const target = users.filter((user) => user.id === parseInt(req.params.id));
	if (target.length === 0) {
		res.status(400).json(`User with id #${req.params.id} was not found`);
		return;
	}
	res.send(target);
});

const port = 8000 || process.env.PORT;
app.listen(port, () => {
	console.log(`🎉 Server running at https://localhost:${port}!`);
});

// Post: Create a user data
app.post("/api/users", async (req, res) => {
	await knex("users").insert({
		name: req.body.name,
		license: req.body.license,
	});
	const users = await knex("users");
	res.send(users);
});
// Put: Update a user data
app.put("/api/users/:id", async (req, res) => {
	const users = await knex("users");
	const target = users.filter((user) => user.id === parseInt(req.params.id));
	if (target.length === 0) {
		res.status(400).json(`User with id #${req.params.id} was not found`);
		return;
	}
	await knex("users").where("id", req.params.id).update({
		name: req.body.name,
		gender: req.body.gender,
		license_type: req.body.license_type,
	});
	res.send(users);
});
// Delete: Delete a user data
app.delete("/api/users/:id", async (req, res) => {
	const users = await knex("users");
	const target = users.filter((user) => user.id === parseInt(req.params.id));
	if (target.length === 0) {
		res.status(400).json(`User with id #${req.params.id} was not found`);
		return;
	}
	await knex("users").where("id", req.params.id).del();
	res.json({ msg: "A user was deleted", DeletedUser: target });
});
// Logs
// Get: All log data
app.get("/api/logs", async (req, res) => {
	const logs = await knex("logs");
	res.send(logs);
});
// Get: All log data for a user
app.get("/api/logs/:id", async (req, res) => {
	const logs = await knex("logs");
	const target = logs.filter((log) => log.id === parseInt(req.params.id));
	if (target.length === 0) {
		res.status(400).json(`User with id #${req.params.id} was not found`);
		return;
	}
	res.send(target);
});
// Post: Create a log data
app.post("/api/logs", async (req, res) => {
	await knex("logs").insert({
		date_time: req.body.date_time,
		buddy_name: req.body.buddy_name,
		location_name: req.body.location_name,
		temperature_in_c: req.body.temperature_in_c,
		ave_depth_in_m: req.body.ave_depth_in_m,
		max_depth_in_m: req.body.max_depth_in_m,
		user_id: req.body.user_id,
	});
	const logs = await knex("logs");
	res.send(logs);
});

// Update: Update a log data
app.put("/api/logs/:id", async (req, res) => {
	const logs = await knex("logs");
	const target = logs.filter((log) => log.id === parseInt(req.params.id));
	if (target.length === 0) {
		res.status(400).json(`Log with User id #${req.params.id} was not found`);
		return;
	}
	await knex("logs").where("id", req.params.id).update({
		date_time: req.body.date_time,
		buddy_name: req.body.buddy_name,
		location_name: req.body.location_name,
		temperature_in_c: req.body.temperature_in_c,
		ave_depth_in_m: req.body.ave_depth_in_m,
		max_depth_in_m: req.body.max_depth_in_m,
	});
	const updatedLogs = await knex("logs");
	res.send(updatedLogs);
});

// Delete: Delete a log
app.delete("/api/logs/:id", async (req, res) => {
	console.log(req.body);
	const logs = await knex("logs");
	const target = logs.filter((log) => log.id === parseInt(req.params.id));
	if (target.length === 0) {
		res.status(400).json(`User with id #${req.params.id} was not found`);
		return;
	}
	await knex("logs").where("id", req.params.id).del();
	res.json({ msg: "A log was deleted", DeletedLog: target });
});
