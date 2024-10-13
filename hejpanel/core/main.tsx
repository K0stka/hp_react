// React
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// Styles
import "./index.css";

// Pages
import App from "../src/App.tsx";
import ErrorPage from "../src/ErrorPage.tsx";

// Router
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Firebase
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		errorElement: <ErrorPage />,
	},
]);

const firebaseConfig = {
	apiKey: "AIzaSyCxnWtpqOke2kKZVpvx-6XDvhDxD4V31Nk",
	authDomain: "hejpanel.firebaseapp.com",
	projectId: "hejpanel",
	storageBucket: "hejpanel.appspot.com",
	messagingSenderId: "273832311170",
	appId: "1:273832311170:web:87c21a5bc3b3d3ae6af79b",
	measurementId: "G-8E8QMLNQB0",
};

const app = initializeApp(firebaseConfig);
// @ts-ignore
const analytics = getAnalytics(app);

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>
);
