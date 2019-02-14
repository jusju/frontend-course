import React from 'react';
const TodoTable = (props) => {
    const todos = props.todos.map((item, index) => <tr key={index}><td>{item.date}</td><td>{item.description}</td><td><button id={index} onClick={this.deleteItem}>Delete</button></td></tr>);
    return (
        <div>
            {todos}
        </div>
    );
}
export default TodoTable;