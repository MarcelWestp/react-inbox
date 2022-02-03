import Toolbar from "./components/Toolbar";
import Message from "./components/Message";
import MessageList from "./components/MessageList";
import React, { Component } from "react";

class App extends Component {
  constructor(props) {
    super(props);
    this.state.someSelected = this.isSomeSelected();
    this.state.allSelected = this.isAllSelected();
    this.state.unreadCount = this.countUnread();
  }

  // selected

  selectMessage = (mes) => {
    let list = this.state.mesList;
    let index = list.findIndex((item) => item === mes);
    if (mes.selected) {
      list[index].selected = false;
    } else {
      list[index].selected = true;
    }
    this.setState({ mesList: list });
    this.afterSelected();
  };

  isSomeSelected = () => this.state.mesList.some((mes) => mes.selected);
  isAllSelected = () => this.state.mesList.every((mes) => mes.selected);

  afterSelected = () => {
    if(this.state.mesList.length < 1){
      this.setState({ allSelected:false,someSelected:false});
    }else{
      this.setState({ allSelected:this.isAllSelected(),someSelected:this.isSomeSelected()});
    }
    console.log(this.isAllSelected());
    console.log(this.isSomeSelected());
  };

  // read & unread

  selectUnread = () => {
    let list = this.state.mesList;
    for (let it of list) {
      if (it.selected) {
        it.read = false;
      }
    }
    this.setState({ mesList: list });
    this.setUnreadCount();

  };

  selectRead = () => {
    let list = this.state.mesList;
    for (let it of list) {
      if (it.selected) {
        it.read = true;
      }
    }
    this.setState({ mesList: list });
    this.setUnreadCount();

  };

  // bulk select

  bulkSelect = async() => {
    let list = this.state.mesList;
    if (this.state.allSelected) {
      list = list.map( it => it ={...it,selected:false} ) ;
    } else {
      list = list.map((it) => it ={...it,selected:true});
    }
    await this.setState({ mesList: list });
    await this.afterSelected();
  };

  // star select

  starDisabledOrEnable = mes => {
    let list = this.state.mesList;
    let index = list.findIndex((item) => item === mes);
    if (mes.starred) {
      list[index].starred = false;
    } else {
      list[index].starred = true;
    }
    this.setState({ mesList: list });
  }

  // delete selected

  deleteSelected = async() => {
    const list = this.state.mesList;
    const noDelList = []; 
    list.forEach((item) => {
      if(!item.selected){
        item = {...item, selected:false};
        noDelList.push(item);
      }
    })
    await this.setState({ mesList: noDelList });
    await this.setUnreadCount();
    await this.afterSelected();
  }

  countUnread = () => {
    let count = 0;
    this.state.mesList.forEach(it => {
      if(!it.read){
        count++;
      }
    } )
    return String(count);
  }

  setUnreadCount = () => {
    this.setState({unreadCount: this.countUnread()});
  }

  setLabel = (e) => {
    e.preventDefault();
    let list = this.state.mesList;
    list.forEach(it => {
      if(it.selected && !it.labels.includes(e.target.value)){
        it.labels.push(e.target.value);
      }
    })
    this.setState({mesList: list});
  }

  deleteLabel = (e) => {
    e.preventDefault();
    let list = this.state.mesList;
    list.forEach(it => {
      if(it.selected && it.labels.includes(e.target.value)){
        let index = it.labels.indexOf(e.target.value);
        it.labels.splice(index, 1);
      }
    })
    this.setState({mesList: list});
  }




  state = { mesList: MessageList };
  render() {
    return (
      <div className="App">
        <Toolbar
          someSelected={this.state.someSelected}
          allSelected={this.state.allSelected}
          unread={this.selectUnread}
          read={this.selectRead}
          bulk={this.bulkSelect}
          del={this.deleteSelected}
          unreadCount={this.state.unreadCount}
          setLabel={this.setLabel}
          deleteLabel={this.deleteLabel}
        />
        {this.state.mesList.map((item) => (
          <Message mes={item} sel={this.selectMessage} star={this.starDisabledOrEnable}/>
        ))}
      </div>
    );
  }
}

export default App;
