import React, { Component } from "react";
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from 'axios';
import { userMicroServiceApi } from '../../Utilities/hosts';

// a component to show user profile and details
class UserProfile extends Component {

    constructor() {
        super();
        this.state = {
            isLoading: true, 
            userDetails: undefined,
            accountId: "",
            accountType: "",
            username: "",
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            address: "",
            city: "",
            state: "",
            postcode: "",
            country: "",
            contactNum: "",
            businessNumber: "",
            create_At: "",
        };

        this.getUserFromApi = this.getUserFromApi.bind(this);
    }
    //fetch books by ISBN
    componentDidMount() {
        //use axios to invoke api
       this.getUserFromApi().then(response => {
            //save response in a state
            this.setState({userDetails: response.data});
            this.setState({accountType: response.data.accountType});
            this.setState({username: response.data.username});
            this.setState({firstName: response.data.firstName});
            this.setState({lastName: response.data.lastName});
            this.setState({email: response.data.email});
            this.setState({password: response.data.password});
            this.setState({confirmPassword: response.data.confirmPassword});
            this.setState({address: response.data.address});
            this.setState({city: response.data.city});
            this.setState({state: response.data.state});
            this.setState({postcode: response.data.postcode});
            this.setState({country: response.data.country});
            this.setState({contactNum: response.data.contactNum});
            if (response.data.businessNumber != null){
                this.setState({businessNumber: response.data.businessNumber});
            }
            this.setState({create_At: response.data.create_At});
            this.setState({isLoading : false});
            console.log(this.state.userDetails)
        });
    }

    getUserFromApi() {
      const token = localStorage.getItem("token");
      const username = jwt_decode(token)["username"];
      let apiUrl = userMicroServiceApi.concat("/api/users/" , username);
      const response = axios.get(apiUrl);
      return response;
    }

    render() {
        let businessNumDisplay;
        if (this.state.accountType === "shopOwner" || this.state.accountType === "publisher") {
            businessNumDisplay = 
            <h3 className='my-5'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Business Number: {this.state.businessNumber}</h3>
        }

        return (
            <div class='container'>
                <div className="row">
                    <div className="col-10 mx-auto text-center my-4">
                    </div>
                    <div>
                        <img src={require('./defaultusericon.png')} width='250' height='250' alt=""></img>
                    </div>
                    <div>
                        <h1 className="my-4">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{this.state.username}</h1>
                        <h3 className='my-5'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Account Type: {this.state.accountType}</h3>
                        {businessNumDisplay}
                    </div>
                </div>
                <div className='row my-5'>
                    <div className='col'>
                        <h3>Name:</h3>
                        <h5 className='my-3'>{this.state.firstName} {this.state.lastName}</h5>
                    </div>
                    <div className='col'>
                        <h3>Address:</h3>
                        <h5 className='my-3'>{this.state.address}, {this.state.city}, {this.state.state}, {this.state.country}</h5>
                    </div>
                    <div className='col'>
                        <h3>Contact Number:</h3>
                        <h5 className='my-3'>{this.state.contactNum}</h5>
                    </div>
                    <div className='col'>
                        <Link to="/edituserdetails" className="btn btn-primary btn-md btn-block">Edit Account Details</Link>
                        <Link to="/user/transactionhistory" className="btn btn-primary btn-md btn-block">Transaction History</Link>
                    </div>
                </div>
                <div className="row">
                    <h2>Reviews:</h2>
                </div>
            </div>
        )
    }
}

export default UserProfile;