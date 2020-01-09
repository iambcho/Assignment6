import React, {Component} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import './App.css';

class Searcher extends Component {
    constructor(props) {
	super(props);

	this.state = {
	    stateUS: this.props.stateUS,
	    lat: this.props.lat,
	    lon: this.props.lon,
	    pop: this.props.pop,
	}
	
	this.search = this.search.bind(this);
    }

    search() {
	axios.get("http://ctp-zip-api.herokuapp.com/zip/" + document.getElementById("inputZipcode").value)
	    .then((response) => {
		    console.log(response["data"]);
		    response["data"].forEach(
		    	address => {
		    		this.state.stateUS.push(address["State"]);
		    		this.state.lat.push(address["Lat"]);
		    		this.state.lon.push(address["Long"]);
		    		this.state.pop.push(address["EstimatedPopulation"]);
		    	}
		    )
		    // console.log(this.state.stateUS);
		    // console.log(this.state.lat);
		    // console.log(this.state.lon);
		    // console.log(this.state.pop);
		})
	    .then((error) => {
		    console.log(error);
		})
    }

    //http://ctp-zip-api.herokuapp.com/zip/11374

    render() {
	return (
		<div>
			Zip Code Searcher <br/>
			<input type="text" id="inputZipcode"/> <br/>
			<button onClick={this.search}> Search </button>
			<div> 
				{this.state.stateUS[0]} 
				{this.state.lat[0]}
				{this.state.lon[0]}
				{this.state.pop[0]}
			</div>
		</div>
		);
		
    }
}

Searcher.propTypes = {
    stateUS: PropTypes.array,
    lat: PropTypes.array,
    lon: PropTypes.array,
    pop: PropTypes.array
};

Searcher.defaultProps = {
    stateUS: [],
    lat: [],
    lon: [],
    pop: []
}

function App() {
    return ( 
	    <div class="App-header">
	     <Searcher/>
	     </div>
	     );
}

export default App;
