import React from "react"
import TransitionGroup from "react-addons-transition-group"

const DEFAULT_TRANSITION_LEAVE_TIMEOUT = 250

export class AnimationHandler extends React.Component {

  addClass = (className) => {
    this.animationRef.classList.toggle(className)
  }

  setupAnimationRef = (n) => {
    this.animationRef = n
  }

  componentWillEnter (callback) {
    setTimeout(() => {
      this.addClass(`${this.props.transitionName}-enter-active`)
      callback()
    }, 300)
  }

  componentWillLeave (callback) {
    this.addClass(`${this.props.transitionName}-leave`)
    this.addClass(`${this.props.transitionName}-leave-active`)
    this.timeout = setTimeout(() => {
      this.props.onDidLeave()
      callback()
    }, this.props.transitionLeaveTimeout)
  }

  componentWillUnmount () {
    clearTimeout(this.timeout)
  }

  render () {
    return <div className={`${this.props.transitionName}-enter`} ref={this.setupAnimationRef}>{this.props.children}</div>
  }
}

export default function WithAnimation (BaseComponent) {

  return class WithAnimationContainer extends React.Component {

    static defaultProps = {
      onDidLeave: () => {},
      transitionLeaveTimeout: DEFAULT_TRANSITION_LEAVE_TIMEOUT
    }

    state = {
      hidden: false,
      mounted: false
    }

    hideBaseComponent = () => {
      this.setState({hidden: true})
    }

    render () {
        let children = null

        if (!this.state.hidden && this.state.mounted) {
          children = (
            <AnimationHandler
              transitionLeaveTimeout={this.props.transitionLeaveTimeout}
              transitionName={this.props.transitionName}
              onDidLeave={this.props.onDidLeave}>
              <BaseComponent
                {...this.props}
                removeElement={this.hideBaseComponent}
              />
            </AnimationHandler>
          )
        }

        return (
          <TransitionGroup className={this.props.transitionName}>
            {children}
          </TransitionGroup>
        )
    }

    componentDidMount () {
      this.setState({mounted: true})
    }
  }
}
