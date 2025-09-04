import Dashboard from "./components/Dashboard"
import Project from "./components/Project"
import SearchIssues from "./components/SearchIssues"
import ListProjects from "./components/ListProjects"
import { Routes, Route } from "react-router-dom"

function App() {
  return (
    <Routes>
      <Route path='/' element={<Dashboard />} />
      <Route path='/project' element={<Project />} />
      <Route path='/listProjects' element={<ListProjects />} />
      <Route path='/searchIssues' element={<SearchIssues />} />
    </Routes>
  )
}

export default App
