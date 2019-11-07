import React, { Component, Fragment } from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';
import ReactDOM from 'react-dom';
import 'react-bootstrap-typeahead/css/Typeahead.css';

import API from './api/api';
export default class Typehead extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: [],
            dataSource: []
        }
    }

    componentDidMount() {
        this.fetchApi()
    }

    fetchApi() {
        const dataSource = [];
        const params = {
            client_id: '5d84e063fe29594a592be4a8',
            branch_id: '5d84e221fe29594a592be4ab'
        }
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwiaWQiOiI1ZDg0ZTM4MGZiYjJiZTc2ZWNlMzU4MWIiLCJleHAiOjE1NzM1ODAwMTMsImlhdCI6MTU3MzE0ODAxM30._lqdwEzsQjJFwnmeSBG-KAoorYP1uMnrPMmr9wPxBAs'
        API('unhappylist', params, token)
            .then((res) => {
               res.reviewArr.map((e)=>{
                dataSource.push(e.customer_name)
                   this.setState({dataSource: dataSource})
               })
            })
            .catch((err) => {
                console.log("err", err);
            })
    }

    onChangeValue = (val) => {
        const params = {
            client_id: '5d84e063fe29594a592be4a8',
            branch_id: '5d84e221fe29594a592be4ab'
        }
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwiaWQiOiI1ZDg0ZTM4MGZiYjJiZTc2ZWNlMzU4MWIiLCJleHAiOjE1NzM1ODAwMTMsImlhdCI6MTU3MzE0ODAxM30._lqdwEzsQjJFwnmeSBG-KAoorYP1uMnrPMmr9wPxBAs'
        API('unhappylist', params, token)
            .then((res) => {
                console.log("res", res);
            })
            .catch((err) => {
                console.log("err", err);
            })
    }

    render() {
        const {dataSource} = this.state;
        return (
            <Typeahead
                {...this.state}
                id="basic-example"
                onChange={selected => this.onChangeValue(selected)}
                options={dataSource}
                placeholder="Select name"
            />
        )
    }
}