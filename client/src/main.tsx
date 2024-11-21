import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

import App from './App.jsx'
import Home from './pages/Home'
import SavedPlaces from './pages/SavedPlaces'
import LoginForm from './components/LoginForm'
import SignupForm from './components/SignupForm'
import Auth from './utils/auth'

const router = createBrowserRouter([
  {
    path: '/',
    element: Auth.loggedIn() ? <App /> : <LoginForm handleModalClose={() => {}} />,
    errorElement: <h1 className='display-2'>Wrong page!</h1>,
    children: [
      {
        index: true,
        element: <Home />
      }, {
        path: '/saved',
        element: Auth.loggedIn() ? <SavedPlaces /> : <LoginForm handleModalClose={() => {}} />
      }, {
        path: '/login',
        element: <LoginForm handleModalClose={() => {}} />
      }, {
        path: '/signup',
        element: <SignupForm handleModalClose={() => {}} />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
)
