import React, { Component } from 'react';
import './Autocomplete.css';

export class Autocomplete extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeSuggestion: 0,
            filteredSuggestions: [],
            showSuggestions: false,
            userInput: ''
        };
    }

    onChange = (e) => {
        const { suggestions } = this.props;
        const userInput = e.currentTarget.value;

        const filteredSuggestions = suggestions.filter(
            (suggestion) =>
                suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
        );

        this.setState({
            activeSuggestion: 0,
            filteredSuggestions,
            showSuggestions: true,
            userInput: e.currentTarget.value
        });
    };

    onClick = (e) => {
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
            child[activeSuggestion ].style.backgroundColor = "#efefef"
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