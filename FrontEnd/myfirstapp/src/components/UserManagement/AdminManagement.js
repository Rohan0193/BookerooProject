import axios from "axios";
import React, { Component } from "react";

import {userMicroServiceApi} from "../../Utilities/hosts"

class AdminManagement extends Component{

  constructor(){
    super();
    this.state = {
      isLoading: true,
      allUsers: undefined,
      filter: ""
    };

    this.onChange = this.onChange.bind(this);
    this.filter = this.filter.bind(this);
  }

  componentDidMount(){
    axios.get(userMicroServiceApi + '/api/users').then(response => {
      //save response in a state
      this.setState({allUsers: response.data});
      console.log(response.data);
      this.setState({isLoading: false});
      
    });
  }

  onChange(e){
    this.setState({ [e.target.name]: e.target.value });
  }

  filter(){
    let tempUsersArray = [];
    this.state.allUsers.forEach(jsonUser => {
      if (this.state.filter === "") {
        tempUsersArray.push(jsonUser);
      } else {
        if (jsonUser['username'].toString().includes(this.state.filter)
        || jsonUser['firstName'].toString().includes(this.state.filter)
        || jsonUser['lastName'].toString().includes(this.state.filter)){
          tempUsersArray.push(jsonUser)
        }
      }

    });
    return tempUsersArray;
  }

  render() {

    if (this.state.isLoading) {
      return <p>Loading...</p>
    }

    let usersBlock;
    if (this.state.allUsers) {
        usersBlock = this.filter().map((aUser, index) =>
          <div class="row">
            <div class="col-md-8 m-auto userContainerBox">
             ID Number: {aUser.id}  Username: {aUser.username} Name: {aUser.firstName} {aUser.username} Country: {aUser.country}   
            </div>
          </div>
        );
    }

    return (
      <div>
      <div className="my-5">
          <h2 style={{ textAlign: "center" }}>Admin Management Page</h2>
        </div>
        <div className="text-center my-3">
          <a href="/admin/transactionhistory"><button className="btn btn-primary btn-md text-center" style={{ textAlign: "center", width: "40%", height: "36px", padding: "5px 5px" }}>
            View all transaction history</button></a>
        </div>
        <div className="text-center my-3">
          <a href="/approvalpage"><button className="btn btn-primary btn-md text-center" href="/approvalpage" style={{ textAlign: "center", width: "40%", height: "36px", padding: "5px 5px" }}>
            Manage pending user approval</button></a>
      </div>
      <div className="my-5">
        <div className="form-inner">
          <h3 style={{ textAlign: "center" }}> Find A User </h3>
          <div className="form-group my-3" style={{ textAlign: 'center', position:"center" }}>
          <input type="text" name="filter" id="filter" 
            style={{ textAlign: "center", width: "40%", height: "30px", padding:"5px 5px"}} 
            value={this.state.filter}
            onChange={this.onChange}
          />
          </div>
          {usersBlock}
        </div>
      </div>
      </div>
    );
  }
}

export default AdminManagement;