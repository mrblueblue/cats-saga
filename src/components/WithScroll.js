import React from "react"

const LIMIT_MULTIPLIER = 0.8
const THROTTLE_LIMIT = 300


function throttle(callback, limit) {
  let wait = false;
  return function () {
    if (!wait) {
      callback();
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
      const scrollTop = window.pageYOffset;
      const scrollPosition = scrollTop + document.documentElement.clientHeight;
      const delta = document.documentElement.offsetHeight - scrollPosition;
      const limit = document.documentElement.clientHeight * LIMIT_MULTIPLIER;
      if (delta < limit){
        this.props.onScroll()
      }
    }, THROTTLE_LIMIT)

    window.addEventListener('scroll', this.onScroll, false)
  }

  componentWillUnmount () {
    window.removeEventListener('scroll', this.onScroll, false)
  }

  render () {
    return <div>{this.props.children}</div>
  }
}
