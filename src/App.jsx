import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import CompetitionList from './containers/CompetitionList/CompetitionList';
import TeamList from './containers/TeamList/TeamList';
import './App.css';

function App() {

  return (
    <BrowserRouter>
      <h1><Link to="/">European football leagues statistic</Link></h1>
      <Routes>
        <Route path="/" element={<CompetitionList />} />
        <Route path="/competition/:id" element={<TeamList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
