import { useEffect, useState } from "react";
import { socket } from "../socket";

interface Panel {
	id: number;
}

interface TextPanel extends Panel {
	type: "text";
	content: string;
}

interface ImagePanel extends Panel {
	type: "image";
	url: string;
}

interface Canteen {
	snack: string | null;
	soup: string | null;
	lunch1: string | null;
	lunch2: string | null;
	lunch3: string | null;
}

interface Departure {
	id: string;
	departing: "ladova" | "natrati";
	carrier: "DPMO" | "CD" | "other";
	line: string;
	time: string;
	delay: string | null;
	destination: string;
}

function Panel() {
	const [isConnected, setIsConnected] = useState(socket.connected);

	const [panels, setPanels] = useState([] as Panel[]);

	const [theme, setTheme] = useState("normal");

	const [isDebugMenuOpen, setIsDebugMenuOpen] = useState(false);

	const [isCanteenEnabled, setIsCanteenEnabled] = useState(false);
	const [canteen, setCanteen] = useState({ snack: null, soup: null, lunch1: null, lunch2: null, lunch3: null } as Canteen);

	const [isDeparturesEnabled, setIsDeparturesEnabled] = useState(false);
	const [departures, setDepartures] = useState([] as Departure[]);

	useEffect(() => {
		const onConnect = () => setIsConnected(true);
		const onDisconnect = () => setIsConnected(false);

		const onPanelAdd = (panel: Panel) => setPanels((panels) => [...panels, panel]);
		const onPanelRemove = (panelId: number) => setPanels((panels) => panels.filter((p) => p.id !== panelId));

		const onThemeChange = (newTheme: string) => setTheme(newTheme);

		const onDebugMenuEnable = (isDebugMenuOpen: boolean) => setIsDebugMenuOpen(isDebugMenuOpen);

		const onCanteenEnable = (isCanteenEnabled: boolean) => setIsCanteenEnabled(isCanteenEnabled);
		const onCanteenUpdate = (newCanteen: Canteen) => setCanteen(newCanteen);

		const onDeparturesEnable = (isDeparturesEnabled: boolean) => setIsDeparturesEnabled(isDeparturesEnabled);
		const onDeparturesAdd = (departure: Departure) => setDepartures((departures) => [...departures, departure]);
		const onDeparturesRemove = (departureId: string) => setDepartures((departures) => departures.filter((d) => d.id !== departureId));

		socket.on("connect", onConnect);
		socket.on("disconnect", onDisconnect);

		socket.on("debugMenu", onDebugMenuEnable);

		socket.on("panel:add", onPanelAdd);
		socket.on("panel:remove", onPanelRemove);

		socket.on("theme", onThemeChange);

		socket.on("canteen:enable", onCanteenEnable);
		socket.on("canteen:update", onCanteenUpdate);

		socket.on("departures:enable", onDeparturesEnable);
		socket.on("departures:add", onDeparturesAdd);
		socket.on("departures:remove", onDeparturesRemove);

		return () => {
			socket.off("connect", onConnect);
			socket.off("disconnect", onDisconnect);

			socket.off("debugMenu", onDebugMenuEnable);

			socket.off("panel:add", onPanelAdd);
			socket.off("panel:remove", onPanelRemove);

			socket.off("theme", onThemeChange);

			socket.off("canteen:enable", onCanteenEnable);
			socket.off("canteen:update", onCanteenUpdate);

			socket.off("departures:enable", onDeparturesEnable);
			socket.off("departures:add", onDeparturesAdd);
			socket.off("departures:remove", onDeparturesRemove);
		};
	}, []);

	const [time, updateTime] = useState(new Date());
	useEffect(() => {
		const timer = setInterval(() => {
			updateTime(new Date());
		}, 1000);
		return () => clearInterval(timer);
	}, []);

	return (
		<main
			style={{
				width: "100dvw",
				height: "100dvh",
				display: "grid",
				gridTemplateColumns: "7fr 3fr",
			}}>
			{isDebugMenuOpen && (
				<div
					style={{
						position: "absolute",
						background: "#272822",
						color: "#d6d6d6",
						display: "grid",
						gridTemplateColumns: "1fr 1fr",
						gap: "0.5rem",
						padding: "1rem",
						borderRadius: "0.5rem",
						top: "1rem",
						left: "1rem",
					}}>
					<div
						style={{
							fontWeight: "bold",
						}}>
						Socket
					</div>
					<div className="value">{isConnected ? "connected ✅" : "disconnected ❌"}</div>
					<div
						style={{
							fontWeight: "bold",
						}}>
						Socket ID
					</div>
					<div className="value">{isConnected ? socket.id?.substring(0, 5) + "..." : "-"}</div>
					<div
						style={{
							fontWeight: "bold",
						}}>
						Theme
					</div>
					<div className="value">{theme}</div>
					<div
						style={{
							fontWeight: "bold",
						}}>
						Current panels
					</div>
					<div className="value">{panels.map((p) => p.id).join(", ")}</div>
				</div>
			)}

			<div className="carousel">
				<div className="carousel-progress">1 / {panels.length}</div>
			</div>

			<div className="info">
				<div className="time">{time.toLocaleTimeString()}</div>
				{isCanteenEnabled && (
					<div className="canteen">
						Current canteen:
						<br />
						{canteen.snack && (
							<span>
								Snack: {canteen.snack}
								<br />
							</span>
						)}
						{canteen.soup && (
							<span>
								Soup: {canteen.soup}
								<br />
							</span>
						)}
						{canteen.lunch1 && (
							<span>
								Lunch 1: {canteen.lunch1}
								<br />
							</span>
						)}
						{canteen.lunch2 && (
							<span>
								Lunch 2: {canteen.lunch2}
								<br />
							</span>
						)}
						{canteen.lunch3 && (
							<span>
								Lunch 3: {canteen.lunch3}
								<br />
							</span>
						)}
						{!canteen.snack && !canteen.soup && !canteen.lunch1 && !canteen.lunch2 && !canteen.lunch3 && <span>None</span>}
					</div>
				)}

				{isDeparturesEnabled && <div className="departures">Current departures: {JSON.stringify(departures)}</div>}
			</div>
		</main>
	);
}

export default Panel;
