import React, { Component } from 'react';

export default class PersonalStatus extends Component {
    render() {
        console.log(this.props.personal, "personalStatus");
        return (
            <React.Fragment>
                {/* <div>Personal status works</div> */}
            </React.Fragment>
        )
    }
}