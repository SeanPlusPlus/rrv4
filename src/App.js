import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink,
  Switch,
} from 'react-router-dom';
import Form from './Form'
import TodoApp from './TodoApp'
import './App.css'

const NavLinks = () => (
  <nav>
    <NavLink exact activeClassName="active" to="/">Home</NavLink>
    <NavLink activeClassName="active" to="/about">About</NavLink>
    <NavLink activeClassName="active" to="/msg">Message</NavLink>
    <NavLink activeClassName="active" to="/form">Form</NavLink>
    <NavLink activeClassName="active" to="/todos">Todos</NavLink>
  </nav>
)

const Home = () => <h1>Home</h1>

const About = (props) => {
  console.log(props);
  return (
    <h1>About</h1>
  )
}

const Message = (props) => {
  return (
    <div>
      <h1>{props.match.params.message ? `Msg: ${props.match.params.message}` : 'Msg'}</h1>
      <p>
        <Link to="/msg/foo">#1 foo</Link>
      </p>
      <p>
        <Link to="/msg/bar">#2 bar</Link>
      </p>
    </div>
  )
}

const getRoutes = (store, onIncrement, onDecrement) => {
  console.log(store);
  return (
    <div>
      <NavLinks />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/about" render={() => <About store={store} />} />
        <Route path="/msg/:message?" component={Message} />
        <Route path="/form" component={Form} />
        <Route path="/todos" component={TodoApp} />
        <Route render={() => <h1>Page not found</h1>} />
      </Switch>
    </div>
  )
}

const App = (store, onIncrement, onDecrement) => (
  <Router>
    {getRoutes(store, onIncrement, onDecrement)}
  </Router>
)

export default App;
