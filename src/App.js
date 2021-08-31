import React from 'react'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import RegisterUser from './component/RegisterUser';
import ListUser from './component/ListUser';
//import TestPage from './component/UpdateUser';

class App extends React.Component {
  render() {
    return (
        <div className='container-fluid vh-100 py-4'>
          <Router>
            <nav>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/register">Register</Link>
                </li>
              </ul>
            </nav>
            <Switch>
              <Route path="/register">
                <div className='row h-100  justify-content-center'>
                  <RegisterUser/>
                </div>
              </Route>
              {/*<Route path="/books/:id">*/}
              {/*  <div className='row h-100  justify-content-center'>*/}
              {/*    <TestPage/>*/}
              {/*  </div>*/}
              {/*</Route>*/}
              <Route path="/">
                {/*<div className='row h-100  justify-content-center'>*/}
                {/*  <ListUser/>*/}
                {/*</div>*/}
              </Route>
            </Switch>
          </Router>

        </div>
    )
  }
}

export default App