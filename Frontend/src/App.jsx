import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ReportFrameworkPage from './Pages/reportFrameworkPage.jsx';
import FinalPage from './Pages/finalPage.jsx';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/report" element={<ReportFrameworkPage />} />
        <Route path="/file" element={<FinalPage />} />
      </Routes>
    </Router>
  );
}

export default App;