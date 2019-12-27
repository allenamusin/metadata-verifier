import React from 'react';

export default class Tab extends React.Component {
    render() {
        const {val, current} = this.props;
        const label = [
            'UPLOAD',
            'REVIEW',
        ][val];
        let className = 'item';
        if (current == val) {
            className += ' val';
        }
        return (
            <div herf="" class={className}>STEP {val+1} - {label} </div>
        );
    }
}
