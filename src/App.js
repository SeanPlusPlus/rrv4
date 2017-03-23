import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink,
  Switch,
} from 'react-router-dom';
import Form from './Form'
import TodoFooter from './components/TodoFooter'
import AddTodo from './containers/AddTodo'
import VisibleTodoList from './containers/VisibleTodoList'
import AsyncApp from './containers/AsyncApp'
import Message from './containers/Message'
import './App.css'

const NavLinks = () => (
  <nav>
    <NavLink exact activeClassName="active" to="/">Home</NavLink>
    <NavLink activeClassName="active" to="/params">Params</NavLink>
    <NavLink activeClassName="active" to="/form">Form</NavLink>
    <NavLink activeClassName="active" to="/todos">Todos</NavLink>
    <NavLink activeClassName="active" to="/async">Async</NavLink>
    <NavLink activeClassName="active" to="/message">Message</NavLink>
  </nav>
)

const Home = () => <h1>Home</h1>

const Params = (props) => {
  return (
    <div>
      <h1>{props.match.params.message ? `Msg: ${props.match.params.message}` : 'Msg'}</h1>
      <p><Link to="/params/foo">#1 foo</Link></p>
      <p><Link to="/params/bar">#2 bar</Link></p>
    </div>
  )
}

const TodoWrapper = () => (
  <div>
    <AddTodo />
    <VisibleTodoList />
    <TodoFooter />
  </div>
)

const getRoutes = () => {
  return (
    <div>
      <NavLinks />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/params/:message?" component={Params} />
        <Route path="/form" component={Form} />
        <Route path="/todos" component={TodoWrapper} />
        <Route path="/async" component={AsyncApp} />
        <Route path="/message" component={Message} />
        <Route render={() => <h1>Page not found</h1>} />
      </Switch>
    </div>
  )
}

const App = () => (
  <Router>
    {getRoutes()}
  </Router>
)

export default App
