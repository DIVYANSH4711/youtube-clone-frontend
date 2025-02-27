import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import Home from "./components/Home/Home.jsx";
import VideoPage from "./components/VideoPage/VideoPage.jsx";
import Subscriptions from "./components/Subsciptions/Subscriptions.jsx";
import CommunityTab from "./components/Community/CommunityTab.jsx";
import Channel from "./components/Channel/Channel.jsx";
import LikeVideo from "./components/LikeVideo/LikeVideo.jsx";
import Login from "./components/Authentication/Login.jsx";
import Register from "./components/Authentication/Register.jsx";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.jsx";
import WatchHistory from "./components/WatchHistory/WatchHistory.jsx";

const router = createBrowserRouter([
  {
    path: "/auth/",
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },
  {
    path: "/u/",
    element: <ProtectedRoute />, // Protect everything inside "/u/"
    children: [
      { path: "", element: <App /> },
      { path: "video/:id", element: <VideoPage /> },
      { path: "subscription", element: <Subscriptions /> },
      { path: "community", element: <CommunityTab /> },
      { path: "channel/:id", element: <Channel /> },
      { path: "liked-videos", element: <LikeVideo /> },
      { path: "watch-history", element: <WatchHistory /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
