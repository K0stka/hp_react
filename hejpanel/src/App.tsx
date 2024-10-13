import { getAuth, signInWithRedirect, OAuthProvider } from "firebase/auth";

function App() {
	const provider = new OAuthProvider("microsoft.com");

	provider.addScope("mail.read");

	const auth = getAuth();
	signInWithRedirect(auth, provider);

	return (
		<>
			<h1>Test</h1>
		</>
	);
}

export default App;
