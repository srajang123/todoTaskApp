import React, { Component } from 'react';
import './App.css';

//import child components to parent component
import {TodoBanner} from './todoBanner';
import {TodoRow} from './todoRow';
import {TodoCreater} from './todoCreater';  
import {VisibilityControl} from './VisibilityControl';
//Adding Dynamic Data to React App

export default class App extends Component
{
  componentDidMount(){
    document.title = "TODO Tasks";
    this.setState({
      userName: "Srajan"
    });
    let data=localStorage.getItem("todos");
    this.setState(data!=null?JSON.parse(data):
    {
      userName: "",
      todoItems:[{
        action: "But A Flower",
        done: false
      },{
        action: "Do WorkOut",
        done: true
      },{
        action: "Study Programming",
        done: false
      },{
        action: "Call a Friend",
        done: true
      }],
      showCompleted:true
    }
    );
  }
  constructor(props)
  {
    super(props);
    this.state={
      userName: "",
      todoItems:[{
        action: "But A Flower",
        done: false
      },{
        action: "Do WorkOut",
        done: true
      },{
        action: "Study Programming",
        done: false
      },{
        action: "Call a Friend",
        done: true
      }],
      showCompleted:true
    }
  }
  updateNewTextValue=(event)=>{
    this.setState(
      {
        newItemText:event.target.value
      }
    );
  }
  createNewTodo=(task)=>{
    if(!this.state.todoItems.find(item=>item.action===task))
    {
      this.setState({
        todoItems:[...this.state.todoItems,{action:task,done:false}]
      },
      ()=>localStorage.setItem('todos',JSON.stringify(this.state))); 
    }
  }
  toggleTodo=(todo)=>this.setState({
    todoItems:this.state.todoItems.map(item=>item.action===todo.action?{...item,done:!item.done}:item)
  });

  todotableRows=(doneValue)=>this.state.todoItems
  .filter(item=>item.done===doneValue)
  .map(item=>
    <TodoRow key={item.action} item={item} callback={this.toggleTodo}/>);

    //load data


  render=()=>
    <div>
      <TodoBanner name={this.state.userName} tasks={this.state.todoItems}/>
      <div className="container-fluid">
          <TodoCreater callback={this.createNewTodo}/>

          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>
                  Todo Task Name
                </th>
                <th>
                  Done
                </th>
              </tr>
            </thead>
            <tbody>
              {/*Show incomplete task*/}
              {this.todotableRows(false)}
            </tbody>
          </table>
          <div className="bg-warning text-white text-center p-2">
            {/*Calling child component*/}
            <VisibilityControl description="Completed Tasks" isChecked={this.state.showCompleted} callback={(checked)=>this.setState({showCompleted:checked})}/>
            {this.state.showCompleted  &&
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <td>Task Name</td>
                  <td>Completed</td>
                </tr>
              </thead>
              <tbody>
                {/*Show Completed Task*/}
                {this.todotableRows(true)}
              </tbody>
            </table>
            }
          </div>
      </div>
    </div>
}
