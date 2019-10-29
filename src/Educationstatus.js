import React, { Component } from 'react';

export default class EducationStatus extends Component {
    render() {
        console.log(this.props.education, 'educationStatus');
        // let parentData = [];
        // const { education } = this.props;
        // if (education.length <= 0) {
        //     parentData.push(<div key={1}>No data found</div>)
        // }
        // else {
        //     parentData.push(<div key={2}>{education}</div>)
        // }
        return (
            <React.Fragment>
                {/* <div>{parentData}</div> */}
            </React.Fragment>
        )
    }
}