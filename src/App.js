import React from 'react'
import { Switch, Route } from 'react-router-dom'
import styled from 'styled-components'
import NavigationBar from './components/Navbar'
import HomePageContainer from './components/home'
import CounterContainer from './components/Counter'
import TemperatureContainer from './components/Temperature'

import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => (
  <Wrapper>
    <header>
      <NavigationBar />
    </header>
    <Switch>
      <Route exact path="/" component={HomePageContainer} onUpdate={() => window.scrollTo(0, 0)} />
      <Route exact path="/temperature" component={TemperatureContainer} onUpdate={() => window.scrollTo(0, 0)} />
      <Route exact path="/counter" component={CounterContainer} onUpdate={() => window.scrollTo(0, 0)} />
    </Switch>
  </Wrapper>
);

const Wrapper = styled.div`
`

export default App