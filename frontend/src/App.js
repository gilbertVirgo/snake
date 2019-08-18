import React, {useState, useEffect} from 'react';
import {Switch, Route} from "react-router-dom";
import Home from "./pages/Home";
import Create from "./pages/Create";
import Join from "./pages/Join";
import Game from "./pages/Game";
import Nav from "./components/Nav";
import Container from "./components/Container";
import Header from './components/Header';

import "./scss/main.scss";

const App = () => (
  <Container>
    <Header>
      <Header.Title>Snake</Header.Title>
      <Header.Subtitle>By Gil</Header.Subtitle>
      <Nav/>
    </Header>
    <Switch>
      <Route exact path="/" render={props => <Home {...props}/>}/>
      <Route path="/create" render={props => <Create {...props}/>}/>
      <Route path="/join" render={props => <Join {...props}/>}/>
      <Route path="/game/:room" render={props => <Game {...props} width={64} height={48} scale={10}/>}/>
    </Switch>
  </Container>
);

export default App;
