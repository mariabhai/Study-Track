import { NavLink, Outlet } from 'react-router'

const RootLayout = () => {
  return (
    <>
      <header>
        <h1>StudyTrack</h1>

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
