import React, {Component} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import './App.css';

class Searcher extends Component {
    constructor(props) {
	super(props);

	this.state = {
	    data: this.props.data
	}
	
	this.search = this.search.bind(this);
    }

    search() {
	axios.get("http://ctp-zip-api.herokuapp.com/zip/" + document.getElementById("inputZipcode").value)
	    .then((response) => {
		    //this.setState({data: response});
		    console.log(response);
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
		<button onMouseDown={this.search}> Search </button>
		<div> {this.state.data} </div>
		</div>
		);
		
    }
}

Searcher.propTypes = {
    data: PropTypes.array
};

Searcher.defaultProps = {
    data: []
}

function App() {
    return ( 
	    <div class="App-header">
	     <Searcher/>
	     </div>
	     );
}

export default App;
