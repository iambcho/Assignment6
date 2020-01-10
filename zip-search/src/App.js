import React, {Component} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import './cardStyle.css'
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
            this.setState({ data: response.data });
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
          {this.state.data.map(zip => 
            <div key={zip} class="card">
                <p align="center"><b>{zip}</b></p>
            </div>
          )}
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

 