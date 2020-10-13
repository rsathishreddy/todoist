import React, { Component } from "react";
import Delete from "@material-ui/icons/Delete";
import Edit from "@material-ui/icons/Create";

export default class ChildMessageRenderer extends Component {
  constructor(props) {
    super(props);

    this.invokeParentMethod = this.invokeParentMethod.bind(this);
  }

  invokeParentEditMethod = () => {
    this.props.context.componentEditParent.methodEditTask(this.props.node.data);
  };

  invokeParentMethod() {
    this.props.context.componentParent.methodFromParent(this.props.node.data);
  }

  render() {
    return (
      <span>
        <Edit onClick={this.invokeParentEditMethod} />
        <Delete onClick={this.invokeParentMethod} />
      </span>
    );
  }
}
