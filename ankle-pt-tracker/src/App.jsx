import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import WeeklyReflections from './pages/WeeklyReflections'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/reflections" element={<WeeklyReflections />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App
