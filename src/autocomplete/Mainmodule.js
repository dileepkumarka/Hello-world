import React, { Component } from 'react';
import Autocomplete from './Autocomplete';
import PersonalStatus from './Personalstatus';
import EducationStatus from './Educationstatus'
// import Listitem from './Listitem';

export class Mainmodule extends Component {

    constructor(props) {
        super(props);
        this.state = {
            education: [],
            personal: [],
            dataSource: []
        };
    }

    myCallback = (dataFromChild) => {
        console.log(dataFromChild, "childata");
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
                        this.setState({ dataSource: res.reviewArr, education: res.reviewArr[0], personal: res.reviewArr[1] })
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
                <Autocomplete callbackFromParent={this.myCallback.bind(this)} suggestionData={["Apple", "Orange", "Food", "Trest"]} />
                <PersonalStatus personal={this.state.personal} />
                <EducationStatus education={this.state.education} />
                <ul>
                    <li>Sanju</li>
                    <li>Akhil</li>
                    <li>Jovish</li>
                </ul>
                {/* <div>  {searchItem}</div> */}
                {/* <Listitem reactProp={this.state.dataSource} /> */}
            </div>
        );
    }
}
export default Mainmodule;