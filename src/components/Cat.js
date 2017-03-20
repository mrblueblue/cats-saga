import React from "react"
import Image from "./Image"
import Fact from "./Fact"
import deleteIcon from './delete.svg';
import "./Cat.css"

export default class Cat extends React.Component {

  state = {
    imageError: false,
  }

  handleImageError = () => {
    this.setState({imageError: true})
  }

  deleteCat = () => {
    this.setState({imageError: true})
    this.props.deleteCat(this.props.index)
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
            {!this.props.loading && (
              <img
                src={deleteIcon}
                onClick={this.deleteCat}
                className="delete-icon"
                alt="delete"
              />
            )}
        </div>
      </li>
    )
  }
}
