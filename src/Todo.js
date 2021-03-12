import { Button, List, ListItem, ListItemText } from "@material-ui/core";
import React from "react";
import db from "./firebase";
import "./Todo.css";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

function Todo(props) {
  return (
    <div>
      <List className="todo__list" aria-label="contacts">
        <ListItem>
          <ListItemText primary="Todo task" secondary={props.text} />
        </ListItem>
        <DeleteForeverIcon
          onClick={() => db.collection("Todos").doc(props.id).delete()}
        />
      </List>
    </div>
  );
}

export default Todo;
