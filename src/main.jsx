import React from "react";
import ReactDOM from "react-dom/client";
import { AuthProvider } from "./services/AuthProvider.jsx";
import Root from "./pages/Root.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import Collection from "./pages/Collection.jsx";
import Profile from "./pages/Profile.jsx";
import Search from "./pages/Search.jsx";
import Wishlist from "./pages/Wishlist.jsx";
import About from "./pages/About.jsx";
import TermsOfUse from "./pages/TermsOfUse.jsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { ChakraProvider } from "@chakra-ui/react";
import { ColorModeScript } from "@chakra-ui/react";
import theme from "./theme.js";
import "@fontsource/rubik";
import ErrorPage from "./components/ErrorPage.jsx";
import AddKit from "./pages/AddKit.jsx";
import KitPage from "./pages/KitPage.jsx";
import BackOffice from "./pages/BackOffice.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/search", element: <ProtectedRoute element={<Search />} /> },
      {
        path: "/collection",
        element: <ProtectedRoute element={<Collection />} />,
      },
      { path: "/wishlist", element: <ProtectedRoute element={<Wishlist />} /> },
      { path: "/add_kit", element: <ProtectedRoute element={<AddKit />} /> },
      { path: "/users", element: <ProtectedRoute element={<Profile />} /> },
      {
        path: "/users/:id",
        element: <ProtectedRoute element={<Profile />} />,
      },
      { path: "/kits", element: <Profile /> },
      { path: "/kits/:id", element: <ProtectedRoute element={<KitPage />} /> },
      { path: "/admin", element: <ProtectedRoute element={<BackOffice />} /> },
      { path: "/error", element: <ErrorPage /> },
      { path: "/register", element: <Register /> },
      { path: "/login", element: <Login /> },
      { path: "/about", element: <About /> },
      { path: "/terms-of-use", element: <TermsOfUse /> },
      { path: "/privacy-policy", element: <PrivacyPolicy /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <RouterProvider router={router} />
      </ChakraProvider>
    </AuthProvider>
  </React.StrictMode>
);
