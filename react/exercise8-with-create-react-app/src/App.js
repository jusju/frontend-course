import React, { Component, Alert } from "react";
import "./App.css";
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import TextField from '@material-ui/core/TextField';
import { Typography } from "@material-ui/core";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = { description: "", date: "", todos: [] };
  }

  inputChanged = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  addTodo = event => {
    event.preventDefault();
    const newTodo = {
      description: this.state.description,
      date: this.state.date
    };
    this.setState({
      todos: [...this.state.todos, newTodo]
    });
  };

  deleteItem = (row) => {
    //const index = parseInt(event.target.id);
    if(window.confirm("Are you sure?")) {
      console.log(row);
      this.setState({
        todos: this.state.todos.filter((todo, i) => i !== row.index)
      });
    }
  };

  render() {

    
    return (
      <div className="App">
      <AppBar position='static'>
      <Toolbar>
        <Typography variant="h6" color="inherit">
          TODOLIST
        </Typography>
      </Toolbar>
      
      </AppBar>
  
        <div>
          <form onSubmit={this.addTodo}>
            <fieldset>
              <legend>Add todo:</legend>
              
              <TextField
                type="text"
                label="Description"
                name="description"
                onChange={this.inputChanged}
                value={this.state.description}
              />
              
              <TextField 
                type="date" 
                label="Date" 
                InputLabelProps={{shrink: true,}} 
                name="date" 
                onChange={this.inputChanged} 
                value={this.state.date}
              />
 
              <Button size='small' onClick={this.addTodo} color="primary" variant='contained'>
                <SaveIcon/>
                Add
              </Button>
            </fieldset>
          </form>
        </div>
        <TodoTable todos={this.state.todos} deleteItem={this.deleteItem} />
      </div>
    );
  }
}

export class TodoTable extends Component {

  constructor (props) {
    super(props);

  }

  render() {
    const columns = [{
        Header: 'Date',
        accessor: 'date' ,// String-based value accessors!
        sortable: false
      }, {
        Header: 'Description',
        accessor: 'description'
      }, {
        Header: '',
        accessor: 'date',
        sortable: false,
        filterable: false,
        Cell: row => <Button color="secondary" onClick={() => this.props.deleteItem(row)}>Delete</Button>
        }
    ];
    return (
      <div className="App">
      <ReactTable data={this.props.todos} 
        columns={columns} filterable={true} sortable={true}
        defaultPageSize={10} />
        <table>
          <tbody>
            <tr>
              <th>Date</th>
              <th>Description</th>
            </tr>
            {this.props.todos.map((item, index) => (
              <tr key={index}>
                <td>{item.date }</td>
                <td>{item.description}</td>
                <td>
                  <button id={index} onClick={this.props.methodToDo} variant="raised" color="primary">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;


