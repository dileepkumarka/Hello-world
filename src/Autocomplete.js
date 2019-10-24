import React, { Component } from 'react';
import './Autocomplete.css';

export class Autocomplete extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeSuggestion: 0,
            filteredSuggestions: [],
            showSuggestions: false,
            userInput: '',
            suggestions: []
        };
    }

    onChange = (e) => {
        const userInputLocal = e.currentTarget.value;
        this.setState({userInput:userInputLocal});
        console.log(userInputLocal.length+ "" +userInputLocal);

        if (userInputLocal.length >= 2) {
            this.fetchApi(userInputLocal);
        }
    };

    fetchApi = (userInput) => {
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
                    const dataArray = this.attrArray(res.reviewArr);
                    const filteredSuggestions = dataArray.filter(
                        (suggestion) =>
                            suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
                    );
                    this.setState({
                        activeSuggestion: 0,
                        filteredSuggestions,
                        showSuggestions: true,
                        userInput: userInput
                    });
                    this.setState({ suggestions: res.reviewArr })
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

    attrArray = (suggestions) => {
        const data = [];
        suggestions.map((res) => {
            data.push(res.customer_name)
        })
        return data;
    }
    onClick = (e) => {
        this.props.callbackFromParent("listInfo");
        this.setState({
            activeSuggestion: 0,
            filteredSuggestions: [],
            showSuggestions: false,
            userInput: e.currentTarget.innerText
        });
    };

    onKeyDown = (e) => {
        const { activeSuggestion, filteredSuggestions } = this.state;

        if (e.keyCode === 13) {
            this.props.callbackFromParent("listInfo");
            this.setState({
                activeSuggestion: 0,
                showSuggestions: false,
                userInput: filteredSuggestions[activeSuggestion]
            });
        }
        else if (e.keyCode === 38) {
            if (activeSuggestion === 0) {
                return;
            }
            let x = document.querySelectorAll("li");
            for (let i = 0; i < x.length; i++) {
                x[i].style.backgroundColor = "#fff";
            }
            let par = document.getElementById("abc")
            let child = par.querySelectorAll("li")
            child[activeSuggestion].style.backgroundColor = "#efefef"
            this.setState({ activeSuggestion: activeSuggestion - 1 });
        }
        else if (e.keyCode === 40) {
            if (activeSuggestion - 1 === filteredSuggestions.length) {
                return;
            }
            let x = document.querySelectorAll("li");
            for (let i = 0; i < x.length; i++) {
                x[i].style.backgroundColor = "#fff";
            }
            let par = document.getElementById("abc")
            let child = par.querySelectorAll("li")
            child[activeSuggestion + 1].style.backgroundColor = "#efefef"
            this.setState({ activeSuggestion: activeSuggestion + 1 });
        }
    };

    handleClick = () => {
        alert(this.state.userInput);
    }

    render() {
        const {
            onChange,
            onClick,
            onKeyDown,
            state: {
                filteredSuggestions,
                showSuggestions,
                userInput
            }
        } = this;

        let suggestionsListComponent;
        if (showSuggestions && userInput) {
            if (filteredSuggestions.length) {
                suggestionsListComponent = (
                    <ul id="abc" className="Suggestions">
                        {filteredSuggestions.map((suggestion, index) => {

                            return (
                                <li key={suggestion} onClick={onClick}>
                                    {suggestion}
                                </li>
                            );
                        })}
                    </ul>
                );
            } else {
                suggestionsListComponent = (
                    <div >
                        <em>No suggestions!</em>
                    </div>
                );
            }
        }
        return (
            <React.Fragment>
                <input
                    type="text"
                    className="inputField"
                    onChange={onChange}
                    onKeyDown={onKeyDown}
                    value={userInput}
                />
                <button onClick={this.handleClick}>
                    Search result
                </button>
                {suggestionsListComponent}
            </React.Fragment>
        );
    }
}
export default Autocomplete;