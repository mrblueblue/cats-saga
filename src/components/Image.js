import React from "react"

export default class Image extends React.Component {

  static defaultProps = {
    onError: () => {},
    onLoad: () => {}
  }

  state = {
    error: false,
    loading: true
  }

  handleError = () => {
    this.setState({error: true})
    this.props.onError()
  }

  handleLoad = () => {
    this.setState({loading: false})
    this.props.onLoad()
  }

  render () {
    if (this.state.error) {
      return <div/>
    }

    return (
        <div>
          {this.state.loading && (
            <div className="cat-thumbnail animated-background"/>
          )}
          <img
            alt=""
            className={`${this.state.loading && "hide"} cat-thumbnail`}
            src={this.props.url}
            onError={this.handleError}
            onLoad={this.handleLoad}
          />
        </div>
    )
  }
}
