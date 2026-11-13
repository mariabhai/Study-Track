import { NavLink, Outlet } from 'react-router'
import examensmossa from '../assets/examensmossa.png'

const RootLayout = () => {
  return (
    <>
      <header className="site-header">
        <NavLink className="brand" to="/">
          <img className="brand-icon" src={examensmossa} alt="" />
          StudyTrack
        </NavLink>

        <nav aria-label="Huvudnavigation">
          <NavLink to="/" end>
            Mina kurser
          </NavLink>

          <NavLink to="/courses/new">
            Lägg till kurs
          </NavLink>
        </nav>
      </header>

      <Outlet />
    </>
  )
}

export default RootLayout
