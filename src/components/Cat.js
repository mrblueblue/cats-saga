import React from "react"
import Image from "./Image"
import Fact from "./Fact"
import "./Cat.css"

export default class Cat extends React.Component {

  state = {
    imageError: false,
  }

  handleImageError = () => {
    this.setState({imageError: true})
  }

  render () {
    if (this.state.imageError) {
      return <div/>
    }

    return (
      <li className="cat-wrapper">
        <div className="cat-item">
            <div className="cat-content-left">
              <Image
                url={this.props.url}
                onError={this.handleImageError}
              />
            </div>
            <div className="cat-content-right">
              <Fact
                loading={this.props.loading}
                text={this.props.fact}
              />
            </div>
        </div>
      </li>
    )
  }
}
