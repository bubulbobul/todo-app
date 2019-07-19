import React from 'react';
import TodoItem from './TodoItem';
import PropTypes from 'prop-types';

class Todos extends React.Component {

  render() {
    const todos = this.props.todos;
    // // console.log(todos)
    return (
      todos.map(todo => (
        <TodoItem 
          key={todo.id} 
          todo={todo}
          checkedInput={this.props.checkedInput}
          deleteTodo={this.props.deleteTodo}
        />
      ))
    );
  }
}

Todos.propTypes = {
  todos: PropTypes.array.isRequired,
  checkedInput: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired
}

export default Todos;
