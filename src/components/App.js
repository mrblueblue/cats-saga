import React, { Component } from 'react';
import {connect} from "react-redux"
import {fetchCatsRequest} from "../redux/cat-duck"
import Cat from "./Cat"
import WithScroll from "./WithScroll"
import './App.css';

class App extends Component {

  componentWillMount () {
    this.props.fetchCatsRequest()
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Cats and Their Facts</h2>
        </div>
        <WithScroll onScroll={this.props.fetchCatsRequest}>
          <ul className="App-content">
            {this.props.list.map((item, index) => (
              <Cat {...item} key={index} />
            ))}
            <li>
              <div id="loading-widget" className={`${this.props.loading && "loading"}`}/>
            </li>
          </ul>
        </WithScroll>
      </div>
    );
  }
}

function mapStateToProps (state) {
  return state
}

function mapDispatchToProps (dispatch) {
  return {
    fetchCatsRequest () {
      dispatch(fetchCatsRequest())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
