import React, { Component, Alert } from "react";
import "./App.css";
import ReactTable from 'react-table';
import 'react-table/react-table.css';

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
    console.log(row);
    this.setState({
      todos: this.state.todos.filter((todo, i) => i !== row.index)
    });
  };

  render() {

    
    return (
      <div className="App">
        <div className="App-header">
          <h2>Simple Todolist</h2>
        </div>
        <div>
          <form onSubmit={this.addTodo}>
            <fieldset>
              <legend>Add todo:</legend>
              Description:
              <input
                type="text"
                name="description"
                onChange={this.inputChanged}
                value={this.state.description}
              />
              Date:
              <input
                type="date"
                name="date"
                onChange={this.inputChanged}
                value={this.state.date}
              />
              <input type="submit" value="Add" />
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
        Cell: row => <button onClick={() => this.props.deleteItem(row)}>Delete</button>
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
                  <button id={index} onClick={this.props.methodToDo}>
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


