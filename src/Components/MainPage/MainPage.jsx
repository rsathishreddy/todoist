import React, { Component, Fragment } from "react";
import "./addtaskbutton.css";
import Button from "@material-ui/core/Button";
import Add from "@material-ui/icons/Add";
import "bootstrap/dist/css/bootstrap.min.css";
import FormMain from "./FormMain";
import DataGrid from "./Table";
import { Modal, Button as Button1 } from "react-bootstrap";
import "react-day-picker/lib/style.css";
import { connect } from "react-redux";
import { deleteTask } from "../../Redux/Actions/addTaskDataAction";

class MainPage extends Component {
  state = {
    toggle: false,
    taskData: [],
    show: false,
    hide: false,
    deleteToggle: false,
    currentTaskData: {},
    deleteData: {},
  };

  handleToggle = () => {
    this.setState((prevState) => ({
      toggle: !prevState.toggle,
    }));
  };

  handleEditData = (data) => {
    this.setState({ currentTaskData: data });
  };

  handleEditToggle = () => {
    this.setState((prevState) => ({
      show: !prevState.show,
    }));
  };
  handleHide = () => {
    this.setState((prevState) => ({
      hide: false,
    }));
  };
  handleDeleteToggle = () => {
    this.setState((prevState) => ({
      deleteToggle: !prevState.deleteToggle,
    }));
  };
  handleDeleteTask = (task) => {
    this.setState({ deleteData: task });
  };
  deleteConfirmation = (event) => {
    if (event.target.name === "yes") {
      this.props.deleteTask(this.state.deleteData);
      this.setState({ deleteToggle: false });
    } else if (event.target.name === "no") {
      this.setState({ deleteToggle: false });
    }
  };
  render() {
    return (
      <Fragment>
        {this.state.toggle ? (
          <div className="middlepane">
            <FormMain
              toggle={this.handleToggle}
              handleTaskData={this.handleData}
            />
          </div>
        ) : (
          <div className="add-task-button">
            <Button
              variant="contained"
              color="primary"
              onClick={this.handleToggle}
            >
              <Add /> Add Task
            </Button>
          </div>
        )}
        <div className="data-grid-component">
          <DataGrid
            className="data-grid-class"
            row={this.state.taskData}
            editToggle={this.handleEditToggle}
            //  editTask={this.editTaskData}
            deleteToggle={this.handleDeleteToggle}
            deleteTask={this.handleDeleteTask}
          />
          <Modal
            className="modal-class"
            show={this.state.show}
            onHide={this.handleHide}
          >
            <Modal.Header>
              <div>
                <Modal.Title>Edit Task</Modal.Title>
              </div>
            </Modal.Header>
            <div>
              <FormMain
                toggle={this.handleEditToggle}
                editTaskData={this.props.currentTask}
              />
            </div>
          </Modal>
          <Modal className="modal-class" show={this.state.deleteToggle}>
            <Modal.Header>
              <div>
                <Modal.Title>Are you Sure?</Modal.Title>
              </div>
            </Modal.Header>
            <Modal.Body>
              <p>you want to delete this </p>
            </Modal.Body>

            <Modal.Footer>
              <Button1
                name="yes"
                variant="primary"
                onClick={this.deleteConfirmation}
              >
                {" "}
                Yes,Delete it!
              </Button1>
              <Button1
                name="no"
                variant="danger"
                onClick={this.deleteConfirmation}
              >
                No
              </Button1>
            </Modal.Footer>
          </Modal>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentTask: state.addTaskDataReducer.currentTask,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    deleteTask: (task) => {
      dispatch(deleteTask(task));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
