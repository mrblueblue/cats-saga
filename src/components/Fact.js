import React from "react"

export default class Fact extends React.Component {
  render () {
    if (this.props.loading) {
      return (
        <div className="animated-background" style={{height: 80}}>
          <div className="background-masker content-first-line"/>
          <div className="background-masker content-second-line"/>
          <div className="background-masker content-third-line"/>
          <div className="background-masker content-fourth-line"/>
        </div>
      )
    } else {
      return <p className="cat-fact">{this.props.text}</p>
    }
  }
}
