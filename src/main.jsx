import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Home from './components/Home/Home.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import VideoPage from './components/VideoPage/VideoPage.jsx'
import Subscriptions from './components/Subsciptions/Subscriptions.jsx'
import CommunityTab from './components/Community/CommunityTab.jsx'
import Channel from './components/Channel/Channel.jsx'
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'video/:id',
        element: <VideoPage />,
      },
      {
        path: 'subscription',
        element: <Subscriptions />,
      },
      {
        path: 'community',
        element: <CommunityTab />,
      },
      {
        path: 'channel/:id',
        element: <Channel/>
      }
    ]
  }
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
