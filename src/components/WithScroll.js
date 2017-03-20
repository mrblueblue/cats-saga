import React from "react"

function throttle(callback, limit) {
  var wait = false;
  return function () {
    if (!wait) {
      callback.call();
      wait = true;
      setTimeout(function () {
        wait = false
      }, limit);
    }
  }
}

export default class WithScroll extends React.Component {
  componentDidMount () {
    this.onScroll = throttle((e) => {
      var scrollTop = window.pageYOffset;
      var scrollPosition = scrollTop + document.documentElement.clientHeight;
      var delta = document.documentElement.offsetHeight - scrollPosition;
      var limit = document.documentElement.clientHeight * 0.8;
      if (delta < limit){
        this.props.onScroll()
      }
    }, 300)

    window.addEventListener('scroll', this.onScroll, false)
  }

  componentWillUnmount () {
    window.removeEventListener('scroll', this.onScroll, false)
  }

  render () {
    return this.props.children
  }
}
