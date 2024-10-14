// React
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// Styles
import "./index.css";

// Pages
import Panel from "./anonymous/Panel.tsx";
import Login from "./anonymous/Login.tsx";
import Admin from "./Admin.tsx";
import App from "./authenticated/App.tsx";
import ErrorPage from "./ErrorPage.tsx";

// Router
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyCxnWtpqOke2kKZVpvx-6XDvhDxD4V31Nk",
	authDomain: "hejpanel.firebaseapp.com",
	projectId: "hejpanel",
	storageBucket: "hejpanel.appspot.com",
	messagingSenderId: "273832311170",
	appId: "1:273832311170:web:87c21a5bc3b3d3ae6af79b",
	measurementId: "G-8E8QMLNQB0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// ? createBrowserRouter([
// 		{
// 			path: "/",
// 			element: <App />,
// 			errorElement: <ErrorPage />,
// 		},
//   ])
const router = createBrowserRouter([
	{
		path: "/",
		element: <Panel />,
		errorElement: <ErrorPage />,
	},
	{
		path: "/login",
		element: <Login />,
	},
	{
		path: "/admin",
		element: <Admin />,
	},
]);

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>
);
