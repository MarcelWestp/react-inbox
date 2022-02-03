import React, { Component } from "react";

class ToolbarCom extends Component {

  createCheckBoxName = () => {
    if(this.props.allSelected){
      return "fa fa-check-square-o"
    } else if(this.props.someSelected){
      return "fa fa-minus-square-o"
    }
    return "fa fa-square-o"
  }

  state = {};
  render() {
    return (
      <div className="row toolbar">
        <div className="col-md-12">
          <p className="pull-right">
            <span className="badge badge">{this.props.unreadCount}</span>
            unread messages
          </p>

          <button className="btn btn-default"  onClick={this.props.bulk} >
            <i className={this.createCheckBoxName()} default="fa fa-square-o" ></i>
          </button>

          <button className="btn btn-default" onClick={this.props.read} disabled={!this.props.someSelected} >Mark As Read</button>

          <button className="btn btn-default" onClick={this.props.unread} disabled={!this.props.someSelected} >Mark As Unread</button>

          <select  className="form-control label-select" onChange={this.props.setLabel} disabled={!this.props.someSelected} >
            <option>Apply label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <select className="form-control label-select" onChange={this.props.deleteLabel} disabled={!this.props.someSelected} >
            <option>Remove label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <button className="btn btn-default" onClick={this.props.del} disabled={!this.props.someSelected} >
            <i className="fa fa-trash-o"></i>
          </button>
        </div>
      </div>
    );
  }
}

export default ToolbarCom;



