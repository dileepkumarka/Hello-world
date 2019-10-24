import React, { Component } from 'react';
import Autocomplete from './Autocomplete';
// import Listitem from './Listitem';

export class Mainmodule extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataSource: []
        };
    }

    myCallback = (dataFromChild) => {
        fetch(`http://irateu.in:8080/api/unhappylist/${encodeURIComponent('5d84e063fe29594a592be4a8')}/${encodeURIComponent('5d84e221fe29594a592be4ab')}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwiaWQiOiI1ZDg0ZTM4MGZiYjJiZTc2ZWNlMzU4MWIiLCJleHAiOjE1NzIyNTk0NTYsImlhdCI6MTU3MTgyNzQ1Nn0.0BeNzYs5hh_UN7IqlWhasy_z7mehhz0jVLv5ZNchBHA`
            },
        })
            .then((response) => response.json())
            .then((res) => {
                if (res.success === true) {
                    if (res.reviewArr.length <= 0) {
                    }
                    else {
                        this.setState({ dataSource: res.reviewArr })
                    }
                }
                else {
                    console.log("Something wrong in unhappy customer page!");
                }
            })
            .catch((err) => {
                console.log("Failed to fetch unhappy customer list", err);
            })
    }
    render() {
        const { dataSource } = this.state
        let searchItem;
        if (dataSource.length <= 0) { console.log("no data"); }

        else {
            searchItem = (
                <ul id="abc" className="Suggestions">
                    {dataSource.map((res, index) => {

                        return (
                            <li key={res._id}>
                                {res.customer_name}
                            </li>
                        );
                    })}
                </ul>
            );
        }

        return (
            <div className="App">
                <Autocomplete callbackFromParent={this.myCallback.bind(this)} />
                <div>  {searchItem}</div>
                {/* <Listitem reactProp={this.state.dataSource} /> */}
            </div>
        );
    }
}
export default Mainmodule;