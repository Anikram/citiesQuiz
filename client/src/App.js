import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";
import {BrowserRouter as Router, Route, withRouter, Redirect, Switch} from "react-router-dom";
import Game from "./components/Game/Game";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Profile from "./components/Players/Profile";
import Players from "./components/Players/Players";
import store from './redux/store';
import {compose} from "redux";
import {connect, Provider} from "react-redux";
import {
  checkUserAuthenticated,
  deleteToken,
  fetchProfile, getGames,
  loginUser, registerUser,
  setIsAuthenticated,
  setToken, setTopScore
} from "./redux/profileReducer";
import {initializeApp} from "./redux/appReducer";
import Preloader from "./components/common/Preloader/Preloader";
import {fetchTopUsers} from "./redux/usersReducer";
import {createNewGame, deleteGame, fetchGameData, finishGame, flushGameData} from "./redux/gameReducer";

require('dotenv').config()

class App extends React.Component {
  componentDidMount() {
    this.props.initializeApp(localStorage.getItem("token"));
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps !== this.props) {
      checkUserAuthenticated(localStorage.getItem("token"))
      localStorage.setItem("token", this.props.token)
    }
  }

  render() {
    if (!this.props.initialized) {
      return <Preloader/>
    }

    return (
      <div className='wrapper'>
        <Header isAuthenticated={this.props.isAuthenticated} profile={this.props.profile} setAuth={setIsAuthenticated}
                deleteToken={this.props.deleteToken}/>
        <div className='middle'>
          <ToastContainer/>
          <Switch>
            <Route exact path="/" render={
              props => <Players {...props} isAuth={this.props.isAuthenticated} users={this.props.users}
                                fetchTopUsers={this.props.fetchTopUsers} fetchProfile={this.props.fetchProfile}
                                profile={this.props.profile} setAuth={setIsAuthenticated}/>
            }
            />
            <Route exact path="/login" render={props => !this.props.isAuthenticated
              ? <Login {...props} setAuth={setIsAuthenticated} loginUser={this.props.loginUser}/>
              : <Redirect to="/profile"/>
            }
            />
            <Route exact path="/register" render={props => !this.props.isAuthenticated
              ? <Register {...props} setAuth={setIsAuthenticated} registerUser={this.props.registerUser}/>
              : <Redirect to="/"/>
            }
            />
            <Route exact path="/profile" render={props => this.props.isAuthenticated
              ? <Profile {...props} deleteToken={this.props.deleteToken} isAuthenticated={this.props.isAuthenticated}
                         fetchProfile={this.props.fetchProfile} profile={this.props.profile} games={this.props.games}
                         getGames={this.props.getGames} fetchGameData={this.props.fetchGameData}
                         createNewGame={this.props.createNewGame} gameData={this.props.gameData}
                         deleteGame={this.props.deleteGame} finishGame={this.props.finishGame}
                         flushGameData={this.props.flushGameData}/>
              : <Redirect to="/login"/>
            }
            />
            <Route exact path='/game' render={props => this.props.isAuthenticated
              ? <Game fetchGameData={this.props.fetchGameData} profile={this.props.profile}
                      createNewGame={this.props.createNewGame} gameData={this.props.gameData}
                      deleteGame={this.props.deleteGame} finishGame={this.props.finishGame}
                      flushGameData={this.props.flushGameData} isAuth={this.props.isAuthenticated}
                      setTopScore={this.props.setTopScore}/>
              : <Redirect to="/login"/>

            }/>
          </Switch>
        </div>
        <Footer/>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.profile.isAuthenticated,
    token: state.profile.token,
    initialized: state.app.initialized,
    profile: state.profile.profile,
    users: state.users.users,
    gameData: state.games,
    games: state.profile.games
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
    fetchTopUsers,
    fetchGameData,
    createNewGame,
    registerUser,
    finishGame,
    deleteGame,
    setTopScore,
    getGames,
    flushGameData
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
