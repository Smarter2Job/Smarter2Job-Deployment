import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import SoFunktionierts from './pages/SoFunktionierts'
import Preise from './pages/Preise'
import Story from './pages/Story'
import Community from './pages/Community'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import Faq from './pages/Faq'
import Smarter2JobLanding from './components/Smarter2JobLanding'
import Impressum from './pages/Impressum'
import Datenschutz from './pages/Datenschutz'
import AGB from './pages/AGB'
import Danke from './pages/Danke'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout><Home /></Layout>} />
      <Route path="/so-funktionierts" element={<Layout><SoFunktionierts /></Layout>} />
      <Route path="/preise" element={<Layout><Preise /></Layout>} />
      <Route path="/story" element={<Layout><Story /></Layout>} />
      <Route path="/community" element={<Layout><Community /></Layout>} />
      <Route path="/blog" element={<Layout><Blog /></Layout>} />
      <Route path="/blog/:slug" element={<Layout><BlogPost /></Layout>} />
      <Route path="/faq" element={<Layout><Faq /></Layout>} />
      <Route path="/stellencheck" element={<Layout><Smarter2JobLanding /></Layout>} />
      <Route path="/impressum" element={<Layout><Impressum /></Layout>} />
      <Route path="/datenschutz" element={<Layout><Datenschutz /></Layout>} />
      <Route path="/agb" element={<Layout><AGB /></Layout>} />
      <Route path="/danke" element={<Layout><Danke /></Layout>} />
    </Routes>
  )
}

export default App
