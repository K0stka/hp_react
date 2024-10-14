import { getAuth, OAuthProvider, onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { useState } from "react";

function Login() {
	const auth = getAuth();
	const provider = new OAuthProvider("microsoft.com");

	const [email, setEmail] = useState("");

	onAuthStateChanged(auth, (user) => {
		setEmail(user?.email || "");
	});

	const login = async () => {
		await signInWithPopup(auth, provider);
	};

	const logout = async () => {
		await auth.signOut();
	};

	return (
		<>
			<h1>Login</h1>
			Email: {email}
			<br />
			<div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
				<button onClick={login}>Login with microsoft</button>
				<button onClick={logout}>Logout</button>
			</div>
		</>
	);
}

export default Login;
