import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import "./addtaskbutton.css";
import "bootstrap/dist/css/bootstrap.min.css";
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";
import { connect } from "react-redux";
import {
  addTaskData,
  currentTask,
  updateTaskData,
} from "../../Redux/Actions/addTaskDataAction";
class FormMain extends Component {
  state = {
    formValues: { task1: "", selected: "choose" },
    textToggle: false,
  };
  componentDidMount() {
    this.setState({ formValues: { ...this.props.editTaskData } });
  }
  handleToggle = (event) => {
    event.preventDefault();
    this.props.toggle();
  };
  handleDatePicker = (date) => {
    const temp = { ...this.state.formValues };
    temp.startDate = date.toLocaleDateString("fr-CA");
    this.setState({ formValues: temp });
  };

  handleChange = (event) => {
    const temp = { ...this.state.formValues };
    temp[event.target.name] = event.target.value;

    this.setState((prevState) => ({
      formValues: temp,
      textToggle: !prevState.textToggle,
    }));
  };
  handleGrid = () => {
    const taskValues = this.state.formValues;
    const randomId = Math.floor(Math.random() * 100 + 1);
    const spreadValues = { ...taskValues, randomId };
    this.props.addTaskData(spreadValues);
  };

  handleEditGrid = () => {
    this.props.updateTaskData(this.state.formValues);
  };

  handleSelectChanges = (event) => {
    const temp = { ...this.state.formValues };
    temp.selected = event.target.value;
    this.setState({
      formValues: temp,
    });
  };

  render() {
    const task1 = this.props.editTaskData
      ? this.state.formValues.task1
      : undefined;
    return (
      <div className="todo-form">
        <Form onSubmit={this.handleToggle}>
          <div>
            <Form.Group className="task-name-group">
              <div className="task-name">
                <Form.Label className="task-name-label">Task</Form.Label>
                <Form.Control
                  className="task-name-control"
                  type="Text"
                  name="task1"
                  onChange={this.handleChange}
                  value={task1}
                />

                <select
                  className="select-class"
                  value={this.state.formValues.selected}
                  onChange={this.handleSelectChanges}
                >
                  <option value="Choose">Choose</option>
                  <option value="open">Open</option>
                  <option value="in progress">In progress</option>
                  <option value="done">done</option>
                </select>
                <DayPickerInput
                  name="datePicker"
                  onDayChange={this.handleDatePicker}
                  placeholder={this.state.formValues.startDate}
                />
              </div>
            </Form.Group>
            {this.props.editTaskData ? (
              <div>
                <Button
                  className="task-name-button"
                  variant="primary"
                  type="submit"
                  onClick={this.handleEditGrid}
                >
                  Submit
                </Button>
                <Button
                  className="task-name-button"
                  variant="secondary"
                  onClick={this.handleToggle}
                >
                  close
                </Button>
              </div>
            ) : (
              <Button
                className="task-name-button"
                variant="primary"
                type="submit"
                onClick={this.handleGrid}
              >
                submit
              </Button>
            )}
          </div>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = (store) => {
  return {
    addedTasks: store.addTaskDataReducer.data,
    currentTaskEditedFromStore: store.addTaskDataReducer.currentTask,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addTaskData: (data) => dispatch(addTaskData(data)),
    currentTaskEdited: (task) => dispatch(currentTask(task)),
    updateTaskData: (task) => dispatch(updateTaskData(task)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FormMain);
