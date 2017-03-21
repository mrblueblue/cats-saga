import React from "react"
import Image from "./Image"
import Fact from "./Fact"
import deleteIcon from './delete.svg';
import "./Cat.css"
import WithAnimation from "./WithAnimation"

export class Cat extends React.Component {

  state = {
    imageError: false
  }

  handleImageError = () => {
    this.setState({imageError: true})
  }

  render () {
    if (this.state.imageError) {
      return <div/>
    }

    return (
        <li className="cat-wrapper show">
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
              {!this.props.loading && (
                <img
                  src={deleteIcon}
                  onClick={this.props.removeElement}
                  className="delete-icon"
                  alt="delete"
                />
              )}
          </div>
        </li>
    )
  }
}

export default WithAnimation(Cat)
