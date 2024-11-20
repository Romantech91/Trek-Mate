import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

import App from './App.jsx'
import Home from './pages/Home'
import SavedPlaces from './pages/SavedPlaces'
import LoginForm from './components/LoginForm'
import SignupForm from './components/SignupForm'

const handleModalCLose = () => {
  console.log('Modal closed');
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <h1 className='display-2'>Wrong page!</h1>,
    children: [
      {
        index: true,
        element: <Home />
      }, {
        path: '/saved',
        element: <SavedPlaces />
      }, {
        path: '/login',
        element: <LoginForm handleModalClose={handleModalCLose} />
      }, {
        path: '/signup',
        element: <SignupForm handleModalClose={handleModalCLose} />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
)
