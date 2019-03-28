import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import SaveIcon from '@material-ui/icons/Save';
import { Typography } from "@material-ui/core";

class EditCar extends Component {
    constructor(props) {
        super(props);
        this.state = { open: false , model: '', brand: '', color: '', fuel: '', year: '', price: ''};
    }

    handleClickOpen = () => {
        this.setState({ 
            open: true,
            brand: this.props.car.brand,
            model: this.props.car.model,
            color: this.props.car.color,
            fuel: this.props.car.fuel,
            year: this.props.car.year,
            price: this.props.car.price
        });
        console.log(this.props.link);
        console.log(this.props.car);
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    };

    addCar = () => {
        const newCar = {
            model: this.state.model,
            brand: this.state.brand,
            color: this.state.color,
            fuel: this.state.fuel,
            year: this.state.year,
            price: this.state.price
        }
        this.props.updateCar(this.props.link, newCar);
        this.handleClose();
    };

    render() {
        return (
            <div>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Edit car</DialogTitle>
                    <DialogContent>

                        <TextField onChange={this.handleChange} autoFocus name="brand"
                            margin="dense"
                            id="brand"
                            label="Brand"
                            fullWidth
                            value={this.state.brand}
                        />
                        <TextField onChange={this.handleChange}
                            autoFocus
                            name="model"
                            margin="dense"
                            id="name"
                            label="Model"
                            fullWidth
                            value={this.state.model}
                        />
                        <TextField onChange={this.handleChange}
                            autoFocus
                            name="color"
                            margin="dense"
                            id="name"
                            label="Color"
                            fullWidth
                            value={this.state.color}
                        />
                        <TextField onChange={this.handleChange}
                            autoFocus
                            name="fuel"
                            margin="dense"
                            id="name"
                            label="Fuel"
                            fullWidth
                            value={this.state.fuel}
                        />
                        <TextField onChange={this.handleChange}
                            autoFocus
                            name="year"
                            margin="dense"
                            id="name"
                            label="Year"
                            type="email"
                            fullWidth
                            value={this.state.year}
                        />
                        <TextField onChange={this.handleChange}
                            autoFocus
                            name="price"
                            margin="dense"
                            id="name"
                            label="Price"
                            type="email"
                            fullWidth
                            value={this.state.price}
                        />
                       
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.addCar} color="primary">
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
                <Button onClick={this.handleClickOpen}>EDIT CAR <SaveIcon /></Button>
            </div>
        );
    }
}

export default EditCar;