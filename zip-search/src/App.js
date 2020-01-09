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
            console.log(typeof response);
            console.log(response.data);
            console.log(response.data[0]);

            // let table = [];

            // for(let i = 0; i < response.data.length; i++) {
            //   console.log(response.data[i]);
            //   table.push(<h3>{response.data[i]}</h3>)
            // }
            

            
            this.setState({ data: response.data });
            

        })
          .then((error) => {
            console.log(error);
        })
    }

    // createTable = () => {

    //   if(this.state.data.length > 0) {

    //     for (let i = 0; i < 3; i++) {
    //       let children = []
    //       //Inner loop to create children
    //       for (let j = 0; j < 5; j++) {
    //         children.push(<td>{`Column ${j + 1}`}</td>)
    //       }
    //       //Create the parent and add the children
    //       table.push(<tr>{children}</tr>)
    //     }
    //     return table

    //   }

    // }

    render() {

	return (
    
		<div>
		City Searcher <br/>
		<input type="text" id="inputCity"/> <br/>
		<button onMouseDown={this.search}> Search </button>
		{/* <div> {this.state.data} </div> */}
    {this.state.data.map(zip => <div key={zip}><h3>{zip}</h3></div>)}
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

 