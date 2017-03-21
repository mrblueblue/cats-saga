import React, { Component } from 'react';
import {connect} from "react-redux"
import {deleteCat, fetchCatsRequest} from "../redux/cat-duck"
import AnimatedCat from "./Cat"
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
          <ul className="App-content documents-list swing">
            {this.props.list.map((item, index) => (
              <AnimatedCat
                key={index}
                {...item}
                transitionName="animated-cat"
                onDidLeave={() => this.props.deleteCat(this.props.index)}
              />
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
    },
    deleteCat (index) {
      dispatch(deleteCat(index))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
