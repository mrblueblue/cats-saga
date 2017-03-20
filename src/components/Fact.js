import React from "react"

export default function Fact (props) {
  if (props.loading) {
    return (
      <div className="animated-background" style={{height: 140, width: 440}}>
        <div className="background-masker content-first-line"></div>
        <div className="background-masker content-second-line"></div>
        <div className="background-masker content-third-line"></div>
        <div className="background-masker content-fourth-line"></div>
      </div>
    )
  } else {
    return <p className="cat-fact">{props.text}</p>
  }
}
