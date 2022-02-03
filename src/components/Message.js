import React, { Component } from "react";

class MessageCom extends Component {
  createClassName = (mes) => {
    if (mes.read && mes.selected) {
      return "row message read selected";
    } else if (mes.read && !mes.selected) {
      return "row message read";
    } else if (mes.selected) {
      return "row message selected unread";
    }
    return "row message unread";
  };

  createSpan = (str) => <span className="label label-warning">{str}</span>;

  checkBox = () => {
    this.props.sel(this.props.mes);
  };

  starAction = () => {
    this.props.star(this.props.mes);
  };

  state = {};
  render() {
    return (
      <div className={this.createClassName(this.props.mes)}>
        <div className="col-xs-1">
          <div className="row">
            <div className="col-xs-2">
              <input
                type="checkbox"
                onChange={this.checkBox}
                checked={this.props.mes.selected}
              />
            </div>
            <div className="col-xs-2">
              <i
                className={
                  this.props.mes.starred
                    ? "star fa fa-star"
                    : "star fa fa-star-o"
                }
                onClick={this.starAction}
              ></i>
            </div>
          </div>
        </div>
        <div className="col-xs-11">
          {this.props.mes.labels.map((str) => this.createSpan(str))}
          <a href="#">{this.props.mes.subject}</a>
        </div>
      </div>
    );
  }
}

export default MessageCom;
