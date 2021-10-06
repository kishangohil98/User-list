import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Main } from './Main'
import { Login } from './Login'
import { AddUser } from './AddUser'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>

        <Switch>
          <Route exact path="/" component={Main} />
          <Route path="/login" component={Login} />
          <Route path="/add-user" component={AddUser} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
