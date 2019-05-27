import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import SideBarNHeader from './components/Drawer'
import MemberBoard from './Pages/MemberBoard'
import Router from './route/router'

import {Provider} from 'react-redux'
import store from './redux/store'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        {/* <div className="App"> */}
          <Router/>
        {/* </div> */}
      </Provider>
    );
  }
}

export default App;
