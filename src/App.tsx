import { createBrowserRouter, RouterProvider } from 'react-router'
import RootLayout from './pages/RootLayout'
import CoursesPage from './pages/CoursesPage'
import NewCoursePage from './pages/NewCoursePage'
import './App.css'

const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    children: [
      { index: true, Component: CoursesPage },
      { path: 'courses/new', Component: NewCoursePage },
    ],
  },
])

const App = () => {
  return <RouterProvider router={router} />
}

export default App
