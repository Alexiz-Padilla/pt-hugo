import React from 'react'
import { Switch, Route,   BrowserRouter as Router,
} from 'react-router-dom'
import NavigationBar from './components/Navbar'
import HomePageContainer from './components/home'
import CounterContainer from './components/Counter'
import TemperatureContainer from './components/Temperature'
import FlightContainer from './components/Flight'
import TimerContainer from './components/Timer'
import CRUDContainer from './components/CRUD'
import CirclesContainer from './components/Circles'

import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => (
  <Router>
    <header>
      <NavigationBar />
    </header>
    <Switch>
      <Route exact path="/" component={HomePageContainer} onUpdate={() => window.scrollTo(0, 0)} />
      <Route exact path="/flight" component={FlightContainer} onUpdate={() => window.scrollTo(0, 0)} />
      <Route exact path="/temperature" component={TemperatureContainer} onUpdate={() => window.scrollTo(0, 0)} />
      <Route exact path="/circles" component={CirclesContainer} onUpdate={() => window.scrollTo(0, 0)} />     
      <Route exact path="/timer" component={TimerContainer} onUpdate={() => window.scrollTo(0, 0)} />
      <Route exact path="/crud" component={CRUDContainer} onUpdate={() => window.scrollTo(0, 0)} />
      <Route exact path="/counter" component={CounterContainer} onUpdate={() => window.scrollTo(0, 0)} />
    </Switch>
  </Router>
);

export default App