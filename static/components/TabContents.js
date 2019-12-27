import React, { Component } from "react";
import Upload from './Upload';
import Review from './Review';

export default class TabContents extends Component {
    render() {
        const {val, current} = this.props;
        const message = [
            <Upload/>,
            <Review/>,
        ];
        return (
            <div >
                {message[current]}
            </div>
        );
    }
}
