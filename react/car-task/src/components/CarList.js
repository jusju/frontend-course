import React, { Component } from 'react';
import ReactTable from "react-table";
import 'react-table/react-table.css';
import AddCar from './AddCar';
import SaveIcon from '@material-ui/icons/Save';
import TextField from '@material-ui/core/TextField';
import { Typography } from "@material-ui/core";

class CarList extends Component {
    constructor(props) {
        super(props);
        this.state = { cars: [] };
    }

    // cdm Fetch cars
    componentDidMount() {
        this.loadCars();
    }

    loadCars = () => {
        fetch('https://carstockrest.herokuapp.com/cars')
            .then(response => response.json())
            .then(jsondata => this.setState({ cars: jsondata._embedded.cars }))
            .catch(err => console.error(err));
    }

    deleteCar = (carLink) => {
        if (window.confirm("Are you sure?")) {
            fetch(carLink.original._links.self.href, { method: 'DELETE' })
                .then(res => this.loadCars())
                .catch(err => console.error(err))
            //console.log(carLink.original._links.self.href);
        }
    }
    saveCar = (car) => {
        fetch('https://carstockrest.herokuapp.com/cars', 
            { 
                method: 'POST',

                headers: {
                    'Content-Type': 'application/json'
                },
              body: JSON.stringify(car)
            })
            .then(res => this.loadCars())
            .catch(err => console.error(err));
    }

    render() {
        const rows = this.state.cars.map((item, i) => <tr key={i}><td>{item.brand}</td><td>{item.model}</td></tr>);
        const columns = [
            {
                Header: 'Brand',
                accessor: 'brand'
            },
            {
                Header: 'Model',
                accessor: 'model'
            },
            {
                Header: 'Color',
                accessor: 'color'
            },
            {
                Header: 'Fuel',
                accessor: 'fuel'
            },
            {
                Header: 'Year',
                accessor: 'year'
            },
            {
                Header: 'Price',
                accessor: 'price'
            },
            {
                Header: '',
                accessor: '_links.self.href',
                Cell: value => <button onClick={() => this.deleteCar(value)}>Delete</button>
            },
        ];
        return (
            <div>
                <AddCar saveCar={this.saveCar} />
                <ReactTable filterable={true} data={this.state.cars} columns={columns} />
            </div>
        );
    }
}

export default CarList;