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
import ByPass from "./Utilities/ByPass.jsx"
import Upload from "./components/Upload/Upload.jsx"

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
    element: <ProtectedRoute />,
    children: [
      {
        path: "",
        element: <App />,
        children: [
          { path: "home", element: <Home /> }, 
          { path: "video/:id", element: <VideoPage /> },
          { path: "subscription", element: <Subscriptions /> },
          { path: "community", element: <CommunityTab /> },
          { path: "upload", element: <Upload /> },
          { path: "channel/:username", element: <Channel /> },
          { path: "liked-videos", element: <LikeVideo /> },
          { path: "watch-history", element: <WatchHistory /> },
        ],
      },
    ],
  },
  {
    path: "/",
    element: <ByPass />
  }
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
