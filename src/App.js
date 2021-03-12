import "./App.css";
import { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import { FormControl, Input, InputLabel } from "@material-ui/core";
import Todo from "./Todo";
import db from "./firebase";
import firebase from "firebase";

function App() {
  const [input, setInput] = useState([""]);
  const [Todos, setTodo] = useState([]);

  //when app load we need to load data from database and update/remove get fetches todo data

  useEffect(() => {
    db.collection("Todos")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setTodo(
          snapshot.docs.map((doc) => ({ id: doc.id, todo: doc.data().Todo }))
        );
      });
  }, []);
  let handleChange = (e) => {
    setInput(e.target.value);
  };
  let AddTodo = (e) => {
    //this will fire when submit click
    e.preventDefault(); //this will prevent from refresh
    db.collection("Todos").add({
      Todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInput("");
  };
  return (
    <div className="App">
      <div className="app">
        <h1>Hello Add your Todo items here</h1>
        <form>
          <FormControl className="white">
            <InputLabel htmlFor="Write your Todos">Write your Todos</InputLabel>
            <Input
              className="white"
              value={input}
              onChange={(event) => handleChange(event)}
              placeholder="Enter your text"
            />
          </FormControl>
          <Button
            type="submit"
            onClick={AddTodo}
            variant="contained"
            color="primary"
            disabled={!input}
          >
            Add Todo
          </Button>
        </form>
        <ul className="white">
          {Todos.map((todo) => (
            <Todo id={todo.id} key={todo.id} text={todo.todo} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
