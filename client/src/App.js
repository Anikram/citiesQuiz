import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, {Fragment, useState, useEffect} from 'react';
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";
import {BrowserRouter as Router, Route, withRouter, Redirect, Switch} from "react-router-dom";
import Game from "./components/Game/Game";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Profile from "./components/Players/Profile";
import Players from "./components/Players/Players";
import authAPI from "./api/authAPI";
import store from './redux/store';
import {compose} from "redux";
import {connect, Provider} from "react-redux";
import {
  checkUserAuthenticated,
  deleteToken,
  fetchProfile,
  loginUser,
  setIsAuthenticated,
  setToken
} from "./redux/profileReducer";
import {initializeApp} from "./redux/appReducer";
import Preloader from "./components/common/Preloader/Preloader";
import {fetchTopUsers} from "./redux/usersReducer";

require('dotenv').config()

class App extends React.Component {
  componentDidMount() {
    this.props.initializeApp(localStorage.getItem("token"));
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps !== this.props) {
      checkUserAuthenticated()
      localStorage.setItem("token", this.props.token)
    }
  }

  render() {
    if (!this.props.initialized) {
      return <Preloader/>
    }

    return (
      <Fragment>
        <Header isAuthenticated={this.props.isAuthenticated} profile={this.props.profile} setAuth={setIsAuthenticated} deleteToken={this.props.deleteToken}/>
        <div className='container col'>
          <ToastContainer/>
          <Switch>
            <Route exact path="/" render={
              props =>  <Players {...props} users={this.props.users} fetchTopUsers={this.props.fetchTopUsers} fetchProfile={this.props.fetchProfile} profile={this.props.profile} setAuth={setIsAuthenticated}/>
            }
            />
            <Route exact path="/login" render={props => !this.props.isAuthenticated
              ? <Login {...props} setAuth={setIsAuthenticated} loginUser={this.props.loginUser}/>
              : <Redirect to="/profile"/>
            }
            />
            <Route exact path="/register" render={props => !this.props.isAuthenticated
              ? <Register {...props} setAuth={setIsAuthenticated}/>
              : <Redirect to="/profile"/>
            }
            />
            <Route exact path="/profile" render={props => this.props.isAuthenticated
              ? <Profile {...props} deleteToken={this.props.deleteToken} setAuth={setIsAuthenticated} fetchProfile={this.props.fetchProfile} profile={this.props.profile}/>
              : <Redirect to="/login"/>
            }
            />
          </Switch>
        </div>
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.profile.isAuthenticated,
    token: state.profile.token,
    initialized: state.app.initialized,
    profile: state.profile.profile,
    users: state.users.users
  }
}

const AppContainer = compose(
  withRouter,
  connect(mapStateToProps, {
    checkUserAuthenticated,
    setIsAuthenticated,
    loginUser,
    setToken,
    initializeApp,
    fetchProfile,
    deleteToken,
    fetchTopUsers
  }))(App);


const GameApp = (props) => {
  return (
    <Provider store={store}>
      <Router>
        <AppContainer store={store}/>
      </Router>
    </Provider>
  )
}

export default GameApp;
