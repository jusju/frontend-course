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

class AddCar extends Component {
    constructor(props) {
        super(props);
        this.state = { open: false , model: '', brand: '', color: '', fuel: '', year: '', price: ''};
    }

    handleClickOpen = () => {
        this.setState({ open: true });
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
        this.props.saveCar(newCar);
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
                    <DialogTitle id="form-dialog-title">New car</DialogTitle>
                    <DialogContent>

                        <TextField onChange={this.handleChange} autoFocus name="brand"
                            margin="dense"
                            id="brand"
                            label="Brand"
                            fullWidth
                        />
                        <TextField onChange={this.handleChange}
                            autoFocus
                            name="model"
                            margin="dense"
                            id="name"
                            label="Model"
                            fullWidth
                        />
                        <TextField onChange={this.handleChange}
                            autoFocus
                            name="color"
                            margin="dense"
                            id="name"
                            label="Color"
                            fullWidth
                        />
                        <TextField onChange={this.handleChange}
                            autoFocus
                            name="fuel"
                            margin="dense"
                            id="name"
                            label="Fuel"
                            fullWidth
                        />
                        <TextField onChange={this.handleChange}
                            autoFocus
                            name="year"
                            margin="dense"
                            id="name"
                            label="Year"
                            type="email"
                            fullWidth
                        />
                        <TextField onChange={this.handleChange}
                            autoFocus
                            name="price"
                            margin="dense"
                            id="name"
                            label="Price"
                            type="email"
                            fullWidth
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
                <Button onClick={this.handleClickOpen}>ADD CAR <SaveIcon /></Button>
            </div>
        );
    }
}

export default AddCar;