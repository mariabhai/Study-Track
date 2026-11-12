import { Link } from 'react-router'

const NotFoundPage = () => {
  return (
    <main>
      <h2>404 – Sidan hittades inte</h2>
      <p>Adressen du försöker öppna finns inte.</p>
      <Link to="/">Tillbaka till kurserna</Link>
    </main>
  )
}

export default NotFoundPage
