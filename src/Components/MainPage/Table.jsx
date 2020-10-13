import React, { Component } from "react";
import { AgGridReact } from "ag-grid-react";
import { AllCommunityModules } from "@ag-grid-community/all-modules";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

import ChildMessageRenderer from "./ChildMessageRenderer";
import { connect } from "react-redux";
import { currentTask } from "../../Redux/Actions/addTaskDataAction";

class DataGrid extends Component {
  modules = AllCommunityModules;
  columnDefs = [
    {
      headerName: "Task",
      field: "task1",
    },
    {
      headerName: "Status",
      field: "selected",
    },
    {
      headerName: "Date",
      field: "startDate",
    },
    {
      headerName: "",
      cellRenderer: "childMessageRenderer",
      colId: "params",
      editable: false,
      minWidth: 150,
    },
  ];

  defaultColDef = {
    editable: true,
    sortable: true,
    flex: 1,
    minWidth: 100,
    filter: true,
    resizable: true,
  };
  frameworkComponents = {
    childMessageRenderer: ChildMessageRenderer,
  };

  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  };

  context1 = {
    componentParent: {
      methodFromParent: (cell) => {
        this.props.deleteToggle();
        this.props.deleteTask(cell);
      },
    },
    componentEditParent: {
      methodEditTask: (cell) => {
        this.props.editToggle();
        this.props.currentTask(cell);
      },
    },
  };

  render() {
    return (
      <div className="ag-theme-alpine" style={{ height: 400, width: 600 }}>
        <AgGridReact
          modules={this.modules}
          rowData={this.props.addedTasks}
          columnDefs={this.columnDefs}
          defaultColDef={this.defaultColDef}
          frameworkComponents={this.frameworkComponents}
          onGridReady={this.onGridReady}
          context={this.context1}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    addedTasks: state.addTaskDataReducer.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    currentTask: (task) => {
      dispatch(currentTask(task));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DataGrid);
