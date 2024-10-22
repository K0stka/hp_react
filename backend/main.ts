import { serve } from "https://deno.land/std@0.150.0/http/server.ts";
import { Server } from "https://deno.land/x/socket_io@0.1.1/mod.ts";

const io = new Server({
	cors: {
		origin: "http://localhost:5173",
	},
});

const currentConfiguration = {
	theme: "normal",
	isDebugMenuEnabled: true,
	isCanteenEnabled: true,
	canteen: { snack: null, soup: null, lunch1: null, lunch2: null, lunch3: null },
	isDeparturesEnabled: true,
	departures: [],
};

// app.post("/theme", (req, res) => {
// 	const theme = req.query.theme;
// 	currentConfiguration.theme = theme;
// 	io.emit("theme", theme);
// 	res.sendStatus(200);
// });

// app.post("/debugMenu", (req, res) => {
// 	const isDebugMenuEnabled = req.query.enabled === "true";
// 	currentConfiguration.isDebugMenuEnabled = isDebugMenuEnabled;
// 	io.emit("debugMenu", isDebugMenuEnabled);
// 	res.sendStatus(200);
// });

// app.post("/canteen", (req, res) => {
// 	const isCanteenEnabled = req.query.enabled === "true";
// 	currentConfiguration.isCanteenEnabled = isCanteenEnabled;
// 	io.emit("canteen:enable", isCanteenEnabled);
// 	res.sendStatus(200);
// });

// app.post("/canteen/update", (req, res) => {
// 	const snack = req.query.snack ?? currentConfiguration.canteen.snack;
// 	const soup = req.query.soup ?? currentConfiguration.canteen.soup;
// 	const lunch1 = req.query.lunch1 ?? currentConfiguration.canteen.lunch1;
// 	const lunch2 = req.query.lunch2 ?? currentConfiguration.canteen.lunch2;
// 	const lunch3 = req.query.lunch3 ?? currentConfiguration.canteen.lunch3;

// 	currentConfiguration.canteen = { snack, soup, lunch1, lunch2, lunch3 };
// 	io.emit("canteen:update", currentConfiguration.canteen);
// 	res.sendStatus(200);
// });

// app.post("/departures", (req, res) => {
// 	const isDeparturesEnabled = req.query.enabled === "true";
// 	currentConfiguration.isDeparturesEnabled = isDeparturesEnabled;
// 	io.emit("departures:enable", isDeparturesEnabled);
// 	res.sendStatus(200);
// });

io.on("connection", (socket) => {
	socket.emit("theme", currentConfiguration.theme);
	socket.emit("debugMenu", currentConfiguration.isDebugMenuEnabled);
	socket.emit("canteen:enable", currentConfiguration.isCanteenEnabled);
	socket.emit("canteen:update", currentConfiguration.canteen);
	socket.emit("departures:enable", currentConfiguration.isDeparturesEnabled);
});

// server.listen(PORT, () => {
// 	console.log(`server running at http://localhost:${PORT}`);
// });

await serve(io.handler(), {
	port: 3000,
});
