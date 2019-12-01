import React, { Component } from "react";

export default class Review extends Component {
  render() {
    const {val, current} = this.props;
    return (
       <div >
          <p> You are on the Review tab. Check that your information is correct. </p>
       </div>
    );
  }
}
