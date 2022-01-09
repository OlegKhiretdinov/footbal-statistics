import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import CompetitionList from './containers/CompetitionList/CompetitionList';
import './App.css';

function App() {

  return (
    <BrowserRouter>
      <h1><Link to="/">European football leagues statistic</Link></h1>
      <Switch>
        <Route path="/">
          <CompetitionList />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
