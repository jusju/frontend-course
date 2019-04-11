import React, { Component } from 'react';
import ReactTable from "react-table";
import 'react-table/react-table.css';
import AddCar from './AddCar';
import EditCar from './EditCar';
import SaveIcon from '@material-ui/icons/Save';
import TextField from '@material-ui/core/TextField';
import { Typography } from "@material-ui/core";
import Snackbar from '@material-ui/core/Snackbar';
import { CSVLink, CSVDownload } from "react-csv";

class CarList extends Component {
    constructor(props) {
        super(props);
        this.state = { cars: [], open: 'false', message: '' };
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
    deleteCar = (carLink) => {
        if (window.confirm("Are you sure?")) {
            fetch(carLink.original._links.self.href, { method: 'DELETE' })
                .then(res => this.loadCars())
                .then(res => this.setState({open: true, message: 'Car deleted'}))
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
            .then(res => this.setState({open: true, message: 'Car added'}))
            .catch(err => console.error(err));
    }
    updateCar = (link, updatedCar) => {
        fetch(link, 
            { 
                method: 'PUT',

                headers: {
                    'Content-Type': 'application/json'
                },
              body: JSON.stringify(updatedCar)
            })
            .then(res => this.loadCars())
            .then(res => this.setState({open: true, message: 'Changes saved'}))
            .catch(err => console.error(err));
    }

    handleClose = () => {
        this.setState({open: false})
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
                Cell: ({ value, row }) => (
                    <EditCar updateCar={this.updateCar} link={value} car={row} />
                )
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
                <CSVLink data={this.state.cars} separator={";"}>Download cars</CSVLink>
                <ReactTable filterable={true} data={this.state.cars} columns={columns} />
                <Snackbar
                    anchorOrigin={{   
                    vertical: 'bottom',
                    horizontal: 'left',
                    }}
                open={this.state.open}
                autoHideDuration={3000}
                onClose={this.handleClose}
                message={this.state.message}                 
                 />
            </div>
        );
    }
}

export default CarList;