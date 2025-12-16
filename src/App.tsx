import { Routes, Route } from 'react-router-dom'
import Smarter2JobLanding from './components/Smarter2JobLanding'
import Impressum from './pages/Impressum'
import Datenschutz from './pages/Datenschutz'
import AGB from './pages/AGB'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Smarter2JobLanding />} />
      <Route path="/impressum" element={<Impressum />} />
      <Route path="/datenschutz" element={<Datenschutz />} />
      <Route path="/agb" element={<AGB />} />
    </Routes>
  )
}

export default App
