import React from 'react';
import {
  BrowserRouter as Router,
  Route ,
  Link,
  NavLink,
  Switch,
} from 'react-router-dom';

import './App.css'

const NavLinks = () => (
  <nav>
    <NavLink exact activeClassName="active" to="/">Home</NavLink>
    <NavLink activeClassName="active" to="/about">About</NavLink>
    <NavLink activeClassName="active" to="/msg">Message</NavLink>
  </nav>
)

const Home = () => <h1>Home</h1>

const About = () => <h1>About</h1>

const Message = (props) => {
  return (
    <div>
      <h1>{props.match.params.message || 'Message Home'}</h1>
      <ul>
        <Link to="/msg/foo">foo</Link>
        <Link to="/msg/bar">bar</Link>
      </ul>
    </div>
  )
}

const App = () => (
  <Router>
    <div>
      <NavLinks />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/msg/:message?" component={Message} />
        <Route render={() => <h1>Page not found</h1>} />
      </Switch>
    </div>
  </Router>
)

export default App;
