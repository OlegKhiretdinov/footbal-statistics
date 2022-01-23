import { BrowserRouter, Link, Route, Routes } from "react-router-dom"
import CompetitionList from "./containers/CompetitionList/CompetitionList"
import TeamList from "./containers/TeamList/TeamList"
import MatchList from "./containers/MatchList/MatchList"
import TeamPage from "./containers/TeamPage/TeamPage"
import cls from "./App.module.scss"

function App() {
  return (
    <div className={cls.App}>
      <BrowserRouter>
        <h1 className={cls.header}>
          <Link to="/">European football leagues statistic</Link>
        </h1>
        <Routes>
          <Route path="/" element={<CompetitionList />} />
          <Route path="/competition/:id/" element={<TeamList />} />
          <Route path="/calendar/:type/:id" element={<MatchList />} />
          <Route path="/team/:id" element={<TeamPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
