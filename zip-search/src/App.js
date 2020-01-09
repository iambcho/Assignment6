import React, {Component} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import './App.css';

class CitySearcher extends Component {
    constructor(props) {
	    super(props);

      this.state = {
          data: this.props.data
      }
	
	    this.search = this.search.bind(this);
    }

    search() {
      axios.get("http://ctp-zip-api.herokuapp.com/city/" + (document.getElementById("inputCity").value).toUpperCase())
          .then((response) => {
            console.log(response);
        })
          .then((error) => {
            console.log(error);
        })
    }

    render() {
	return (
		<div>
		City Searcher <br/>
		<input type="text" id="inputCity"/> <br/>
		<button onMouseDown={this.search}> Search </button>
		<div> {this.state.data} </div>
		</div>
		);
		
    }
}

CitySearcher.propTypes = {
    data: PropTypes.array
};

CitySearcher.defaultProps = {
    data: []
}

function App() {
    return ( 
	    <div class="App-header">
	     <CitySearcher/>
	     </div>
	     );
}

export default App;

 