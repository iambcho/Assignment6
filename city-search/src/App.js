import React, {Component} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import './App.css';

class Result extends Component {
    constructor(props) {
	super(props);
    }   

    render() {
	return(
	       <div>
	       <h3> {this.props.city} </h3>
	       <ul>
	       <li> Location: ({this.props.longitude}, {this.props.latitude}) </li>
	       <li> Wages: {this.props.wages} </li>
	       <li> Population: {this.props.population} </li>
	       </ul>
	       </div>
	       );
    }
}

Result.propTypes = {
    city: PropTypes.string,
    longitude: PropTypes.string,
    latitude: PropTypes.string,
    population: PropTypes.string,
    wages: PropTypes.string,
    id: PropTypes.string
};

Result.defaultProps = {
    city: "",
    longitude: "",
    latitude: "",
    population: "",
    wages: "",
};

class Searcher extends Component {
    constructor(props) {
	super(props);
	this.state = {
	    zip: "",
	    data: []
	}	
	this.changeHandler = this.changeHandler.bind(this);
	this.search = this.search.bind(this);
    }
    
    changeHandler(event) {	
	this.setState({zip: event.target.value});
    }
    
    search() {
	axios.get("http://ctp-zip-api.herokuapp.com/zip/" + this.state.zip)
	    .then((response) => {
		    this.setState({data:response["data"]});
		    console.log(this.state.data);
		})
	    .then((error) => {
		    console.log(error);
		});
    }
    
    render() {
	var results = this.state.data.map((element) => <Result city={element.City} latitude={element.Lat} longitude={element.Long} population={element.EstimatedPopulation} wages={element.TotalWages} key={element.RecordNumber}/>);
	
	if (results.length === 0) {
	    return (
		    <div>
		    
		    <input type="text" onChange={this.changeHandler}/> <br/>
		    <button onClick={this.search}> Submit </button>

		    </div>
		    );	
	}
	else {
	    return (
		    <div>
		    
		    <input type="text" onChange={this.changeHandler}/> <br/>
		    <button onClick={this.search}> Submit </button>
		    <div> {results} </div>
		    </div>
		    );
	}
    }
}

function App() {
    return (
            <div class="App-header">
             <Searcher/>
             </div>
	    );
}

export default App;
