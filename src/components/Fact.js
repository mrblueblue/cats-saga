import React from "react"

export default function Fact (props) {
  if (props.loading) {
    return (
      <div className="animated-background" style={{height: 140, width: 440}}>
        <div className="background-masker content-first-line"/>
        <div className="background-masker content-second-line"/>
        <div className="background-masker content-third-line"/>
        <div className="background-masker content-fourth-line"/>
      </div>
    )
  } else {
    return <p className="cat-fact">{props.text}</p>
  }
}
