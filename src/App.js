import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import axios from "axios";
import uuid from "uuid";

import "./App.css";
import Header from "./components/layout/Header";
import Todos from "./components/Todos";
import AddTodo from "./components/AddTodo";
import About from "./components/pages/About";
// import { V4MAPPED } from "dns";

class App extends React.Component {
  state = {
    todos: []
  };

  componentDidMount() {
    axios
      .get("https://jsonplaceholder.typicode.com/todos")
      // axios.get('http://localhost:4000/results?_limit=10')
      .then(res =>
        // // console.log(res.data)
        this.setState({ todos: res.data })
      );
  }

  // Toggle check box todo (completed)
  checkedInput = id => {
    // // console.log(id)
    this.setState({
      todos: this.state.todos.map(todo => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
        return todo;
      })
    });
  };

  deleteTodo = id => {
    axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`).then(res =>
      this.setState({
        todos: [...this.state.todos.filter(todo => todo.id !== id)]
      })
    );

    // this.setState({
    // //   todos: [...this.state.todos.filter(todo => todo.id !== id)]
    // });
  };

  addTodo = title => {
    // // console.log(title)
    // const newTodo = {
    //   id:uuid.v4(),
    //   title: title,
    //   completed: false
    // }
    axios
      .post("https://jsonplaceholder.typicode.com/todos", {
        id: uuid.v4(),
        title: title,
        completed: false
      })
      .then(res =>
        this.setState({
          todos: [res.data, ...this.state.todos]
        })
      );
    // // this.setState({ todos: [...this.state.todos, newTodo]})
  };

  render() {
    // // console.log(this.state.todos);
    return (
      <Router basename={`${process.env.PUBLIC_URL}`}>
        <div className='App'>
          <div className='container'>
            <Header />
            <Route
              exact
              path='/'
              render={routerProps => (
                <React.Fragment>
                  <AddTodo routerProps={routerProps} addTodo={this.addTodo} />
                  <Todos
                    routerProps={routerProps}
                    todos={this.state.todos}
                    checkedInput={this.checkedInput}
                    deleteTodo={this.deleteTodo}
                  />
                </React.Fragment>
              )}
            />
            <Route path='/about' component={About} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
