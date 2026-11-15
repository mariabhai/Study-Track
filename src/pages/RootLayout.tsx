import { NavLink, Outlet } from 'react-router'
import examensmossa from '../assets/examensmossa-icon.webp'

const RootLayout = () => {
  return (
    <>
      <header className="site-header">
        <NavLink className="brand" to="/">
          <img className="brand-icon" src={examensmossa} width="44" height="44" alt="" />
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
