import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

import Home from './home'
import Investment from './investment'
import Header from '../components/header'

function PageNotFont() {
  return <div>404</div>
}

export default function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/" exact>
          <Home/>
        </Route>
        <Route path="/investment" exact>
          <Investment/>
        </Route>
        <Route path="*">
          <PageNotFont/>
        </Route>
      </Switch>
    </Router>
  );
}
