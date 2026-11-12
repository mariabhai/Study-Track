import { createBrowserRouter, RouterProvider } from 'react-router'
import RootLayout from './pages/RootLayout'
import CoursesPage from './pages/CoursesPage'
import NewCoursePage from './pages/NewCoursePage'
import './App.css'
import CourseDetailPage from './pages/CourseDetailPage'
import EditCoursePage from './pages/EditCoursePage'
import NotFoundPage from './pages/NotFoundPage'

const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    children: [
      { index: true, Component: CoursesPage },
      { path: 'courses/new', Component: NewCoursePage },
      { path: 'courses/:id', Component: CourseDetailPage },
      { path: 'courses/:id/edit', Component: EditCoursePage },
      { path: '*', Component: NotFoundPage },
    ],
  },
])

const App = () => {
  return <RouterProvider router={router} />
}

export default App
