import React, { Component } from 'react';

class CarList extends Component {
    constructor(props) {
        super(props);
        this.state = {cars: []};
    }
    
    // cdm Fetch cars
    componentDidMount() {
        fetch('https://carstockrest.herokuapp.com/cars')
        .then(response => response.json())
        .then(jsondata => this.setState({cars: jsondata._embedded.cars}))
        .catch(err => console.error(err));
    }
    

    render() {
const rows = this.state.cars.map((item,i) => <tr key={i}><td>{item.brand}</td><td>{item.model}</td></tr>);
        return (
            <div>
                <table><tbody>
                {rows}    
                </tbody></table>
                List of cars
            </div>
        );
    }
}

export default CarList;