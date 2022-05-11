import axios from "axios";
import React, { Component } from "react";
import { userMicroServiceApi } from '../../Utilities/hosts';

//a components for shop owner and publisher approval by admin
class ApprovalPage extends Component {

    constructor() {
        super();

        this.state = {
            isLoading: true,
            users: []
        }
        this.enableUser = this.enableUser.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
    }
    //when page is mounted, show all non approved users
    componentDidMount() {
        //use axios to invoke api
        axios.get(userMicroServiceApi + "/api/users/getallnotapprovedusers").then(response => {
            //save response in a state
            const usersArray = [];
            response.data.forEach(jsonUser => {
                usersArray.push(jsonUser);
            });
            this.setState({ users: usersArray });
            this.setState({ isLoading: false });
        });

    }
    //approve user
    enableUser(aUser, index) {
        axios.put(userMicroServiceApi + "/api/users/enableuser/" + aUser.username);
        let tempUsers = this.state.users;
        tempUsers.splice(index, 1);
        this.setState({ users: tempUsers });
    }
    //delete a user
    deleteUser(aUser, index) {
        axios.delete(userMicroServiceApi + "/api/users/deleteuser/" + aUser.username);
        let tempUsers = this.state.users;
        tempUsers.splice(index, 1);
        this.setState({ users: tempUsers });
    }


    render() {
        const { isLoading } = this.state;

        if (isLoading) {
            return <div className="App">Loading...</div>;
        }
        else {
            let userPendingTable = this.state.users.map((user, index) =>
                <div>
                    <div class="row">
                        <div class="col-md-2 m-auto">User {user.username}</div>
                        <div class="col-md-2 m-auto">{user.accountType}</div>
                        <div class="col-md-2 m-auto">{user.address}</div>
                        <div class="col-md-2 m-auto">{user.contactNum}</div>
                        <div class="col-md-2 m-auto">ABN: {user.businessNumber}</div>
                        <div class="col-md-2 m-auto">

                            <button className="btn btn-info ml-1" onClick={this.enableUser.bind(this, user, index)} style={{ background: "slateblue", 
                            width: "90px" }}>Approve</button>
                            <button className="btn btn-info ml-1 mt-1" onClick={this.deleteUser.bind(this, user, index)} style={{ background: "slateblue", 
                            width: "90px" }}>Block</button>

                        </div>

                    </div>
                    <hr />
                </div>
            );

            return (
                <div className="container">
                    <div className="col-md-8 m-auto">
                        <h3 className="text-center mt-4 mb-4">User Approval</h3>
                    </div>
                    <div class="row">
                        <div class="col-md-2 m-auto"><b>Username</b></div>
                        <div class="col-md-2 m-auto"><b>User type</b></div>
                        <div class="col-md-2 m-auto"><b>Address</b></div>
                        <div class="col-md-2 m-auto"><b>Phone</b></div>
                        <div class="col-md-2 m-auto"><b>Business number</b></div>
                        <div class="col-md-2 m-auto" />
                    </div>
                    <hr style={{ height: "1.25px", background: "darkgray" }} />
                    <div class="container">
                        {userPendingTable}
                    </div>
                </div>

            )

        }
    }


}

export default ApprovalPage;