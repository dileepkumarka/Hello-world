import React, { Component } from 'react';
import Autocomplete from './Autocomplete';
// import Listitem from './Listitem';

class NavItem extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(ev, e) {
        ev.preventDefault();
        ev.stopPropagation();
        this.props.onCategorySelection(e);
    }

    render() {
        const { data } = this.props;
        return (
            <li onClick={(event) => this.handleClick(event, data.queryStringParam)}>
                <a href="!#"> {data.label} ({data.count}) </a>
                {
                    data['subCategory'] && data['subCategory'].length ? (
                        <ul> {data['subCategory'].map((s, _index) => (<li key={_index} onClick={(event) => this.handleClick(event, s.queryStringParam)}><a href="!#">{s.label} ({s.count})</a></li>))}</ul>
                    ) : ''
                }
            </li>
        )
    }
}

class NavList extends Component {
    constructor(props) {
        super(props);
        this.handleCategorySelection = this.handleCategorySelection.bind(this);
    }

    handleCategorySelection(e) {
        this.props.onCategoryClick(e);
    }

    render() {
        return <ul>{this.props.data.map((res, index) => <NavItem key={index.toString()} data={res} onCategorySelection={this.handleCategorySelection} />)}</ul>
    }
}

export class Mainmodule extends Component {

    constructor(props) {
        super(props);
        this.state = {
            response: [],
            dataSource: []
        };
    }

    manipulateResponse = (facets) => {
        const data = facets.find(f => f.name === "Site sections");
        if (data) {
            let sectionList = data.allValues.map(d => {
                const facet = facets.find(f => f.name === d.label);
                if (facet) {
                    d['subCategory'] = facet.allValues;
                }
                return d;
            })
            this.setState({ response: sectionList || [] });
        }
    }

    componentDidMount() {
        console.log("loaded");
        fetch('http://medibank-search.clients.funnelback.com/s/search.json?profile=_default&query=insurance&collection=medibank&num_ranks=500')
            .then(response => response.json())
            .then((res) => {
                console.log("res", res);
                this.manipulateResponse(res.response.facets);
            })
            .catch((err) => {
                console.log("res", err);
            })
    }

    myCallback = (dataFromChild) => {
        fetch('http://medibank-search.clients.funnelback.com/s/search.json?profile=_default&query=insurance&collection=medibank&num_ranks=500')
            .then((response) => response.json())
            .then((res) => {
                console.log(res, "api")
            })
            .catch((err) => {
                console.log("Failed to fetch unhappy customer list", err);
            })
    }

    handleCategoryClick = (e) => {
        alert(e);
    }

    render() {
        const { dataSource } = this.state;
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
                <div>  {searchItem}</div>
                {/* <Listitem reactProp={this.state.dataSource} /> */}
                <NavList data={this.state.response} onCategoryClick={this.handleCategoryClick} />
            </div>
        );
    }
}

export default Mainmodule;