import React, { Component, Fragment } from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';
import ReactDOM from 'react-dom';
import 'react-bootstrap-typeahead/css/Typeahead.css';
export default class Typehead extends Component {
    constructor(props) {
        super(props)
        this.state={
            selected: [],
        }
    }
    render() {
        const options = ["sanju", "sri"]
        return (
            <Typeahead
        {...this.state}
        id="basic-example"
        onChange={selected => this.setState({ selected })}
        options={options}
        placeholder="Choose a state..."
      />
        )
    }
}