import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import './index.css'

// Import the layouts
import RootLayout from './layouts/root-layout'
import UserLayout from './layouts/user-layout'

import LandingPage from './pages/LandingPage'
import AboutPage from './pages/AboutPage'
import SignInPage from './pages/SignInPage'
import SignUpPage from './pages/SignUpPage'
import ExplorePage from './pages/ExplorePage'
import ContributePage from './pages/ContributePage'

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: "/", element: <LandingPage /> },
      { path: "/about", element: <AboutPage /> },
      { path: "/signIn", element: <SignInPage /> },
      { path: "/signUp", element: <SignUpPage /> },
      {
        element: <UserLayout />,
        children: [
          { path: "/explore", element: <ExplorePage /> },
          { path: "/contribute", element: <ContributePage /> },
        ]
      },
    ]
  }
])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
