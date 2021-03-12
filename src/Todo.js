import {
  Button,
  Input,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Modal,
} from "@material-ui/core";
import React, { useState } from "react";
import db from "./firebase";
import "./Todo.css";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import EditIcon from "@material-ui/icons/Edit";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: "35%",
    left: "30%",
  },
}));

function Todo(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [input, setinput] = useState(props.text);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const updateTodo = (e) => {
    e.preventDefault();
    db.collection("Todos").doc(props.id).set(
      {
        Todo: input,
      },
      { merge: true }
    );
    setOpen(false);
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className={classes.paper}>
          <form>
            <Input
              style={{ marginRight: "10px" }}
              value={input}
              onChange={(e) => setinput(e.target.value)}
              placeholder={props.text}
            />
            <Button
              type="submit"
              onClick={updateTodo}
              color="primary"
              variant="contained"
            >
              {" "}
              Update Todos{" "}
            </Button>
          </form>
        </div>
      </Modal>
      <List className="todo__list" aria-label="contacts">
        <ListItem>
          <ListItemText
            className="white"
            primary="Todo task"
            secondary={props.text}
          />
        </ListItem>
        <DeleteForeverIcon
          className="list__icon"
          variant="contained"
          color="secondary"
          onClick={() => db.collection("Todos").doc(props.id).delete()}
        />
        <EditIcon
          className="list__icon"
          style={{ marginLeft: "10px" }}
          color="primary"
          variant="contained"
          onClick={handleOpen}
        />
      </List>
      <hr></hr>
    </div>
  );
}

export default Todo;
