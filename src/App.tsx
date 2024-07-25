import './App.css';
import Table from './Table';
import Form from './Form';
import Chart from './Chart';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import { DataProvider } from './DataContext'

function App() {

  return (
    <DataProvider>
      <Router>
        <nav>
          <ul>
            <li>
              <Link to="/table">Table</Link>
            </li>
            <li>
              <Link to="/form">Form</Link>
            </li>
            <li>
              <Link to="/chart">Chart</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/table" element={<Table />} />
          <Route path="/form" element={<Form />} />
          <Route path="/chart" element={<Chart />} />
        </Routes>
      </Router>
    </DataProvider>
  )
}

export default App
