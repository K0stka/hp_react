import { useState } from "react";

const Admin = () => {
	const [theme, setTheme] = useState("");
	const [snack, setSnack] = useState("");
	const [soup, setSoup] = useState("");
	const [lunch1, setLunch1] = useState("");
	const [lunch2, setLunch2] = useState("");
	const [lunch3, setLunch3] = useState("");

	const handleChange = (address: string) => {
		fetch(`http://localhost:3000/${address}`, {
			method: "POST",
			mode: "no-cors",
		});
	};

	const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>, address: string, setValue: React.Dispatch<React.SetStateAction<string>>) => {
		if (e.key !== "Enter") return;

		handleChange(address);

		setValue("");
	};

	return (
		<>
			<h1>Admin</h1>
			<p>
				Theme:
				<input
					onKeyDown={(e) => handleEnter(e, `theme?theme=${theme}`, setTheme)}
					onChange={(e) => setTheme(e.target.value)}
					value={theme}
				/>
			</p>
			<p>
				Debug menu:
				<button onClick={() => handleChange("debugMenu?enabled=true")}>Enable</button>
				<button onClick={() => handleChange("debugMenu?enabled=false")}>Disable</button>
			</p>
			<p>
				Canteen:
				<button onClick={() => handleChange("canteen?enabled=true")}>Enable</button>
				<button onClick={() => handleChange("canteen?enabled=false")}>Disable</button>
			</p>
			<p>
				Snack:
				<input
					onKeyDown={(e) => handleEnter(e, `canteen/update?snack=${snack}`, setSnack)}
					onChange={(e) => setSnack(e.target.value)}
					value={snack}
				/>
			</p>
			<p>
				Soup:
				<input
					onKeyDown={(e) => handleEnter(e, `canteen/update?soup=${soup}`, setSoup)}
					onChange={(e) => setSoup(e.target.value)}
					value={soup}
				/>
			</p>
			<p>
				Lunch 1:
				<input
					onKeyDown={(e) => handleEnter(e, `canteen/update?lunch1=${lunch1}`, setLunch1)}
					onChange={(e) => setLunch1(e.target.value)}
					value={lunch1}
				/>
			</p>
			<p>
				Lunch 2:
				<input
					onKeyDown={(e) => handleEnter(e, `canteen/update?lunch2=${lunch2}`, setLunch2)}
					onChange={(e) => setLunch2(e.target.value)}
					value={lunch2}
				/>
			</p>
			<p>
				Lunch 3:
				<input
					onKeyDown={(e) => handleEnter(e, `canteen/update?lunch3=${lunch3}`, setLunch3)}
					onChange={(e) => setLunch3(e.target.value)}
					value={lunch3}
				/>
			</p>
			<p>
				Departures
				<button onClick={() => handleChange("departures?enabled=true")}>Enable</button>
				<button onClick={() => handleChange("departures?enabled=false")}>Disable</button>
			</p>
		</>
	);
};

export default Admin;
